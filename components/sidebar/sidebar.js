import { Stack } from '@mui/material';
import { useMovieContext } from '@/context/moviesContext';
import ActionIcon from '../../assets/action.png';
import AdventureIcon from '../../assets/adventure.png';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import AnimationIcon from '../../assets/mickey.png';
import CrimeIcon from '../../assets/crime.png';
import DocumentaryIcon from '../../assets/documentary.png';
import DramaIcon from '../../assets/drama.png';
import HorrorIcon from '../../assets/horror.png';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import RomanceIcon from '../../assets/romance.png';
import FantasyIcon from '../../assets/fantasy.png';
import HourGlassIcon from '../../assets/hourglass.png';
import MisteryIcon from '../../assets/mistery.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Sidebar = () =>
{
   
    const { setActiveGenre, activeGenre } = useMovieContext();
    const router = useRouter();

    const handleGenres = (genre) => 
    {   
        setActiveGenre(genre);
        router.push({
            pathname: '/genres',
            query: { activeGenre: genre },
        });
    };

  return (
    <Stack
    >  
        <div className = "sidebar">
            <button 
                className = "navBtn"
                onClick = {() => handleGenres(28)} 
            >
                <Image src= {ActionIcon} width = '20' height = '20' alt = 'action icon'/>
                Action
            </button>
            <button
                className = "navBtn"
                onClick = {() => handleGenres(12)}
            >
                <Image src= {AdventureIcon} width = '20' height = '20' alt = 'action icon'/>
                Adventure
            </button>
            <button 
                className = "navBtn"
                onClick = {() => handleGenres(16)}
            >
                <Image src= {AnimationIcon} width = '20' height = '20' alt = 'animation icon'/>
                Animation
            </button>
            <button
                className = "navBtn"
                onClick = {() => handleGenres(80)}
            >
                <Image src= {CrimeIcon} width = '20' height = '20' alt = 'crime icon'/>
                Crime
            </button>
            <button 
                className = "navBtn"
                onClick = {() => handleGenres(99)}
            >
                <Image src= {DocumentaryIcon} width = '20' height = '20' alt = 'documentary icon'/>
                Documentary
            </button>
            <button 
                className = "navBtn"
                onClick = {() => handleGenres(18)}
            >
                <Image src= {DramaIcon} width = '20' height = '20' alt = 'drama icon'/>
                Drama
            </button>
            <button 
                className = "navBtn"
                onClick = {() => handleGenres(14)}
            >
                <Image src= {FantasyIcon} width = '20' height = '20' alt = 'drama icon'/>
                Fantasy
            </button>
            <button 
                className = "navBtn"
                onClick = {() => handleGenres(36)}
            >
                <Image src= {HourGlassIcon} width = '20' height = '20' alt = 'drama icon'/>
                History
            </button>
            <button
                className = "navBtn"
                onClick = {() => handleGenres(27)}
            >
                <Image src= {HorrorIcon} width = '25' height = '25' alt = 'horror icon'/>
                Horror
            </button>
            <button
                className = "navBtn"
                onClick = {() => handleGenres(9648)}
            >
                <Image src = {MisteryIcon} width = '20' height = '25' alt = 'mistery icon'/>
                Mistery
            </button>
            <button
                className = "navBtn"
                onClick = {() => handleGenres(10402)}
            >
                <MusicNoteIcon className = "icon"/>
                Music
            </button>
            <button 
                className = "navBtn"
                onClick = {() => handleGenres(10749)}
                >
                <Image src= {RomanceIcon} width = '20' height = '20' alt = 'romance icon'/>
                Romance
            </button>
            <button 
                className = "navBtn"
                onClick = {() =>handleGenres(35)}
            >
                <TheaterComedyIcon className = "icon"/>
                Theater
            </button>
        </div>
    </Stack>
  )
}

export default Sidebar;
