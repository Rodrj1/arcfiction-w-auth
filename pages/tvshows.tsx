import axios from 'axios';
import MainVideo from '../components/MainVideo';
import { MovieCollection } from '../components';
import { Media, Results } from '../types';
import type { NextPage } from 'next';
import { pageTvRequests } from './api/data/requests';

export async function getServerSideProps() {
  const popular: Results = await axios
    .get(pageTvRequests.discover)
    .then((res) => res.data.results);

  const trending: Results = await axios
    .get(pageTvRequests.trending)
    .then((res) => res.data.results);

  const toprated: Results = await axios
    .get(pageTvRequests.toprated)
    .then((res) => res.data.results);

  return { props: { popular, trending, toprated } };
}

interface Props {
  popular: Media[];
  trending: Media[];
  toprated: Media[];
}

const TVShows: NextPage<Props> = (props) => {
  const randomVideo = Math.floor(Math.random() * props?.toprated.length);
  const video = props?.toprated[randomVideo].id;

  return (
    <div>
      <MainVideo media={video} />

      <MovieCollection movies={props?.trending} category="Trending" />

      <MovieCollection movies={props?.popular} category="Popular" />

      <MovieCollection movies={props?.toprated} category="Toprated" />
    </div>
  );
};

export default TVShows;
