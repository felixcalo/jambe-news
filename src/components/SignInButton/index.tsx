import style from './style.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { useSession, signIn, signOut } from 'next-auth/react';

export function SignInButton() {
  const { data: session, status } = useSession();
  return (
    <div className={style.container}>
      <button onClick={session ? () => signOut() : () => signIn()}>
        <FaGithub color={session ? '#04d361' : '#eba417'} />
        {session ? session.user?.name : 'Sign in'}
        {session ? <FiX color='#737380' className={style.loggoutIcon} /> : ''}
      </button>
    </div>
  );
}
