import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=266045521575010b3935c2ed6c9303a6';

// get popular movies
export const getPopularMovies = async () => {
  const res = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return res.data.results;
};

// get upcoming movies
export const getUpcomingMovies = async () => {
  const res = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return res.data.results;
};

// get popular tv
export const getPopularTv = async () => {
  const res = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return res.data.results;
};

// get Family Movies
export const getFamilyMovies = async () => {
  const res = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return res.data.results;
};

// get Documentary
export const getDocumentary = async () => {
  const res = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  return res.data.results;
};

// get movie detail
export const getMovieDetail = async movieId => {
  const res = await axios.get(
    `${apiUrl}/movie/${movieId}?${apiKey}&with_genres=99`,
  );
  return res.data;
};
