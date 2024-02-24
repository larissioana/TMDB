export const BASE_URL = "https://api.themoviedb.org/3/";
export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
export const IMAGE_URL_SMALL = 'https://image.tmdb.org/t/p/w500';
export const IMAGE_URL_342 = 'https://image.tmdb.org/t/p/w342';
export const IMAGE_URL_185 = 'https://image.tmdb.org/t/p/w185';
export const IMAGE_BACKDROP = 'https://image.tmdb.org/t/p/w780';
export const IMAGE_BACKDROP_LARGE = 'https://image.tmdb.org/t/p/w1280';

const options =
{
  method: 'GET',
  headers:
  {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTA0ZTQyNGQ1MDA1OTAxYTE1ZWE3MjAxYWEwM2Y4MSIsInN1YiI6IjY0NjMzZDRjOGM0NGI5NzgwOGZmYWFhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaPoBvxFjokSdSouVO0JRrtJucHcKKk83v95boLMYos'
  }
};

export const fetchAPIQuery = async (mediaType, url, query, page) => {
  const response = await fetch(`${BASE_URL}${mediaType}/${url}?query=${query}&language=en-US&page=${page}`, options);
  const data = response.json();
  return data;
};

export const fetchAPIFilteredMovies = async (mediaType, url, page, genre) => {
  const response = await fetch(`${BASE_URL}${mediaType}/${url}?with_genres=${genre}&include_adult=false&page=${page}`, options);
  const data = await response.json();
  return data;
};

export const fetchAPI = async (mediaType, url, page) => {
  const response = await fetch(`${BASE_URL}/${mediaType}/${url}?&include_adult=false&language=en-US&page=${page}`, options)
  const data = await response.json();
  return data;
}

export const fetchAPIDetails = async (mediaType, id, category = "") => {
  const url = category ? `${BASE_URL}${mediaType}/${id}/${category}?&language=en-US&page=1` : `${BASE_URL}${mediaType}/${id}&language=en-US`;
  const response = await fetch(`${url}`, options);
  const data = response.json();
  return data;
};

export const fetchAPIData = async (mediaType, id, url) => {
  const response = await fetch(`${BASE_URL}${mediaType}/${id}/${url}?&language=en-US`, options);
  const data = await response.json();
  return data;
};

export const fetchAPIMedia = async (mediaType, id, category) => {
  const response = await fetch(`${BASE_URL}${mediaType}/${id}/${category}`, options);
  const data = await response.json();
  return data;
};
