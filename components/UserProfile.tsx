import { signOut } from 'next-auth/react';
import { LoggedUser } from '../types';
import defaultAvatar from '../public/images/default-slate.webp';
import Image from 'next/image';

export default function UserProfile({ user }: { user: LoggedUser }) {
  const profileImage =
    user?.image == '' || user?.image == undefined
      ? defaultAvatar.src
      : user.image;

  return (
    <div className="flex rounded-md items-center bg-customgray gap-2">
      <button
        className="bg-red-600 hover:bg-red-600/70 transition-colors text-white w-36 h-10 rounded-md"
        onClick={() => signOut()}
      >
        Sign Out
      </button>

      <Image
        className="border-2 border-slate-700"
        src={profileImage}
        height={'40'}
        width={'40'}
        alt="Avatar"
      />

      <h2 className="font-bold text-sm">{user.name}</h2>
    </div>
  );
}
