export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
};

export const shortenTitle = (title, maxLength) => {
    if (title) {
        if (title.length > maxLength) {
            return title.slice(0, maxLength) + '...';
        }
    }
    return title;
};

export const initialState =
{
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
};

export const vote = (vote_average) => {
    return parseFloat(vote_average).toFixed(1);
};