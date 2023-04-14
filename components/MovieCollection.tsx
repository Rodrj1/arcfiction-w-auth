import { Media } from '../types';
import MovieCard from './MovieCard';
import MediaSlider from './MediaSlider';

interface Props {
  movies: Media[];
  category: 'Trending' | 'Popular' | 'Toprated' | 'Recommended';
}

export default function MovieCollection({ movies, category }: Props) {
  if (!movies) return <h1>Loading</h1>;

  let formatCategory = category == 'Trending' ? 'Trending This Week' : category;

  return (
    <section className="relative flex flex-col">
      <h2 className="font-bold text-xl text-slate-300 mb-3 mx-5">
        {formatCategory}
      </h2>

      <MediaSlider id={category}>
        <ul className="flex gap-5 relative">
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} style={category} />
            </li>
          ))}
        </ul>
      </MediaSlider>
    </section>
  );
}
