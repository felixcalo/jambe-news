import { useState } from 'react';
import style from './style.module.scss';
import { SignInButton } from '../SignInButton';
import Image from 'next/image';
import Link from 'next/Link';

export function Header() {
  const [isLinkActive, setIsLinkActive] = useState(true);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.LogoAndMenu}>
          <Link href=' '>
            <span>
              <Image
                src='/images/LogoBlack.png'
                alt='Logo'
                height='65'
                width='150'
              />
            </span>
          </Link>
          <Link href=' '>
            <a className={style.active}>Home</a>
          </Link>
          <Link href=' '>
            <a>Posts</a>
          </Link>
          <Link href=' '>
            <a>Support</a>
          </Link>
        </div>
        <SignInButton />
      </div>
    </div>
  );
}
