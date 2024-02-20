import axios from "axios";
export const BASE_URL = "https://api.themoviedb.org/3/";
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

export const fetchAPIQuery = async (category, url, query, page) => {
  const { data } = await axios.get(`${BASE_URL}${category}/${url}?query=${query}&language=en-US&page=${page}`, options);
  return data;
};

export const fetchAPIFilteredMovies = async (category, url, page, genre) => {
  const { data } = await axios.get(`${BASE_URL}${category}/${url}?with_genres=${genre}&include_adult=false&page=${page}`, options);
  return data;
};

export const fetchAPI = async (category, url, page) => {
  const { data } = await axios.get(`${BASE_URL}/${category}/${url}?&include_adult=false&language=en-US&page=${page}`, options)
  return data;
}

export const fetchAPIDetails = async (category, id, media = '') => {
  const url = media ? `${BASE_URL}${category}/${id}/${media}?&language=en-US&page=1` : `${BASE_URL}${category}/${id}&language=en-US`;
  const { data } = await axios.get(`${url}`, options);
  return data;
};

export const fetchAPIData = async (category, id, url) => {
  const { data } = await axios.get(`${BASE_URL}${category}/${id}/${url}?&language=en-US`, options);
  return data;
};

export const fetchAPIMedia = async (category, id, media) => {
  const { data } = await axios.get(`${BASE_URL}${category}/${id}/${media}`, options);
  return data;
};


