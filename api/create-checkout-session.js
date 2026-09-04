const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Trebuie să fii autentificat.' });
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return res.status(401).json({ error: 'Sesiunea nu este validă.' });
    const { data: profile } = await supabase.from('profiles').select('stripe_customer_id,full_name').eq('id', user.id).maybeSingle();
    let customerId = profile?.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({ email: user.email, name: profile?.full_name || undefined, metadata: { supabase_user_id: user.id } });
      customerId = customer.id;
      await supabase.from('profiles').upsert({ id: user.id, stripe_customer_id: customerId, updated_at: new Date().toISOString() });
    }
    const siteUrl = process.env.SITE_URL || 'https://fiipolitist.ro';
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', customer: customerId,
      line_items: [{ price: process.env.STRIPE_PRO_PRICE_ID, quantity: 1 }],
      success_url: `${siteUrl}/plata-reusita.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/abonament.html?checkout=cancelled`,
      billing_address_collection: 'auto', client_reference_id: user.id,
      metadata: { supabase_user_id: user.id, plan: 'pro' },
      subscription_data: { metadata: { supabase_user_id: user.id, plan: 'pro' } }
    });
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout error:', error);
    return res.status(500).json({ error: 'Nu am putut porni plata. Încearcă din nou.' });
  }
};
