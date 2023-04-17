import { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useFavorites } from '../hooks';
import { FavoriteMedia } from '../types';
import FavoritedMedia from '../components/FavoritedMedia';

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

  return { props: {} };
}

const MyList: NextPage = () => {
  const { data } = useFavorites();

  const favorites: FavoriteMedia[] = data;

  return (
    <div>
      <ul className='flex flex-col sm:flex-row flex-wrap gap-20 sm:p-10 justify-center items-center'>
        {favorites?.map((media) => (
          <FavoritedMedia media={media} key={media.media_id} />
        ))}
      </ul>
    </div>
  );
};

export default MyList;
