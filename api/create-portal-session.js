const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Trebuie să fii autentificat.' });
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: 'Sesiunea nu este validă.' });
    const { data: profile } = await supabase.from('profiles').select('stripe_customer_id').eq('id', user.id).maybeSingle();
    if (!profile?.stripe_customer_id) return res.status(400).json({ error: 'Nu există încă un abonament Stripe pentru acest cont.' });
    const siteUrl = process.env.SITE_URL || 'https://fiipolitist.ro';
    const portal = await stripe.billingPortal.sessions.create({ customer: profile.stripe_customer_id, return_url: `${siteUrl}/abonament.html` });
    return res.status(200).json({ url: portal.url });
  } catch (e) {
    console.error('Stripe Portal error:', e);
    return res.status(500).json({ error: 'Nu am putut deschide administrarea abonamentului.' });
  }
};
