import { useState, useEffect } from 'react'
import styles from './tvSeries.module.css';
import { fetchAPITvSeries, IMAGE_URL_SMALL } from '@/utils/fetchFromAPI';
import NoImage from '../../assets/no-image.jpg';
import Image from 'next/image';
import TvSeriesCard from '../tvSeriesCard/tvSeriesCard';
import Loading from '../loading/loading';

const initialState = 
{
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

const TvSeries = () =>
{
  const [isLoading, setIsLoading] = useState(false);
  const [tvSeries, setTvSeries] = useState(initialState);
  const [hoveredId, setHoveredId] = useState(null);

  const fetchTvSeries = async (page) =>
  {
    try
    {
        setIsLoading(true);
        fetchAPITvSeries(page)
        .then((data) => 
        {
            setTvSeries(data);
            setIsLoading(false);
        })
    } catch(error)
    {
        console.error("Error fetching data:", error)
    }
  };
  
  useEffect(() =>
  {
    setIsLoading(true);
    fetchTvSeries(1);
  }, []);

  const handleMouseEnter = (id) =>
  {
    setHoveredId(id);
  };

  const handleMouseLeave = () =>
  {
    setHoveredId(null);
  };

  console.log({tvSeries})

  return (
    <>
        <h2 className = {styles.title}>Popular Tv series</h2>
        <div className = {styles.tvSeriesContainer}>
        <div className = {styles.tvSeriesContainer}>
       
            { !isLoading &&
            <>
            {
                tvSeries.results?.map((result) => 
            {
                const { id, poster_path, name, backdrop_path } = result;
                return <div key = {id}>
                    <div className = {styles.flexContainer}>
                        <div 
                            className = {styles.imgContainer}
                            onMouseEnter = {() => handleMouseEnter(id)}
                            onMouseLeave = {handleMouseLeave}
                        >
                        {
                            poster_path ?
                                <Image 
                                src = {`${IMAGE_URL_SMALL}${poster_path}`}
                                width = "200"
                                height = "200"
                                alt = {name}
                                className = {styles.img}
                                loading = "eager"
                                />
                            :
                                <Image 
                                src = {NoImage}
                                width = "200"
                                height = "200"
                                alt = {name}
                                className = {styles.img}
                                loading = "eager"
                                />     
                        }
                        
                           { hoveredId === id && <TvSeriesCard image = {backdrop_path} id = {id}/> }
                        </div>
                     
                    </div>
                    {isLoading && <Loading />}
                </div>
            })}
            </>
            }
           
        </div>
        </div>
    </>
  )
};

export default TvSeries;
