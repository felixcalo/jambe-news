import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { getPrismicClient } from '../../../service/prismic';
import style from '../style.module.scss';
import { RichText } from 'prismic-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface PostProps {
  post: {
    slug: string;
    date: string;
    title: string;
    content: string;
  };
}

export default function PostPreview({ post }: PostProps) {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <main className={style.container}>
      <div className={style.posts}>
        <article>
          <h1>{post.title}</h1>
          <time>{post.date}</time>
          <div
            className={style.content_preview}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={style.LinkContinueReading}>
            Wanna continue reading ?
            <Link href='/'>
              <a> Subscribe now</a>
            </Link>
            🎯
          </div>
        </article>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug }: any = params;

  const prismic = getPrismicClient();
  const response: any = await prismic.getByUID('post', String(slug) + '', {});

  const post = {
    slug,
    title: RichText.asText(response.data.title_post),
    content: RichText.asHtml(response.data.content_post.splice(0, 3)),
    date: new Date(response.last_publication_date).toLocaleDateString('pt-Br', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  };
  return {
    props: { post },
    redirect: 60 * 30,
  };
};
