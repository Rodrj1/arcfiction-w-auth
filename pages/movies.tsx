import type { NextPage } from 'next';
import { MovieCollection } from '../components';
import axios from 'axios';
import { Media, Results } from '../types';
import { pageMovieRequests } from './api/data/requests';

export async function getServerSideProps() {
  const popular: Results = await axios
    .get(pageMovieRequests.discover)
    .then((res) => res.data.results);

  const trending: Results = await axios
    .get(pageMovieRequests.trending)
    .then((res) => res.data.results);

  const toprated: Results = await axios
    .get(pageMovieRequests.toprated)
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
