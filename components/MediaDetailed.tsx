import Link from 'next/link';
import Image from 'next/image';
import MovieCollection from './MovieCollection';
import PersonCollection from './PersonCollection';
import FavoriteButton from './FavoriteButton';
import { MediaDetails } from '../types';

export default function MediaDetailed({ media }: { media: MediaDetails }) {
  const randomBg = Math.floor(Math.random() * media.images.backdrops.length);
  const background = media.images.backdrops[randomBg].file_path;

  const similar = media.recommendations.results;

  const isTvShow = media.seasons != undefined;

  return (
    <main>
      <div className="mt-14 bg-slate-600/10 flex flex-col sm:flex-row items-center min-h-[570px] w-full relative justify-center p-2 sm:px-16 gap-10">
        <div className={`h-[500px] relative w-[380px]`}>
          <Image
            alt={media.name ? media.name : media.title}
            fill
            className={`object-cover h-[500px] -z-10 rounded-md`}
            sizes=""
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
          />
        </div>

        <div className="flex flex-col gap-3 w-full md:w-[50%]">
          {media.homepage != '' ? (
            <Link href={media.homepage}>
              <h1 className="text-3xl font-bold text-slate-300 hover:text-white">
                {media.name ? media.name : media.title}
              </h1>
            </Link>
          ) : (
            <h1 className="text-3xl font-bold text-slate-30">
              {media.name ? media.name : media.title}
            </h1>
          )}

          <ul className="flex gap-1 text-sm text-blue-500">
            {media.genres.map((genre, index) => {
              if (media.genres.length - 1 === index)
                return (
                  <li key={genre.name}>
                    {genre.name} {media.runtime && ' - ' + media.runtime + 'm'}
                  </li>
                );

              return <li key={genre.name}>{genre.name},</li>;
            })}
          </ul>

          <h2 className="text-2xl text-slate-300">Overview</h2>
          <p className="text-slate-300">{media.overview}</p>

          <h3 className="text-sm text-slate-300">
            User Score:{' '}
            <span className="text-red-500">
              {(media.vote_average * 10).toFixed(0)}%
            </span>
          </h3>

          <h3 className="text-sm text-slate-300">
            Votes: <span className="text-red-500">{media.vote_count}</span>
          </h3>

          <h2 className="text-xl text-blue-400 font-bold">
            {media.status && media.status}
          </h2>

          <FavoriteButton media={media} />
        </div>

        <div className={`h-[570px] absolute hidden sm:right-0 w-[100%] -z-10`}>
          <Image
            alt={media.name ? media.name : media.title}
            fill
            sizes="100vw"
            className={`opacity-10 object-cover object-center`}
            src={`https://image.tmdb.org/t/p/w1280${background}`}
          />
        </div>
      </div>

      <div className="mt-14 bg-slate-600/10 flex flex-col py-5">
        <PersonCollection cast={media.credits.cast} />
      </div>

      {isTvShow && (
        <div className="mt-14 bg-slate-600/10 flex flex-col xl:flex-row justify-evenly items-start h-auto w-full relative p-2 sm:px-16 gap-10">
          <ul>
            <h2 className="text-xl text-slate-300 font-bold text-center">
              SEASONS
            </h2>
            {media.seasons?.map((season) => (
              <article
                className="flex flex-col sm:flex-row my-5 gap-5 justify-center items-center p-3 sm:p-0 w-[100%] md:w-full lg:w-[100%]"
                key={season.id}
              >
                <div className={`xs:h-[280px] xs:w-full sm:h-[300px] relative sm:w-[300px]`}>
                  <Image
                    alt={season.name}
                    fill
                    sizes=""
                    className={`object-cover h-[300px] -z-10 rounded-md`}
                    src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                  />
                </div>

                <div className="w-full md:w-[60%] lg:w-[full]">
                  <h2 className="text-lg text-red-600">{season.name}</h2>
                  <h3 className="font-bold text-sm">
                    {season.air_date} Episodes: {season.episode_count}
                  </h3>
                  <p>{season.overview}</p>
                </div>
              </article>
            ))}
          </ul>

          {media.networks && (
            <ul className="md:flex flex-row flex-wrap gap-4 md:justify-center w-[100%]">
              <h2 className="text-xl text-center text-slate-300 font-bold w-full">
                NETWORKS
              </h2>
              {media.networks.map((network) => (
                <article
                  className="flex my-5 gap-5 items-center justify-between sm:justify-end md:flex-col lg:flex-row"
                  key={network.id}
                >
                  <div className={`h-[100px] relative w-[100px]`}>
                    <Image
                      alt={network.name}
                      fill
                      sizes=""
                      className={`object-contain h-[100px] -z-10 rounded-md`}
                      src={`https://image.tmdb.org/t/p/w500${network.logo_path}`}
                    />
                  </div>

                  <div>
                    <h2 className="text-lg text-red-600">{network.name}</h2>
                    <p>{network.origin_country}</p>
                  </div>
                </article>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-14 bg-slate-600/10 flex flex-col py-5">
        <MovieCollection movies={similar} category="Recommended" />
      </div>
    </main>
  );
}
