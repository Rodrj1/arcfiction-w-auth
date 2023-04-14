import { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { MediaDetails } from '../../types';
import { MediaDetailed } from '../../components';
import axios from 'axios';

interface Context extends NextPageContext {
  resolvedUrl: string;
}

export async function getServerSideProps(context: Context) {
  const session = await getSession(context);

  if (!session) return { redirect: { destination: '/auth', permanent: false } };

  const mediaId = context.query.id;

  const path = context.resolvedUrl;

  const url = `https://api.themoviedb.org/3/${
    path.includes('movie') ? 'movie' : 'tv'
  }/${mediaId}?api_key=${
    process.env.NEXT_PUBLIC_API_KEY
  }&language=en-US&include_image_language&append_to_response=recommendations,images,credits&include_image_language=en,null`;

  const media: MediaDetails = await axios.get(url).then((res) => res.data);

  return { props: { media } };
}

interface Props {
  media: MediaDetails;
}

const Media: NextPage<Props> = (props) => {
  return <MediaDetailed media={props.media} />;
};

export default Media;
