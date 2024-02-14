import ActionIcon from '../assets/action.png';
import AdventureIcon from '../assets/adventure.png';
import ThrillerIcon from '../assets/thriller.png';
import AnimationIcon from '../assets/mickey.png';
import CrimeIcon from '../assets/crime.png';
import DocumentaryIcon from '../assets/documentary.png';
import DramaIcon from '../assets/drama.png';
import HorrorIcon from '../assets/horror.png';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import RomanceIcon from '../assets/romance.png';
import FamilyIcon from '../assets/family.png';
import HourGlassIcon from '../assets/hoursglass.png';
import MisteryIcon from '../assets/mistery.png';
import KidsIcon from '../assets/kids.png';
import FantasyIcon from '../assets/fantasy.png';
import WesternIcon from '../assets/western.png';
import TalkIcon from '../assets/talk.png';
import PoliticsIcon from '../assets/politics.png';
import Image from 'next/image';

export const movieGenres = 
[
    {
        id: 28,
        name: "Action",
        icon: <Image src = {ActionIcon} alt = "action" width = "20" height = "20"/>
    },

    {
        id: 12,
        name: "Adventure",
        icon: <Image src = {AdventureIcon} alt = "adventure" width = "20" height = "20"/>
    },
    {
        id: 16,
        name: "Animation",
        icon: <Image src = {AnimationIcon} alt = "animation" width = "20" height = "20"/>
    },
    {
        id: 80,
        name: "Crime",
        icon: <Image src = {CrimeIcon} alt = "crime" width = "20" height = "20"/>
    },
    {
        id: 99,
        name: "Documentary",
        icon: <Image src = {DocumentaryIcon} alt = "documentary" width = "20" height = "20"/>
    },
    {
        id: 18,
        name: "Drama",
        icon: <Image src = {DramaIcon} alt = "drama" width = "20" height = "20"/>
    },
    {
        id: 10751,
        name: "Family",
        icon: <Image src = {FamilyIcon} alt = "family" width = "20" height = "20"/>
    },
    {
        id: 36,
        name: "History",
        icon: <Image src = {HourGlassIcon} alt = "history" width = "20" height = "20"/>
    },
    {
        id: 27,
        name: "Horror",
        icon: <Image src = {HorrorIcon} alt = "horror" width = "20" height = "20"/>
    },
    {
        id: 10402,
        name: "Music",
        icon: <MusicNoteIcon/>
    },
    {
        id: 9648,
        name: "Mistery",
        icon: <Image src = {MisteryIcon} alt = "mistery" width = "20" height = "20"/>
    },
    {
        id: 10749,
        name: "Romance",
        icon: <Image src = {RomanceIcon} alt = "romance" width = "20" height = "20"/>
    },
    {
        id: 53,
        name: "Thriller",
        icon: <Image src = {ThrillerIcon} alt = "thriller" width = "20" height = "20"/>
    }
];

export const tvGenres = 
[
    {
        id: 10759,
        name: "Action & Adventure",
        icon: <Image src = {ActionIcon} alt = "action" width = "20" height = "20"/>
    },
    {
        id: 16,
        name: "Animation",
        icon: <Image src = {AnimationIcon} alt = "animation" width = "20" height = "20"/>
    },
    {
        id: 80,
        name: "Crime",
        icon: <Image src = {CrimeIcon} alt = "crime" width = "20" height = "20"/>
    },
    {
        id: 99,
        name: "Documentary",
        icon: <Image src = {DocumentaryIcon} alt = "documentary" width = "20" height = "20"/>
    },
    {
        id: 18,
        name: "Drama",
        icon: <Image src = {DramaIcon} alt = "drama" width = "20" height = "20"/>
    },
    {
        id: 10751,
        name: "Family",
        icon: <Image src = {FamilyIcon} alt = "family" width = "20" height = "20"/>
    },
    {
        id: 10762,
        name: "Kids",
        icon: <Image src = {KidsIcon} alt = "kids" width = "20" height = "20"/>
    },
    {
        id: 9648,
        name: "Mistery",
        icon: <Image src = {MisteryIcon} alt = "mistery" width = "20" height = "20"/>
    },
    {
        id: 10765,
        name: "Sci-Fi & Fantasy",
        icon: <Image src = {FantasyIcon} alt = "sci-fi and fantasy" width = "20" height = "20"/>
    },
    {
        id: 10766,
        name: "Soap",
        icon: <Image src = {DramaIcon} alt = "soap" width = "20" height = "20"/>
    },
    {
        id: 10767,
        name: "Talk",
        icon: <Image src = {TalkIcon} alt = "talk" width = "20" height = "20"/>
    },
    {
        id: 10768,
        name: "War & Politics",
        icon: <Image src = {PoliticsIcon} alt = "war and politics" width = "20" height = "20"/>
    },
    {
        id: 37,
        name: "Western",
        icon: <Image src = {WesternIcon} alt = "western" width = "20" height = "20"/>
    }
];