import dynamic from 'next/dynamic';
import { fetchTvSeasons } from '@/utils/fetchFromAPI';
const TvSeriesEpisodes = dynamic(() => import('../../components/tvSeriesEpisodes/tvSeriesEpisodes'));
import Link from 'next/link';
import styles from '../../components/tvSeriesEpisodes/tvSeriesEpisodes.module.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export async function getServerSideProps(context) {
    const tvSeriesId = context.query.season?.[0] || null;
    const seasonNumber = context.query.season?.[1] || null;

    const seasonDetails = await fetchTvSeasons(tvSeriesId, seasonNumber);

    return {
        props:
        {
            seasonDetails,
            tvSeriesId
        }
    }
}
const Season = ({ seasonDetails, tvSeriesId }) => {

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "flexStart",
                alignItems: "flexStart",
                flexDirection: "column",
                padding: "1rem 2rem"
            }}>
                <Link href={`/TvSeries/${tvSeriesId}`} className={styles.goBack}>
                    <ArrowBackIosNewIcon />
                </Link>
                {seasonDetails.episodes?.map((episode) => {
                    return <TvSeriesEpisodes episode={episode} key={episode.id} />
                })}
            </div>
        </>
    )
};

export default Season;
