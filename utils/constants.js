import Netflix from '../assets/netflix-logo.png';
import StarIcon from '@mui/icons-material/Star';
import UpcomingIcon from '../assets/upcoming-movies.png';
import PopularIcon from '../assets/popular-movies.png'
import ActionIcon from '../assets/action.png';
import AdventureIcon from '../assets/adventure.png';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import AnimationIcon from '../assets/mickey.png';
import CrimeIcon from '../assets/crime.png';
import DocumentaryIcon from '../assets/documentary.png';
import DramaIcon from '../assets/drama.png';
import HorrorIcon from '../assets/horror.png';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import RomanceIcon from '../assets/romance.png';
import Image from 'next/image';

export const logo = Netflix;

export const genres = 
[
    {
        
        name: "Action",
        icon: <Image src = {ActionIcon} width = "20" height = "20" alt = "Action"/>
    },
    {
        name: "Adventure",
        icon: <Image src = {AdventureIcon} width = "20" height = "20" alt = "Adventure"/>
    },
    {
        name: "Animation",
        icon: <Image src = {AnimationIcon} width = "20" height = "20" alt = "Animation"/>
    },
    {
        name: "Comedy",
        icon: <TheaterComedyIcon/>
    },
    {
        name: "Crime",
        icon: <Image src = {CrimeIcon} width = "20" height = "20" alt = "Crime"/>
    },
    {
        name: "Documentary",
        icon: <Image src = {DocumentaryIcon} width = "20" height = "20" alt = "Documentary"/>
    },
    {
        name: "Drama",
        icon: <Image src = {DramaIcon} width = "20" height = "20" alt = "Drama"/>
    },
    {
        name: "Horror",
        icon: <Image src = {HorrorIcon} width = "20" height = "20" alt = "Horror"/>
    },
    {
        name: "Music",
        icon: <MusicNoteIcon/>
    },
    {
        name: "Romance",
        icon: <Image src = {RomanceIcon} width = "20" height = "20" alt = "Romance"/>
    }
];

