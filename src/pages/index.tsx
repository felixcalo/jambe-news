/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import type { GetServerSideProps, GetStaticProps } from 'next';
import style from './home.module.scss';
import { stripe } from '../service/stripe-backend-integration';
import { SubscribeButton } from '../components/SubscribeButton';

interface ProductProps {
  product: { id: string; amount: number };
}

export default function Home({ product }: ProductProps) {
  return (
    <>
      <Head>
        <title>Jambe news - Home</title>
      </Head>
      <main className={style.container}>
        <div className={style.content}>
          <section>
            <div> 😁 Hey, Welcome</div>
            <h1>Postcast about everthings</h1>
            <p>
              Get access to all publications <br /> for
              <span>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(product.amount / 100)}
                / month
              </span>
            </p>
            <SubscribeButton productId={product.id} />
          </section>
          <img src='./images/lamp.png' alt='Reading postcast' />
        </div>
      </main>
      <footer>
        <div>
          <span>CaloDev</span>
          <span>All right CaloDev</span>
        </div>
      </footer>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const prices = await stripe.prices.retrieve(
//     'price_1KBRMCKVXWtsQTZ94qyuDKlm',
//     { expand: ['product'] }
//   );

//   const product = {
//     id: prices.id,
//     amount: prices.unit_amount,
//   };
//   return { props: product };
// };

export const getStaticProps: GetStaticProps = async () => {
  const prices = await stripe.prices.retrieve(process.env.PRICE_API_KEY + '', {
    expand: ['product'],
  });

  const product = {
    id: prices.id,
    amount: prices.unit_amount,
  };
  return { props: { product }, revalidate: 60 * 60 * 24 };
};
