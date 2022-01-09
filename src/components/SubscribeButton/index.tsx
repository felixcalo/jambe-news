import { FormEvent } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { api } from '../../service/api';
import { getStripeJs } from '../../service/stripe-frontend-integration';

interface Product {
  productId: string;
}

export function SubscribeButton(product: Product) {
  const { data: session } = useSession();

  async function handleSubcription(e: FormEvent) {
    e.preventDefault();
    if (!session) {
      signIn();
      return;
    }
    try {
      const response = await api.post('/subscription');
      const { session } = response.data;
      const stripe = await getStripeJs();
      await stripe?.redirectToCheckout({ sessionId: session });
    } catch (e) {
      alert(e);
    }
  }

  return <button onClick={(e) => handleSubcription(e)}>Subscribe now</button>;
}
