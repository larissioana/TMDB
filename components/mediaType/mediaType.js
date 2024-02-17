import React from 'react'
import MediaTypeTv from './mediaTypeTv';
import MediaTypeMovies from './mediaTypeMovies';
import MediaTypePerson from './mediaTypePerson';
import styles from './mediaType.module.css';
import Loading from '../loading/loading';

const MediaType = ({mediaTypeMovie, mediaTypeTv, mediaTypePerson, isLoading}) =>
{
  return (
    <>
    {
        !isLoading ?
        <div className = {styles.container}>
            {
                mediaTypeMovie?.map((result) => {
                    return <MediaTypeMovies movies = {result} key = {result.id}/>
                })
            }
            {
                mediaTypeTv?.map((result) =>
                {
                    return <MediaTypeTv tvShows = {result} key = {result.id}/>
                })
            }
            {
                mediaTypePerson?.map((result) =>
                {
                    return <MediaTypePerson key = {result.id} person = {mediaTypePerson}/>
                })
            }
        
        </div>
        :
        <Loading/>
    }
    </>
  )
};

export default MediaType;
