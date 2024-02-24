import { Stack } from '@mui/material';
import { useMovieContext } from '@/context/moviesContext';
import { useRouter } from 'next/router';
import { movieGenres, tvGenres } from '@/utils/sidebar';
import Image from 'next/image';

const Sidebar = () => {
    const { setActiveGenre, activeContentType } = useMovieContext();
    const router = useRouter();

    const handleGenres = (genre) => {
        setActiveGenre(genre);
        router.push({
            pathname: '/genres',
            query: { genre: genre },
        });
    };

    const genres = activeContentType === 'movie' ? movieGenres : tvGenres;

    return (
        <Stack
        >
            <div className="sidebar">
                {
                    genres.map((genre) => (
                        <button
                            key={genre.id}
                            className="navBtn"
                            onClick={() => handleGenres(genre.id)}
                        >
                            <Image alt={genre.alt} priority src={genre.icon} width={20} height={20} />
                            {genre.name}
                        </button>
                    ))}
            </div>
        </Stack>
    )
}

export default Sidebar;
