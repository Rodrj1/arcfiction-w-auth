import Image from 'next/image';
import { Media } from '../types';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

interface Props {
  movie: Media;
  style: 'Trending' | 'Popular' | 'Toprated' | 'Recommended';
}

export default function Movie({ movie, style }: Props) {
  if (!movie) return <h1>Loading</h1>;

  const stylesForCard = {
    Trending:
      'h-[300px] w-full sm:w-[450px] border-t-2 border-red-600 rounded-2xl',
    Popular: 'h-[250px] w-full sm:w-[290px] rounded-2xl',
    Toprated: 'h-[210px] w-full sm:w-[190px] rounded-2xl',
    Recommended: 'h-[210px] w-full sm:w-[190px] rounded-2xl',
  };
  const cardStyle = stylesForCard[style];

  const stylesForImageContainer = {
    Trending:
      'h-[250px] w-[270px] sm:w-[450px] border-t-2 border-red-600 rounded-2xl',
    Popular: 'h-[200px] w-[250px] sm:w-[290px] rounded-2xl',
    Toprated: 'h-[180px] w-[250px] sm:w-[190px] rounded-2xl',
    Recommended: 'h-[180px] w-[190px] rounded-2xl',
  };
  const imageContainerStyle = stylesForImageContainer[style];

  const stylesForButton = {
    Trending: 'text-sm m-2 text-gray-400 rounded-full p-1',
    Popular: 'text-sm m-2 text-gray-400 rounded-full p-1',
    Toprated:
      'text-xs m-2 rounded-full p-1 bg-red-600 text-white rounded-full p-2 absolute bottom-1 right-0',
    Recommended:
      'text-xs m-2 rounded-full p-1 bg-red-600 text-white rounded-full p-2 absolute bottom-1 right-0',
  };
  const buttonStyle = stylesForButton[style];

  const router = useRouter();

  const handleRedirect = () => {
    toast.loading('Redirecting');
    router.push(`/${movie.name ? 'tvshow' : 'movie'}/${movie.id}`);
  };

  return (
    <article className={`${cardStyle} relative`}>
      <h2 className="absolute bottom-8 m-3 text-white font-bold text-xl truncate max-w-[80%]">
        {movie.name ? movie.name : movie.title}
      </h2>

      <h3 className="absolute bottom-1 m-3 text-sm text-white font-bold">
        <span className="bg-red-600 p-2 rounded-full">
          {movie.vote_average.toFixed(1)}
        </span>
      </h3>

      <button onClick={handleRedirect} className={`${buttonStyle} z-30`}>
        Watch Now
      </button>

      <div className={`${imageContainerStyle} relative`}>
        <Image
          alt={movie.name ? movie.name : movie.title}
          fill={true}
          sizes=""
          className={`opacity-90 object-cover object-top rounded-2xl -z-10`}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
      </div>
    </article>
  );
}
