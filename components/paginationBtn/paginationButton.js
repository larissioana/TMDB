import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Button } from '@mui/material';

const PaginationButton = ({ handlePageChange, filteredMovies, isLoading }) => {
    return (
        <div className="pagination">
            {
                !isLoading &&
                <>
                    <Button
                        className="pagination-btn"
                        disabled={filteredMovies.page === 1}
                        onClick={() => handlePageChange(filteredMovies.page - 1)}
                    >
                        <NavigateBeforeIcon className="pagination-btn" />
                    </Button>
                    {
                        Array.from({ length: filteredMovies.total_pages }, (_, index) => index + 1)
                            .slice(filteredMovies.page - 1, filteredMovies.page + 4)
                            .map(pageNumber => (
                                <Button
                                    key={pageNumber}
                                    className={`${pageNumber === filteredMovies.page ? 'selected-btn' : 'pagination-btn'}`}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </Button>
                            ))
                    }
                    <Button
                        className="pagination-btn"
                        disabled={filteredMovies.page === filteredMovies.total_pages}
                        onClick={() => handlePageChange(filteredMovies.page + 1)}
                    >
                        <NavigateNextIcon className="pagination-btn" />
                    </Button>
                </>
            }
        </div>
    )
};

export default PaginationButton;
