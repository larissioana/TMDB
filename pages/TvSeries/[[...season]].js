import dynamic from 'next/dynamic';
import { fetchTvSeasons } from '@/utils/fetchFromAPI';
const TvSeriesEpisodes = dynamic(() => import('../../components/tvSeriesEpisodes/tvSeriesEpisodes'));

export async function getServerSideProps(context) {
    const { params } = context;
    const { season } = params;
    const [tvSeriesId, seasonNumber] = season;
    const seasonDetails = await fetchTvSeasons(tvSeriesId, seasonNumber);

    return {
        props:
        {
            seasonDetails
        }
    }
}
const Season = ({ seasonDetails }) => {
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "flexStart",
                alignItems: "flexStart",
                flexDirection: "column",
                padding: "1rem 2rem"
            }}>
                {seasonDetails.episodes.map((episode) => {
                    return <TvSeriesEpisodes episode={episode} key={episode.id} />
                })}
            </div>
        </>
    )
};

export default Season;
