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
