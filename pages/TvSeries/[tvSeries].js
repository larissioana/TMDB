import React from 'react';
import { fetchAPITvSeriesCredits, fetchAPITvSeriesDetail, fetchAPITvSeriesImages, fetchAPITvSeriesVideo } from '@/utils/fetchFromAPI';
import TvSeriesDetail from '@/components/tvSeriesDetail/tvSeriesDetail';

export async function getServerSideProps(context)
{
    const tvSeriesId = context.params.tvSeries;
    const tvSeriesDetails = await fetchAPITvSeriesDetail(tvSeriesId);
    const tvSeriesCredits = await fetchAPITvSeriesCredits(tvSeriesId);
    const tvSeriesVideos = await fetchAPITvSeriesVideo(tvSeriesId);
    const tvSeriesImages = await fetchAPITvSeriesImages(tvSeriesId);

    return {
        props: {
            tvSeriesDetails,
            tvSeriesCredits,
            tvSeriesVideos,
            tvSeriesImages
        }
    }
}

const TvSeries = (
    {
        tvSeriesDetails,
        tvSeriesCredits, 
        tvSeriesVideos,
        tvSeriesImages
    }) =>
{
  return (
    <TvSeriesDetail
        tvSeries = {tvSeriesDetails}
        credits = {tvSeriesCredits}
        videos = {tvSeriesVideos}
        images = {tvSeriesImages}
    />
  )
};

export default TvSeries;
