export const PLANS = {
  free: { name: 'Free', credits: 5, price: 0 },
  pro: { name: 'Pro', credits: 150, price: 15 },
  team: { name: 'Team', credits: 600, price: 49 },
}

// Public Stripe Payment Link URLs. Env vars override when provided.
export const STRIPE_LINKS = {
  proMonthly: import.meta.env.VITE_STRIPE_PRICE_PRO_MONTHLY || 'https://buy.stripe.com/28EfZheA68t01ou4C7e3e09',
  proYearly: import.meta.env.VITE_STRIPE_PRICE_PRO_YEARLY || 'https://buy.stripe.com/14AcN577E24Cgjo3y3e3e0a',
  teamMonthly: import.meta.env.VITE_STRIPE_PRICE_TEAM_MONTHLY || 'https://buy.stripe.com/6oU9AT4Zw10y3wC9Wre3e0b',
  teamYearly: import.meta.env.VITE_STRIPE_PRICE_TEAM_YEARLY || 'https://buy.stripe.com/8x27sL9fMeRoebg5Gbe3e0c',
}
