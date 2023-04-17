import { useRouter } from 'next/router';
import { FavoriteMedia } from '../types';
import Image from 'next/image';

export default function FavoritedMedia({ media }: { media: FavoriteMedia }) {
  const router = useRouter();
  
  return (
    <article className="flex flex-col items-center w-[270px] sm:w-max">
      <div className="relative h-[250px] w-[270px] sm:w-[250px] border">
        <Image
          alt={media.title}
          fill={true}
          className="object-cover object-top rounded-2xl -z-10"
          src={`https://image.tmdb.org/t/p/w500${media.poster}`}
        />
      </div>

      <h2 className="m-3 text-red-600 text-lg max-w-[100%]">{media.title}</h2>

      <button
        onClick={() =>
          router.push(`/${media.type}/${media.media_id}`)
        }
      >
        Watch Now
      </button>
    </article>
  );
}
