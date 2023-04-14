import Link from 'next/link';
import UserProfile from './UserProfile';
import { useCurrentUser } from '../hooks';
import { useRouter } from 'next/router';
import { LoggedUser } from '../types';

export default function Navbar() {
  const { data } = useCurrentUser();
  const user: LoggedUser = { name: data?.name, image: data?.image };

  console.log(user.name);
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      {user.name != undefined ? (
        <nav className="flex justify-between w-full bg-customgray p-2 mb-3">
          <ul className="flex gap-10 font-bold text-xs items-center">
            <li>
              <Link className={`${pathname == '/' && 'text-white'}`} href={'/'}>
                <h2 className="text-base">ARCFiction</h2>
              </Link>
            </li>

            <li>
              <Link
                className={`${pathname == '/movies' && 'text-white'}`}
                href={'/movies'}
              >
                Movies
              </Link>
            </li>

            <li>
              <Link
                className={`${pathname == '/tvshows' && 'text-white'}`}
                href={'/tvshows'}
              >
                TV Shows
              </Link>
            </li>
            <li>My List</li>
          </ul>

          {user && <UserProfile user={user} />}
        </nav>
      ) : (
        <nav className="w-full bg-customgray p-2 mb-3">
          <h1 className="text-center text-2xl text-gray-400">
            Welcome to ARCFiction
          </h1>
        </nav>
      )}
    </>
  );
}
