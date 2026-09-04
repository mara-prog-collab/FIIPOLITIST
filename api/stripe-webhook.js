const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

module.exports.config = { api: { bodyParser: false } };

async function rawBody(req) {
  if (Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === 'string') return Buffer.from(req.body);
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const signature = req.headers['stripe-signature'];
  if (!signature) return res.status(400).send('Missing Stripe signature');
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const event = stripe.webhooks.constructEvent(await rawBody(req), signature, process.env.STRIPE_WEBHOOK_SECRET);
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
    const obj = event.data.object;
    let customerId = obj.customer || null;
    let subscriptionId = obj.subscription || (obj.object === 'subscription' ? obj.id : null);
    let status = obj.status || null;
    let periodEnd = obj.current_period_end ? new Date(obj.current_period_end * 1000).toISOString() : null;
    let userId = obj.metadata?.supabase_user_id || obj.client_reference_id || null;
    if (event.type === 'checkout.session.completed' && subscriptionId) {
      const sub = await stripe.subscriptions.retrieve(subscriptionId);
      status = sub.status;
      periodEnd = sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null;
      userId = userId || sub.metadata?.supabase_user_id || null;
    }
    if (!userId && customerId) {
      const customer = await stripe.customers.retrieve(customerId);
      userId = customer?.metadata?.supabase_user_id || null;
    }
    if (!userId) return res.status(200).json({ received: true });
    if (event.type === 'customer.subscription.deleted') status = 'canceled';
    if (event.type === 'invoice.payment_failed') status = 'past_due';
    await supabase.from('subscriptions').upsert({ user_id: userId, status: status || 'inactive', plan: 'pro', stripe_customer_id: customerId, stripe_subscription_id: subscriptionId, current_period_end: periodEnd, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
    return res.status(200).json({ received: true });
  } catch (e) {
    console.error('Stripe webhook error:', e);
    return res.status(400).send('Webhook Error');
  }
};
