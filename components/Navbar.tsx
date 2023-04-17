import Link from 'next/link';
import UserProfile from './UserProfile';
import { useCurrentUser } from '../hooks';
import { useRouter } from 'next/router';
import { LoggedUser } from '../types';
import NavbarLinks from './NavbarLinks';

export default function Navbar() {
  const { data } = useCurrentUser();
  const user: LoggedUser = { name: data?.name, image: data?.image };

  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      <header className="fixed top-0 sm:sticky w-full bg-customgray px-2 z-[500] bg-opacity-100 sm:bg-opacity-80 h-[50px] items-center">
        {user.name != undefined ? (
          <>
            <nav className="mb-5 items-center hidden sm:flex backdrop-blur-sm">
              <ul className="flex gap-2 sm:gap-10 font-bold text-xs items-center h-[50px]">
                <li>
                  <Link
                    className={`${pathname == '/' && 'text-white'}`}
                    href={'/'}
                  >
                    <h2 className="text-base">ARCFiction</h2>
                  </Link>
                </li>

                <NavbarLinks path={pathname} />
              </ul>
            </nav>

            {user && <UserProfile user={user} />}
          </>
        ) : (
          <nav className="w-full h-[50px] bg-customgray bg-opacity-80 px-2 mb-3">
            <h1 className="text-center text-2xl text-gray-400">
              Welcome to ARCFiction
            </h1>
          </nav>
        )}
      </header>

      {user.name != undefined && (
        <nav className="sm:hidden fixed p-0 bottom-0 bg-customgray w-[100vw] z-[500] bg-opacity-100 mb-0 h-[60px]">
          <ul className="!h-[60px] flex font-bold text-[14px] sm:text-xs items-center text-red-600 justify-evenly">
            <NavbarLinks path={pathname} />
          </ul>
        </nav>
      )}
    </>
  );
}
