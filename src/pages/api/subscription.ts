import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../service/stripe-backend-integration';
import { getSession } from 'next-auth/react';
import { fauna } from '../../service/faunaDB';
import { query } from 'faunadb';
import { Session } from 'next-auth';

interface User {
  ref: {
    id: string;
  };
  data: {
    email: string;
    stripeCustomerId: string;
  };
}

export default async function (req: NextApiRequest, resp: NextApiResponse) {
  if (req.method == 'POST') {
    const session = await getSession({ req });
    const user = await fauna.query<User>(
      query.Get(
        query.Match(
          query.Index('user_by_email'),
          query.Casefold(session?.user?.email + '')
        )
      )
    );

    //  const user= getUserFaunaDB(session);
    let customerId = user.data.stripeCustomerId;
    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: session?.user?.email + '',
      });

      await fauna.query(
        query.Update(query.Ref(query.Collection('users'), user.ref.id), {
          data: {
            stripeCustomerId: stripeCustomer.id,
          },
        })
      );
      customerId = stripeCustomer.id;
    }
    const stripeCheckoutSessioon = await getStripeCheckoutSessioon(customerId);
    return resp.status(200).json({ session: stripeCheckoutSessioon.id });
  } else {
    resp.setHeader('Allow', 'POST');
    resp.status(405).end('method not allow');
  }
}

async function getStripeCheckoutSessioon(customerId: string) {
  const stripeCheckoutSessioon = await stripe.checkout.sessions.create({
    customer: customerId,
    success_url: process.env.NEXT_PUBLIC_SUCCESS_URL + '',
    cancel_url: process.env.NEXT_PUBLIC_CANCEL_URL + '',
    allow_promotion_codes: true,
    line_items: [{ price: process.env.PRICE_API_KEY, quantity: 1 }],
    mode: 'subscription',
    payment_method_types: ['card'],
    billing_address_collection: 'required',
  });
  return stripeCheckoutSessioon;
}
