import {
    fetchAPIData,
    fetchAPIDetails,
    fetchAPIMedia,
}
    from '@/utils/fetchFromAPI';
import TvSeriesDetail from '@/components/tvSeriesDetail/tvSeriesDetail';

const cache = {};

export async function getServerSideProps(context) {
    const tvSeriesId = context.params.tvSeries;

    const tvSeriesDetails = await fetchAPIDetails("tv", tvSeriesId);
    const tvSeriesCredits = await fetchAPIData("tv", tvSeriesId, "credits");
    const tvSeriesVideos = await fetchAPIData("tv", tvSeriesId, "videos");
    const tvSeriesImages = await fetchAPIMedia("tv", tvSeriesId, "images");
    const tvSeriesRecommendations = await fetchAPIDetails("tv", tvSeriesId, "recommendations");

    if (cache[tvSeriesId]) {
        return { props: cache[tvSeriesId] };
    }

    cache[tvSeriesId] = {
        tvSeriesCredits,
        tvSeriesDetails,
        tvSeriesImages,
        tvSeriesVideos,
        tvSeriesRecommendations
    };

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
    }) => {

    return (
        <TvSeriesDetail
            tvSeries={tvSeriesDetails}
            credits={tvSeriesCredits}
            videos={tvSeriesVideos}
            images={tvSeriesImages}
            recommendations={tvSeriesRecommendations}
        />
    )
};

export default Series;
