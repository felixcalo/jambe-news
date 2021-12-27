import style from './style.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { useState } from 'react';

export function SignInButton() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  return (
    <div className={style.container}>
      <button>
        <FaGithub color={isUserLoggedIn ? '#04d361' : '#eba417'} />
        {/* Sign in github */}
        Feli X Calo
        <FiX color='#737380' className={style.loggoutIcon} />
      </button>
    </div>
  );
}
