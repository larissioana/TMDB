import { createContext, useState, useContext } from 'react';

const MovieContext = createContext();

export const useMovieContext = () =>
{
    const context = useContext(MovieContext);
    if (!context)
    {
        throw new Effor('useMovieContext must be within a MovieProvider')
    }
    return context;
};

export const MovieProvider = ({children}) =>
{
    const [movies, setMovies] = useState([]);
    const [activeGenre, setActiveGenre] = useState(null);
    const [activeContentType, setActiveContentType] = useState('movie'); 

  
    const value =
    {
        movies,
        setMovies,
        activeGenre,
        setActiveGenre,
        activeContentType,
        setActiveContentType
    };

    return (
        <MovieContext.Provider value = {value}>
            {children}
        </MovieContext.Provider>
    )
};