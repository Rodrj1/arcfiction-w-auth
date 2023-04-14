import type { NextPage, NextPageContext } from 'next';
import { MovieCollection } from '../components';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { Media, Results } from '../types';

const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

const topratedurl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const popular: Results = await axios.get(url).then((res) => res.data.results);

  const trending: Results = await axios
    .get(trendingUrl)
    .then((res) => res.data.results);

  const toprated: Results = await axios
    .get(topratedurl)
    .then((res) => res.data.results);

  return { props: { popular, trending, toprated } };
}

interface Props {
  popular: Media[];
  trending: Media[];
  toprated: Media[];
}

const Movies: NextPage<Props> = (props) => {

  return (
    <div>
      <MovieCollection movies={props?.trending} category="Trending" />

      <MovieCollection movies={props?.popular} category="Popular" />

      <MovieCollection movies={props?.toprated} category="Toprated" />
    </div>
  );
};

export default Movies;
