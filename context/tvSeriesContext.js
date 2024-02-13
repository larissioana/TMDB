import { createContext, useState, useContext } from "react";

const TvShowsContext = createContext();

export const useTvShowsContext = () =>
{
    const context = useContext(TvShowsContext);

    if (!context)
    {
        throw new Effor('useTvShowsContext must be within a TvShowProvider')
    }
    return context;
};

export const TvShowsProvider = ({children}) =>
{
    const [topRatedTvShows, setTopRatedTvShows] = useState([]);

    const value =
    {
        topRatedTvShows,
        setTopRatedTvShows,
    };

    return (
        <TvShowsContext.Provider value = {value}>
            {children}
        </TvShowsContext.Provider>
    )
};