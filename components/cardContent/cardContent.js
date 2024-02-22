import { CardContent, Typography } from "@mui/material";

const Card = ({ name, date }) => {
    return (
        <div>
            <CardContent
                sx={{
                    backgroundColor: "#000000",
                }}
            >
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="#fff"
                    className="typography"
                >
                    {name}
                </Typography>
                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="#827e73"
                >
                    {date}
                </Typography>
            </CardContent>
        </div>
    )
};

export default Card;
