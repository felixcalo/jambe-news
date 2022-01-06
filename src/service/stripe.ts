import Stripe from 'stripe';

export const stripe: Stripe = new Stripe(process.env.STRIPE_API_KEY + '', {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'Jambe-News',
    version: '1.0',
  },
});
