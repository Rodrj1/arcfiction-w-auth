import type { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { MovieCollection } from '../components';
import { Media, Results } from '../types';
import axios from 'axios';
import { pageMainRequests } from './api/data/requests';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) return { redirect: { destination: '/auth', permanent: false } };

  const popular: Results = await axios
    .get(pageMainRequests.discover)
    .then((res) => res.data.results);

  const trending: Results = await axios
    .get(pageMainRequests.trending)
    .then((res) => res.data.results);

  const toprated: Results = await axios
    .get(pageMainRequests.toprated)
    .then((res) => res.data.results);

  return { props: { popular, trending, toprated } };
}

interface Props {
  popular: Media[];
  trending: Media[];
  toprated: Media[];
}

const Home: NextPage<Props> = (props) => {
  return (
    <main>
      <MovieCollection movies={props?.trending} category="Trending" />

      <MovieCollection movies={props?.popular} category="Popular" />

      <MovieCollection movies={props?.toprated} category="Toprated" />
    </main>
  );
};

export default Home;
