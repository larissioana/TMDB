import NavigationBar from '@/components/navigationBar/navigationBar';
import { fetchAPIQuery } from '@/utils/fetchFromAPI';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Searchbar from '@/components/searchbar/searchbar';
import dynamic from 'next/dynamic';
import { initialState } from '@/utils/helpers';
import PaginationButton from '@/components/paginationBtn/paginationButton';
const MediaType = dynamic(() => import('@/components/mediaType/mediaType'));

const Search = () => {
  const [searchedMovies, setSearchedMovies] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { query } = router.query;

  const getMovies = async (query, page) => {
    try {
      setIsLoading(true);
      const data = await fetchAPIQuery("search", "multi", query, page);

      setSearchedMovies((prev) => ({
        ...data,
        results: page > 1 ? [...prev.results, ...data.results] : [...data.results],
      }));
      setIsLoading(false);
    } catch (error) {
      console.error('API error', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      setSearchedMovies(initialState);
      getMovies(query, 1);
    }
  }, [query]);

  const handlePageChange = async (newPage) => {
    try {
      setIsLoading(true);

      const newData = await fetchAPIQuery("search", "multi", query, newPage);

      setSearchedMovies((prev) => ({
        ...prev,
        page: newPage,
        results: newPage > 1 ? newData.results : [...prev.results, ...newData.results],
        total_pages: newData.total_pages,
        total_results: newData.total_results
      }));

      setIsLoading(false);
      window.scrollTo(0, 0);
    } catch (error) {
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
      <div style=
        {{
          padding: "5rem 2rem 2rem",
          display: "flex",
        }}
      >
        <Searchbar placeholder={query} />
      </div>
      {
        searchedMovies.results.length > 0 ?
          <h3 className="query">
            <span style={{ textTransform: "capitalize" }}>Search results for: </span>
            {query}
          </h3>
          :
          <h3 className="query">
            <span style={{ textTransform: "capitalize" }}>No results found for: </span>
            {query}
          </h3>
      }
      <div
        style=
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
          mediaTypeMovie={mediaTypeMovie}
          mediaTypePerson={mediaTypePerson}
          mediaTypeTv={mediaTypeTv}
          isLoading={isLoading}
        />
      </div>
      {
        searchedMovies.total_pages > 1 && (
          <div
            style=
            {{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2rem',
              }}
            >
              <PaginationButton filteredMovies={searchedMovies} handlePageChange={handlePageChange} />
            </div>
          </div>
        )}
    </div>
  );
}

export default Search;
