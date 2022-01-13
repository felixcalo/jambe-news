import { useState } from 'react';
import style from './style.module.scss';
import { SignInButton } from '../SignInButton';
import Image from 'next/image';
import Link from 'next/Link';
import { useRouter } from 'next/router';
import ActiveLink from '../ActiveLink';

export function Header() {
  const [isLinkActive, setIsLinkActive] = useState(true);
  const { asPath } = useRouter();
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.LogoAndMenu}>
          <Link href=''>
            <span>
              <Image
                src='/images/LogoBlack.png'
                alt='Logo'
                height='65'
                width='150'
              />
            </span>
          </Link>
          <ActiveLink activeChildren={style.active} href='/'>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeChildren={style.active} href='/posts'>
            <a>Posts</a>
          </ActiveLink>
          <ActiveLink activeChildren={style.active} href=''>
            <a>Support</a>
          </ActiveLink>
        </div>
        <SignInButton />
      </div>
    </div>
  );
}
