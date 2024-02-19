import { useEffect, useState } from 'react';
import { IMAGE_URL_342, fetchAPIPopularPeople, fetchAPIPopularPersonSearch } from '@/utils/fetchFromAPI';
import NavigationBar from '@/components/navigationBar/navigationBar';
import { Button } from '@mui/material';
import styles from '../../styles/people.module.css';
import Loading from '@/components/loading/loading';
import Link from 'next/link';
import Image from 'next/image';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { CardContent, Typography, Paper } from '@mui/material';

const initialState =
{
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
};

const Popular = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [popularPeople, setPopularPeople] = useState(initialState);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPopularPeople = async (page) => {
    try {
      setIsLoading(true);
      const fetchPeople = await (!searchTerm ? fetchAPIPopularPeople(page) : fetchAPIPopularPersonSearch(searchTerm, page))
      setPopularPeople(prev => ({
        ...fetchPeople,
        results: page > 1 ? [...prev.results, ...fetchPeople.results] : [...fetchPeople.results]
      }))
      setIsLoading(false);
    } catch (error) {
      console.error('Api error fetching data:', error)
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const timer = setTimeout(() => {
        fetchPopularPeople(1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      fetchPopularPeople(1);
    }
  }, [searchTerm]);

  const nextPage = popularPeople.page + 1;
  const previousPage = popularPeople.page - 1;

  const handlePageChange = async (newPage) => {
    try {
      setIsLoading(true);
      const fetchNewPeople = await (!searchTerm ? fetchAPIPopularPeople(newPage) : fetchAPIPopularPersonSearch(searchTerm, newPage));

      setPopularPeople({
        page: newPage,
        results: fetchNewPeople.results,
        total_pages: fetchNewPeople.total_pages,
        total_results: fetchNewPeople.total_results
      });
      setIsLoading(false);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('API error', error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div className={styles.popularPeopleWrapper}>
      <NavigationBar />
      <div className={styles.searchbarContainer}>
        <Paper
          sx=
          {{
            borderBottom: "1px solid var(--white10)",
            borderRadius: 0,
            background: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(10px)",
            mr: { sm: 4 },
            marginTop: "1.5rem"
          }}
        >
          <input
            className="search-bar"
            placeholder={"Search for a person..."}
            onChange={handleInputChange}
            value={searchTerm}
          />
        </Paper>
      </div>
      {
        !isLoading ?
          <div className={styles.wrapper}>
            <div className={styles.container}>
              {popularPeople.results.length > 0 ? (
                popularPeople.results.map((people) => (
                  <div key={people.id} className={styles.peopleContainer}>
                    {people.profile_path !== null && (
                      <>
                        <Link
                          href={`/actor/${encodeURI(people.id)}/${people.name.replace(/\s+/g, '-').toLowerCase()}`}
                        >
                          <Image
                            src={`${IMAGE_URL_342}${people.profile_path}`}
                            width={208}
                            height={280}
                            alt={people.name}
                            loading="eager"
                            className={styles.people}
                            placeholder="blur"
                            blurDataURL={`${IMAGE_URL_342}${people.profile_path}`}
                          />
                        </Link>
                        <CardContent
                          sx={{
                            backgroundColor: "#000",
                            width: "13rem",
                            borderRadius: ".2rem"
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            className={styles.name}
                            color="#fff"
                          >
                            {people.name}
                          </Typography>
                        </CardContent>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p className={styles.noResults}>No results found &#128542;</p>
              )}
            </div>
            {
              !searchTerm &&
              <div className="pagination">
                <Button
                  className="pagination-btn"
                  disabled={popularPeople.page === 1}
                  onClick={() => handlePageChange(popularPeople.page - 1, previousPage)}
                >
                  <NavigateBeforeIcon />
                </Button>
                {Array.from({ length: popularPeople.total_pages }, (_, index) => index + 1)
                  .slice(popularPeople.page - 1, popularPeople.page + 4)
                  .map(pageNumber => (
                    <Button
                      key={pageNumber}
                      className={`pagination-btn ${pageNumber === popularPeople.page ? 'selected-btn' : ''}`}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  ))}
                <Button
                  className="pagination-btn"
                  disabled={popularPeople.page === popularPeople.total_pages}
                  onClick={() => handlePageChange(popularPeople.page + 1, nextPage)}
                >
                  <NavigateNextIcon />
                </Button>
              </div>
            }
          </div>
          :
          <Loading />
      }
    </div>
  )
};

export default Popular;
