import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { getPrismicClient } from '../../service/prismic';
import style from './style.module.scss';
import { RichText } from 'prismic-dom';

interface PostProps {
  post: {
    date: string;
    title: string;
    content: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <main className={style.container}>
      <div className={style.posts}>
        <article>
          <h1>{post.title}</h1>
          <time>{post.date}</time>
          <div
            className={style.content_post}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug }: any = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${String(slug)}`,
        permanent: false,
      },
    };
  }

  const prismic = getPrismicClient(req);
  const response: any = await prismic.getByUID('post', String(slug) + '', {});

  const post = {
    slug,
    title: RichText.asText(response.data.title_post),
    content: RichText.asHtml(response.data.content_post),
    date: new Date(response.last_publication_date).toLocaleDateString('pt-Br', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  };
  return {
    props: { post },
  };
};
