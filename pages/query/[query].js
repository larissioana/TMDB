import MovieCard from '@/components/movieCard/movieCard';
import NavigationBar from '@/components/navigationBar/navigationBar';
import { fetchAPISearch } from '@/utils/fetchFromAPI';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import Searchbar from '@/components/searchbar/searchbar';

const initialState =
{
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

const Search = () =>
{
  const [searchedMovies, setSearchedMovies] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { query } = router.query;

  const getMovies = async (page, query) =>
  {
    try
    {
      setIsLoading(true);
      const [movieContent, tvContent] = await Promise.all([
        fetchAPISearch('movie', query, page),
        fetchAPISearch('tv', query, page)
      ]);
  
      const combinedResults =
      [
        ...movieContent.results.map((movie) => ({ ...movie, contentType: 'movie' })),
        ...tvContent.results.map((tvShow) => ({ ...tvShow, contentType: 'tv' })),
      ];
  
      const combinedContent =
      {
        page: movieContent.page,
        total_pages: Math.max(movieContent.total_pages, tvContent.total_pages),
        total_results: movieContent.total_results + tvContent.total_results,
        results: combinedResults,
      };
  
      setSearchedMovies((prev) => ({
        ...combinedContent,
        results: page > 1 ? [...prev.results, ...combinedContent.results] : [...combinedContent.results],
      }));
      setIsLoading(false);
    } catch (error)
    {
      console.error('API error', error);
      setIsLoading(false);
    }
  };

  useEffect(() =>
  {
    if (query)
    {
      setSearchedMovies(initialState);
      getMovies(1, query);
    }
  }, [query]);

  const nextPage = searchedMovies.page + 1;
  const previousPage = searchedMovies.page - 1;

  const handlePageChange = async (newPage) =>
  {
    try
    {
      setIsLoading(true);
      
      const [movieResults, tvResults] = await Promise.all([
        fetchAPISearch('movie', query, newPage),
        fetchAPISearch('tv', query, newPage)
      ]);
      
      const combinedResults =
      [
        ...movieResults.results.map(movie => ({ ...movie, contentType: 'movie' })),
        ...tvResults.results.map(tvShow => ({ ...tvShow, contentType: 'tv' }))
      ];
      
      setSearchedMovies({
        page: newPage,
        results: combinedResults,
        total_pages: Math.max(movieResults.total_pages, tvResults.total_pages),
        total_results: movieResults.total_results + tvResults.total_results,
      });
      
      setIsLoading(false);
      window.scrollTo(0, 0);
    } catch (error)
    {
      console.error('API error', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div style =
        {{
        padding: "5rem 2rem 2rem",
        display: "flex",
        }}
      >
        <Searchbar placeholder = {query}/>
      </div>
        {
          searchedMovies.results.length > 0 ?
          <h3 className = "query">
            <span style = {{textTransform: "capitalize"}}>Search results for: </span>
            {query}
          </h3>
          :
          <h3 className = "query">
            <span style = {{textTransform: "capitalize"}}>No results found for: </span>
            {query}
          </h3>
        }
      <div
        style =
        {{
          display: 'flex',
          justifyContent: 'center',
          gap: '.5rem',
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: '0rem 2rem',
        }}
      >
        {searchedMovies.results.map((movie) => (
          <div key ={ movie.id}>
            <MovieCard movies = {movie} query = {query} isLoading = {isLoading}/>
          </div>
        ))}
      </div>
      {
        searchedMovies.total_pages > 1 && (
        <div
          style = 
          {{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
        >
          <div className = "pagination">
          <Button
            className = "pagination-btn"
            disabled = {searchedMovies.page === 1}
            onClick = {() => handlePageChange(searchedMovies.page -1, previousPage)}
          >
            Previous Page
          </Button>
          <Typography variant="body1" sx={{ marginX: '1rem' }}>
            Page {searchedMovies.page} of {searchedMovies.total_pages}
          </Typography>
          <Button
            className = "pagination-btn"
            disabled = {searchedMovies.page === searchedMovies.total_pages}
            onClick = {() => handlePageChange(searchedMovies.page + 1, nextPage)}
          >
            Next Page
          </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
