import axios from "axios";

export const BASE_URL = "https://api.themoviedb.org/3/movie";
export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
export const IMAGE_URL_SMALL = 'https://image.tmdb.org/t/p/w500';

const options =
{
    method: 'GET',
    headers:
    {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTA0ZTQyNGQ1MDA1OTAxYTE1ZWE3MjAxYWEwM2Y4MSIsInN1YiI6IjY0NjMzZDRjOGM0NGI5NzgwOGZmYWFhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaPoBvxFjokSdSouVO0JRrtJucHcKKk83v95boLMYos' 
    }
};

export const fetchAPI = async (url, page) =>
{
    const {data} = await axios.get(`${BASE_URL}/${url}?language=en-US&page=${page}`, options)
    return data;
}

 export const fetchAPISearch = async (query, page) =>
{
  const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`, options)
  return data;
};

export const fetchAPIMovieDetail = async (movieId) =>
{
  const {data} = await axios.get(`${BASE_URL}/${movieId}?language=en-US`, options);
  return data;
};

export const fetchAPITrailer = async (movieId) =>
{
  const {data} = await axios.get(`${BASE_URL}/${movieId}/videos?language=en-US`, options);
  return data;
};

export const fetchAPICast = async (movieId) =>
{
  const {data} = await axios.get(`${BASE_URL}/${movieId}/credits?language=en-US'`, options);
  return data;
};

export const fetchAPIActors = async (id) =>
{
  const {data} = await axios.get(`https://api.themoviedb.org/3/person/${id}&language=en=US`, options);
  return data;
};

export const fetchAPIRecommandation = async (movieId) =>
{
  const {data} = await axios.get(`${BASE_URL}/${movieId}/recommendations?language=en-US'`, options);
  return data;
};

export const fetchAPIExternalLinks = async (movieId) =>
{
  const {data} = await axios.get(`${BASE_URL}/${movieId}/external_ids`, options);
  return data;
};

export const fetchAPIFilteredMovies = async (page, genre) =>
{
  const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&page=${page}`, options);
  return data;
};

export const fetchAPIPerson = async (id) =>
{
  const {data} = await axios.get(`https://api.themoviedb.org/3/person/${id}/images`, options);
  return data;
};

export const fetchAPITvSeries = async (page) =>
{
  const {data} = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`, options);
  return data;
};
