import { useEffect, useState } from 'react';
import { fetchAPIPopularPeople, fetchAPIPopularPerson } from '@/utils/fetchFromAPI';
import NavigationBar from '@/components/navigationBar/navigationBar';
import { Button } from '@mui/material';
import styles from '../../styles/people.module.css';
import Loading from '@/components/loading/loading';
import { IMAGE_URL_SMALL } from '@/utils/fetchFromAPI';
import Link from 'next/link';
import Image from 'next/image';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Searchbar from '@/components/searchbar/searchbar';

const initialState = 
{
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
};

const PopularPeople = () =>
{
  const [isLoading, setIsLoading] = useState(false);
  const [popularPeople, setPopularPeople] = useState(initialState);

  const fetchPopularPeople = async (page) =>
  {
    try
    {
      setIsLoading(true);
      const fetchPeople = await fetchAPIPopularPeople(page);
       setPopularPeople(prev => ({
        ...fetchPeople,
        results: page > 1 ? [...prev.results, ...fetchPeople.results] : [...fetchPeople.results]
       }))
       setIsLoading(false);
    } catch (error)
    {
      console.error('Api error fetching data:', error)
    }
  };
  
  useEffect(() => 
  {
    setPopularPeople(initialState);
    fetchPopularPeople(1);
  },[]);

console.log({popularPeople})

  const nextPage = popularPeople.page + 1;
  const previousPage = popularPeople.page - 1;
      
  const handlePageChange = async (newPage) =>
  {
    try
    {
      setIsLoading(true);
      
      const fetchNewPeople = await fetchAPIPopularPeople(newPage);
  
      setPopularPeople({
        page: newPage,
        results: fetchNewPeople.results,
        total_pages: fetchNewPeople.total_pages,
        total_results: fetchNewPeople.total_results
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
    <div className = {styles.popularPeopleWrapper}>
      <NavigationBar/>
      {
        !isLoading ?
        <div className = {styles.wrapper}>
        <h2 className = {styles.title}>Popular People</h2>
        <div className = {styles.container}>
        {
          popularPeople.results.map((people) => 
          {
            const { id, name, profile_path } = people;
            return <div key = {id} className = {styles.peopleContainer}>
              {
                profile_path !== null &&
                <>
                  <Link href = {`/actor/${encodeURI(id)}/${name.replace(/\s+/g, '-').toLowerCase()}`}>
                    <Image
                      src = {`${IMAGE_URL_SMALL}${profile_path}`}
                      width = "200"
                      height = "320"
                      alt = {name}
                      loading = "eager"
                      className = {styles.people}
                      layout = "fixed"
                    />
                    
                  </Link>
                  <h3 className = {styles.name}>{name}</h3>
              </>
              }
            </div>
          })
        }
      </div>
      <div className = "pagination">
        <Button
          className = "pagination-btn"
          disabled = {popularPeople.page === 1}
          onClick={() => handlePageChange(popularPeople.page - 1, previousPage)}
        >
          <NavigateBeforeIcon/>
        </Button>
        {
          Array.from({ length: popularPeople.total_pages }, (_, index) => index + 1)
          .slice(popularPeople.page - 1, popularPeople.page + 4)
          .map(pageNumber => (
            <Button
              key = {pageNumber}
              className = "pagination-btn"
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
        ))}
        <Button
          className = "pagination-btn"
          disabled = {popularPeople.page === popularPeople.total_pages}
          onClick = {() => handlePageChange(popularPeople.page + 1, nextPage)}
        >
          <NavigateNextIcon/>
        </Button>
      </div>
      </div>
      :
      <Loading/>
      }
    </div>
  )
};

export default PopularPeople;
