const KEY = process.env.NEXT_PUBLIC_API_KEY;

const discoverTv = `https://api.themoviedb.org/3/discover/tv?api_key=${KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

const trendingTv = `https://api.themoviedb.org/3/trending/tv/week?api_key=${KEY}`;

const topratedTv = `https://api.themoviedb.org/3/tv/top_rated?api_key=${KEY}`;

const discoverMovie = `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

const trendingMovie = `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}`;

const topratedMovie = `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}`;

const trendingAll = `https://api.themoviedb.org/3/trending/all/week?api_key=${KEY}`;

export const pageMainRequests = {
  discover: discoverMovie,
  trending: trendingAll,
  toprated: topratedMovie,
};

export const pageTvRequests = {
  discover: discoverTv,
  trending: trendingTv,
  toprated: topratedTv,
};

export const pageMovieRequests = {
  discover: discoverMovie,
  trending: trendingMovie,
  toprated: topratedMovie,
};
