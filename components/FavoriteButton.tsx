import axios from 'axios';
import React, { useCallback, useMemo } from 'react';

import { useCurrentUser, useFavorites } from '../hooks';
import { SvgArrowLeft, SvgArrowRight } from './Svgs';

interface FavoriteButtonProps {
  mediaId: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ mediaId }) => {
  const { mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(mediaId);
  }, [currentUser, mediaId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { mediaId } });
    } else {
      response = await axios.post('/api/favorite', { mediaId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [mediaId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? <SvgArrowLeft /> : <SvgArrowRight />;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <div className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6">
        {Icon}
      </div>
    </div>
  );
};

export default FavoriteButton;
