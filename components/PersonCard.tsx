import { Person } from '../types';
import Image from 'next/image';

export default function PersonCard({ person }: { person: Person }) {
  return (
    <>
      {person.profile_path != null && (
        <article className='w-[140px]'>
          <div
            className={`h-[140px] w-[140px] relative rounded-full border border-slate-400`}
          >
            <Image
              alt={person.name}
              fill={true}
              sizes=''
              className={`opacity-90 p-1 object-cover object-top rounded-full -z-10`}
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            />
          </div>

          <h2 className="text-red-600 font-bold text-sm truncate max-w-[80%]">
            {person.name}
          </h2>

          <h3 className="text-[12px] text-white truncate">
            {person.character}
          </h3>

          <h3 className="text-[12px] text-white truncate">
            {person.known_for_department}
          </h3>
        </article>
      )}
    </>
  );
}
