import axios from "axios";

export const BASE_URL = "https://api.themoviedb.org/3/movie";
export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
export const IMAGE_URL_SMALL = 'https://image.tmdb.org/t/p/w500';
export const IMAGE_URL_342 = 'https://image.tmdb.org/t/p/w342';
export const IMAGE_URL_185 = 'https://image.tmdb.org/t/p/w185';
export const IMAGE_PROFILE_SIZE = 'https://image.tmdb.org/t/p/w45';
export const IMAGE_BACKDROP = 'https://image.tmdb.org/t/p/w780';

const options =
{
  method: 'GET',
  headers:
  {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTA0ZTQyNGQ1MDA1OTAxYTE1ZWE3MjAxYWEwM2Y4MSIsInN1YiI6IjY0NjMzZDRjOGM0NGI5NzgwOGZmYWFhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaPoBvxFjokSdSouVO0JRrtJucHcKKk83v95boLMYos'
  }
};

export const fetchAPI = async (url, page) => {
  const { data } = await axios.get(`${BASE_URL}/${url}?&include_adult=false&language=en-US&page=${page}`, options)
  return data;
}

export const fetchAPISearch = async (query, page) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`, options)
  return data;
};

export const fetchAPIMovieDetail = async (movieId) => {
  const { data } = await axios.get(`${BASE_URL}/${movieId}?language=en-US`, options);
  return data;
};

export const fetchAPITrailer = async (movieId) => {
  const { data } = await axios.get(`${BASE_URL}/${movieId}/videos?language=en-US`, options);
  return data;
};

export const fetchAPICast = async (movieId) => {
  const { data } = await axios.get(`${BASE_URL}/${movieId}/credits?language=en-US'`, options);
  return data;
};

export const fetchAPIActors = async (id) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}&language=en=US`, options);
  return data;
};

export const fetchAPIRecommandation = async (movieId) => {
  const { data } = await axios.get(`${BASE_URL}/${movieId}/recommendations?&include_adult=false&language=en-US'`, options);
  return data;
};

export const fetchAPIExternalLinks = async (movieId) => {
  const { data } = await axios.get(`${BASE_URL}/${movieId}/external_ids`, options);
  return data;
};

export const fetchAPIFilteredMovies = async (url, page, genre) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/discover/${url}?with_genres=${genre}&include_adult=false&page=${page}`, options);
  return data;
};

export const fetchAPIPerson = async (id) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}/images`, options);
  return data;
};

export const fetchAPITvSeries = async (url, page) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${url}?&include_adult=false&language=en-US&page=${page}`, options);
  return data;
};

export const fetchAPITvSeriesDetail = async (id) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options);
  return data;
};

export const fetchAPITvSeriesCredits = async (id) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`, options);
  return data;
};

export const fetchAPITvSeriesVideo = async (id) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options);
  return data;
}

export const fetchAPITvSeriesImages = async (id) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}/images`, options);
  return data;
};

export const fetchAPIActorKnownFor = async (id) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`, options);
  return data;
};

export const fetchAPIPopularPeople = async (page) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/person/popular?&language=en-US&page=${page}`, options);
  return data;
};

export const fetchAPIPopularPersonSearch = async (query, page) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/search/person?query=${query}&language=en-US&page=${page}`, options);
  return data;
};

export const fetchAPIPopularPersonExternalids = async (id) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}/external_ids`, options);
  return data;
};

export const fetchAPITvSeriesRecommendations = async (id) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?&include_adult=false&language=en-US&page=1`, options);
  return data;
};

export const fetchAPIMovieImages = async (id) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/images`, options);
  return data;
}