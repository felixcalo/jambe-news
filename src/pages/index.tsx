/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import type { NextPage } from 'next';
import Image from 'next/image';
import { Header } from './components/Header/';
import style from './home.module.scss';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hello world 2</title>
      </Head>
      <Header />
      <main className={style.container}>
        <div className={style.content}>
          <section>
            <div> 😁 Hey, Welcome</div>
            <h1>Postcast about everthings</h1>
            <p>
              Get access to all publications <br /> for{' '}
              <span>$9.90 / month</span>
            </p>
            <button>Subscribe now</button>
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
};

export default Home;
