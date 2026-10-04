import type { AnchorHTMLAttributes } from 'react';
// Ordinary document navigation avoids a client-router dependency for public pages.
export default function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props}/>;
}
