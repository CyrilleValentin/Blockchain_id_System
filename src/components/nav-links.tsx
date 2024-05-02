'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard' },
  {
    name: 'ID Card Registration',
    href: '/dashboard/card_registration'
  },
  { name: 'Issuer Role', href: '/dashboard/issuer_role' },
  { name: 'Verifier Role', href: '/dashboard/verifier_role' },
  { name: 'Cards Hash List', href: '/dashboard/list_page' },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex w-[15rem] h-[58px] grow items-center justify-center gap-2 rounded-md bg-gray-50  text-lg font-bold hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >

            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
