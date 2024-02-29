import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Button } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const PaginationButton = ({ handlePageChange, filteredMovies }) => {
    return (
        <>
            <div className="pagination">
                <Button
                    className="pagination-btn"
                    disabled={filteredMovies.page === 1}
                    onClick={() => handlePageChange(filteredMovies.page - 1)}
                >
                    <NavigateBeforeIcon className="pagination-btnIcon" />
                </Button>
                {
                    Array.from({ length: filteredMovies.total_pages }, (_, index) => index + 1)
                        .slice(filteredMovies.page - 1, filteredMovies.page + 4)
                        .map(pageNumber => (
                            <FiberManualRecordIcon
                                key={pageNumber}
                                className={`${pageNumber === filteredMovies.page ? 'selected-btn' : 'pagination-btn'}`}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </FiberManualRecordIcon>
                        ))
                }
                <Button
                    className="pagination-btn"
                    disabled={filteredMovies.page === filteredMovies.total_pages}
                    onClick={() => handlePageChange(filteredMovies.page + 1)}
                >
                    <NavigateNextIcon className="pagination-btnIcon" />
                </Button>

            </div>
            <div className="pages">
                <p>Page {filteredMovies.page} of {filteredMovies.total_pages}</p>
            </div>
        </>
    )
};

export default PaginationButton;
