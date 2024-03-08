import { CardContent, Typography } from "@mui/material";
import { shortenTitle } from "@/utils/helpers";

const Card = ({ name, date }) => {
    const shortenedName = shortenTitle(name, 20);
    return (
        <div>
            <CardContent
                sx={{
                    backgroundColor: "#000000",
                    borderRadius: ".3rem",
                    width: "12.6rem"
                }}
            >
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="#fff"
                    className="typography"
                >
                    {shortenedName}
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
