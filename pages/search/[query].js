import NavigationBar from '@/components/navigationBar/navigationBar';
import { fetchAPISearch } from '@/utils/fetchFromAPI';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Searchbar from '@/components/searchbar/searchbar';
import MediaType from '@/components/mediaType/mediaType';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

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
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const { query } = router.query;

  const getMovies = async (query, page) =>
  {
    try
    {
      setIsLoading(true);
      const data = await fetchAPISearch(query, page);
  
      setSearchedMovies((prev) => ({
        ...data,
        results: page > 1 ? [...prev.results, ...data.results] : [...data.results],
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
      getMovies(query, 1);
    }
  }, [query]);

  const nextPage = searchedMovies.page + 1;
  const previousPage = searchedMovies.page - 1;

  const handlePageChange = async (newPage) =>
  {
    try
    {
      setIsLoading(true);
      
      const newData = await fetchAPISearch(query, newPage); 

      setSearchedMovies((prev) => ({
        ...prev,
        page: newPage, 
        results: newPage > 1 ? newData.results : [...prev.results, ...newData.results], 
        total_pages: newData.total_pages, 
        total_results: newData.total_results 
      }));
      
      setIsLoading(false);
      window.scrollTo(0, 0);
    } catch (error)
    {
      console.error('API error', error);
      setIsLoading(false);
    }
  };

  const mediaTypeMovie = searchedMovies.results.filter(result => result.media_type === "movie");
  const mediaTypeTv = searchedMovies.results.filter(result => result.media_type === "tv");
  const mediaTypePerson = searchedMovies.results.filter(result => result.media_type === "person");

  return (
    <div>
      <NavigationBar />
      <div style =
        {{
        padding: "5rem 2rem 2rem",
        display: "flex",
        }}
      >
        <Searchbar placeholder = {query} searchedMovies = {searchedMovies}/>
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
        <MediaType 
          mediaTypeMovie = {mediaTypeMovie}
          mediaTypePerson = {mediaTypePerson}
          mediaTypeTv = {mediaTypeTv}
          isLoading = {isLoading}
        /> 
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
            onClick={() => handlePageChange(searchedMovies.page - 1, previousPage)}
          >
            <NavigateBeforeIcon className = "pagination-btn"/>
          </Button>
          {
            Array.from({ length: searchedMovies.total_pages }, (_, index) => index + 1)
            .slice(searchedMovies.page - 1, searchedMovies.page + 4)
            .map(pageNumber => (
              <Button
                key = {pageNumber}
                className = {`${pageNumber === searchedMovies.page ? 'selected-btn' : 'pagination-btn'}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Button>
          ))}
            <Button
              className = "pagination-btn"
              disabled = {searchedMovies.page === searchedMovies.total_pages}
              onClick = {() => handlePageChange(searchedMovies.page + 1, nextPage)}
            >
              <NavigateNextIcon className = "pagination-btn"/>
            </Button>
        </div>
        </div>
      )}
    </div>
  );
}

export default Search;
