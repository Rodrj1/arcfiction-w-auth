interface Props {
  style: 'Trending' | 'Popular' | 'Toprated';
}

export const useMovieStyles = ({ style }: Props) => {
  let cardStyle = '';

  const stylesForCard = {
    Trending:
      'h-[300px] w-full sm:w-[450px] border-t-2 border-red-600 rounded-2xl',
    Popular: 'h-[250px] w-full sm:w-[290px] rounded-2xl',
    Toprated: 'h-[210px] w-full sm:w-[190px] rounded-2xl',
  };

  cardStyle = stylesForCard[style];

  let imageContainerStyle = '';

  const stylesForImageContainer = {
    Trending:
      'h-[250px] w-full sm:w-[450px] border-t-2 border-red-600 rounded-2xl',
    Popular: 'h-[200px] w-full sm:w-[290px] rounded-2xl',
    Toprated: 'h-[180px] w-full sm:w-[190px] rounded-2xl',
  };

  imageContainerStyle = stylesForImageContainer[style];
  

  let buttonStyle = '';

  const stylesForButton = {
    Trending: 'text-sm m-2 text-gray-400 rounded-full p-1',
    Popular: 'text-sm m-2 text-gray-400 rounded-full p-1',
    Toprated:
      'text-xs m-2 rounded-full p-1 bg-red-600 text-white rounded-full p-2 absolute bottom-1 right-0',
  };

  buttonStyle = stylesForButton[style];

  return { cardStyle, buttonStyle, imageContainerStyle };
};
