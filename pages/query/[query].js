import MovieCard from '@/components/movieCard/movieCard';
import NavigationBar from '@/components/navigationBar/navigationBar';
import { fetchAPISearch } from '@/utils/fetchFromAPI';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Stack, Typography, Button } from '@mui/material';
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
    try {
      setIsLoading(true);
      const searchMovie = await fetchAPISearch(query, page);
  
      setSearchedMovies((prev) => {
        return {
          ...searchMovie,
          results: page > 1 ? [...prev.results, ...searchMovie.results] : [...searchMovie.results],
        };
      });
      setIsLoading(false);
    } catch (error)
    {
      console.error('Api error', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query)
    {
      setSearchedMovies(initialState);
      getMovies(1, query);
    }
  }, [query]);

  const nextPage = searchedMovies + 1;
  const previousPage = searchedMovies - 1;

  const handlePageChange = async (newPage) =>
  {
    if (newPage <= searchedMovies.total_pages)
    {
      try
      {
        const newMovies = await fetchAPISearch(query, newPage);
  
        setSearchedMovies({
          page: newPage,
          results: newMovies.results,
          total_pages: newMovies.total_pages,
          total_results: newMovies.total_results,
        });
        window.scrollTo(0, 0);
      } catch (error)
      {
        console.error('Api error', error);
      }
    }
  };

  return (
    <div>
      <NavigationBar />
      <div style =
        {{
        padding: "1rem 2rem",
        display: "flex",
        }}
      >
        <Searchbar placeholder = {query}/>
      </div>
      <h3 className = "query">
        <span style = {{textTransform: "capitalize"}}>Search results for: </span>
        {query}
      </h3>
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
            <MovieCard movies = {movie} query = {query} isLoading = {isLoading} />
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
