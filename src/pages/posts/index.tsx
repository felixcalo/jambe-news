import Head from 'next/head';
import style from './style.module.scss';
import { getPrismicClient } from '../../service/prismic';
import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';

type Post = {
  slugs: string;
  title: string;
  content: string;
  excerpt: {
    spans: [];
    text: string;
    type: string;
  };
  date: {
    day: string;
    month: string;
    year: string;
  };
};
interface PostProps {
  posts: Post[];
}

export default function Post({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <main className={style.container}>
        <div className={style.posts}>
          {posts.map((post) => {
            return (
              <a key={post.slugs} href='#'>
                <time>{post.date}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt.text}</p>
              </a>
            );
          })}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      fetch: ['post.title_post', 'post.content_post'],
      pageSize: 100,
    }
  );

  const posts = response.results.map((post: any) => {
    return {
      slugs: post.uid,
      title: RichText.asText(post.data.title_post),
      content: RichText.asText(post.data.content_post),
      excerpt: post.data.content_post.find(
        (content: { type: string; text: string }) =>
          content.type === 'paragraph' ? content.text : ''
      ),
      date: new Date(post.last_publication_date).toLocaleDateString('pt-Br', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });
  return {
    props: {
      posts,
      revalidate: 60 * 60 * 24,
    },
  };
};
