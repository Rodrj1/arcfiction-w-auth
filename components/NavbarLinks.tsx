import Link from 'next/link';

export default function NavbarLinks({ path }: { path: string }) {
  return (
    <>
      <li>
        <Link
          className={`${path == '/movies' && 'text-white'}`}
          href={'/movies'}
        >
          Movies
        </Link>
      </li>

      <li>
        <Link
          className={`${path == '/tvshows' && 'text-white'}`}
          href={'/tvshows'}
        >
          TV Shows
        </Link>
      </li>
      <li>
        <Link
          className={` ${path == '/mylist' && 'text-white'}`}
          href={'/mylist'}
        >
          My List
        </Link>
      </li>
    </>
  );
}
