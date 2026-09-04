const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const signature = req.headers['stripe-signature'];
  if (!signature) return res.status(400).send('Missing Stripe signature');
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
    const obj = event.data.object;
    let customerId = obj.customer;
    let subscriptionId = obj.id;
    let status = obj.status;
    let periodEnd = obj.current_period_end ? new Date(obj.current_period_end * 1000).toISOString() : null;
    let userId = obj.metadata?.supabase_user_id || null;

    if (event.type === 'checkout.session.completed') {
      customerId = obj.customer;
      subscriptionId = obj.subscription;
      userId = obj.metadata?.supabase_user_id || obj.client_reference_id || null;
      if (subscriptionId) {
        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        status = sub.status;
        periodEnd = sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null;
        userId = userId || sub.metadata?.supabase_user_id || null;
      }
    }
    if (!userId && customerId) {
      const customers = await stripe.customers.search({ query: `metadata['supabase_user_id']:'${customerId}'` }).catch(() => null);
      userId = customers?.data?.[0]?.metadata?.supabase_user_id || null;
    }
    if (!userId) return res.status(200).json({ received: true });

    const activeStatuses = ['active', 'trialing'];
    const finalStatus = event.type === 'invoice.payment_failed' ? 'past_due' : status;
    const payload = { user_id: userId, status: finalStatus || 'inactive', plan: 'pro', stripe_customer_id: customerId || null, stripe_subscription_id: subscriptionId || null, current_period_end: periodEnd, updated_at: new Date().toISOString() };
    await supabase.from('subscriptions').upsert(payload, { onConflict: 'user_id' });
    return res.status(200).json({ received: true });
  } catch (e) {
    console.error('Stripe webhook error:', e);
    return res.status(400).send('Webhook Error');
  }
};
