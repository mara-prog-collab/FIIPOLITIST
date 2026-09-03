const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRO_PRICE_ID || 'price_1UBdvGDF7kwawM8o1nBpuBOl';
  const siteUrl = process.env.SITE_URL || 'https://mara-prog-collab.github.io/FIIPOLITIST';

  if (!secretKey) {
    return res.status(500).json({ error: 'Stripe nu este configurat pe server. Adaugă STRIPE_SECRET_KEY în variabilele de mediu.' });
  }

  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/plata-reusita.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/abonament.html?checkout=cancelled`,
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout error:', error);
    return res.status(500).json({ error: 'Nu am putut porni plata. Încearcă din nou.' });
  }
};
