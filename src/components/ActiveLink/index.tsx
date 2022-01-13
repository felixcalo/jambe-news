import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeChildren: string;
}

export default function ActiveLink({
  children,
  activeChildren,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();
  const className = asPath == rest.href ? activeChildren : '';

  return <Link {...rest}>{cloneElement(children, { className })}</Link>;
}
