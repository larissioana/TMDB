import { useEffect, useState } from 'react';
import { IMAGE_URL_342, fetchAPI, fetchAPIQuery } from '@/utils/fetchFromAPI';
import NavigationBar from '@/components/navigationBar/navigationBar';
import styles from '../../styles/people.module.css';
import Loading from '@/components/loading/loading';
import Link from 'next/link';
import Image from 'next/image';
import { CardContent, Typography, Paper } from '@mui/material';
import { initialState } from '@/utils/helpers';
import PaginationButton from '@/components/paginationBtn/paginationButton';
import Head from 'next/head';

const Popular = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [popularPeople, setPopularPeople] = useState(initialState);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPopularPeople = async (page) => {
    try {
      setIsLoading(true);
      const fetchPeople = await (!searchTerm ? fetchAPI("person", "popular", page) : fetchAPIQuery("search", "person", searchTerm, page))
      const sortedResults = fetchPeople.results.sort((a, b) =>
        a.name.localeCompare(b.name))
      setPopularPeople(prev => ({
        ...fetchPeople,
        results: page > 1 ? [...prev.results, ...sortedResults] : [...sortedResults]
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
      }, 500);
      return () => clearTimeout(timer);
    } else {
      fetchPopularPeople(1);
    }
  }, [searchTerm]);

  const handlePageChange = async (newPage) => {
    try {
      setIsLoading(true);
      const fetchNewPeople = await fetchAPI("person", "popular", newPage);

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
    <>
      <Head>
        <title>Popular People</title>
        <meta name="description" content="Search for a popular person and see biography"></meta>
      </Head>
      <div className={styles.popularPeopleWrapper}>
        <NavigationBar />
        <div className={styles.searchbarContainer} style={{
          marginBottom: "-2rem"
        }}>
          <Paper
            sx=
            {{
              borderBottom: "1px solid white",
              borderRadius: 0,
              background: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(10px)",
              mr: { sm: 4 },
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
            <div className={styles.wrapper} >
              <div className={styles.container}>
                {
                  popularPeople.results.map((result) => {
                    const { name, id, profile_path } = result;
                    return <div key={id}>
                      {
                        profile_path !== null &&
                        <>
                          <Link
                            href={`/actor/${encodeURI(id)}/${name.replace(/\s+/g, '-').toLowerCase()}`}
                          >
                            <Image
                              src={`${IMAGE_URL_342}${profile_path}`}
                              width={208}
                              height={280}
                              alt={name}
                              loading="eager"
                              className={styles.people}
                              placeholder="blur"
                              blurDataURL={`${IMAGE_URL_342}${profile_path}`}
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
                              {name}
                            </Typography>
                          </CardContent>
                        </>
                      }
                    </div>
                  })
                }


              </div>
              {
                !searchTerm &&
                <PaginationButton filteredMovies={popularPeople} handlePageChange={handlePageChange} />
              }
            </div>
            :
            <Loading />
        }
      </div>
    </>
  )
};

export default Popular;
