import React from 'react';
import { 
    fetchAPITvSeriesCredits, 
    fetchAPITvSeriesDetail, 
    fetchAPITvSeriesImages, 
    fetchAPITvSeriesRecommendations, 
    fetchAPITvSeriesVideo } 
from '@/utils/fetchFromAPI';
import TvSeriesDetail from '@/components/tvSeriesDetail/tvSeriesDetail';

export async function getServerSideProps(context)
{
    const tvSeriesId = context.params.tvSeries;

    const tvSeriesDetails = await fetchAPITvSeriesDetail(tvSeriesId);
    const tvSeriesCredits = await fetchAPITvSeriesCredits(tvSeriesId);
    const tvSeriesVideos = await fetchAPITvSeriesVideo(tvSeriesId);
    const tvSeriesImages = await fetchAPITvSeriesImages(tvSeriesId);
    const tvSeriesRecommendations = await fetchAPITvSeriesRecommendations(tvSeriesId);
    
    return {
        props: {
            tvSeriesDetails,
            tvSeriesCredits,
            tvSeriesVideos,
            tvSeriesImages,
            tvSeriesRecommendations
        }
    }
}

const Series = (
    {
        tvSeriesDetails,
        tvSeriesCredits, 
        tvSeriesVideos,
        tvSeriesImages,
        tvSeriesRecommendations
    }) =>
{
  return (
    <TvSeriesDetail
        tvSeries = {tvSeriesDetails}
        credits = {tvSeriesCredits}
        videos = {tvSeriesVideos}
        images = {tvSeriesImages}
        recommendations = {tvSeriesRecommendations}
    />
  )
};

export default Series;
