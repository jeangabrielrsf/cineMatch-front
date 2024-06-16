import { CalendarMonth, StarRate } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";

export default function MovieContent(props: Readonly<{ movie: any }>) {
    const [openInfo, setOpenInfo] = useState(false);
    const releaseDate = dayjs(props.movie.release_date).format("DD/MM/YYYY");

    function handleOpenDialog() {
        setOpenInfo(true);
    }

    function handleCloseDialog() {
        setOpenInfo(false);
    }

    return (
        <>
            <Box onClick={handleOpenDialog}>
                <MoviePoster>
                    <img
                        src={
                            import.meta.env.VITE_BASE_POSTER_URL +
                            props.movie.poster_path
                        }
                        alt={props.movie.original_title}
                    />
                </MoviePoster>
            </Box>
            <Dialog open={openInfo} onClick={handleCloseDialog}>
                <DialogTitle>{props.movie.title}</DialogTitle>
                <Card
                    sx={{
                        maxWidth: "600px",
                        overflowY: "scroll",
                    }}
                >
                    <CardMedia
                        component="img"
                        height="300px"
                        sx={{ objectFit: "contain", maxWidth: "100%" }}
                        image={
                            import.meta.env.VITE_BASE_POSTER_URL +
                            props.movie.poster_path
                        }
                        alt={props.movie.title}
                    />
                    <CardContent>
                        <List>
                            <ListItem>
                                <Typography>{props.movie.overview}</Typography>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <CalendarMonth />
                                </ListItemIcon>
                                Data de lançamento: {releaseDate}
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <StarRate />
                                </ListItemIcon>
                                Nota média: {props.movie.vote_average}
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Button variant="contained">
                            Adicionar aos favoritos
                        </Button>
                    </CardActions>
                </Card>
            </Dialog>
        </>
    );
}

const MoviePoster = styled.div`
    margin: 5px 10px;
    img {
        width: 100%;
        height: 250px;
        object-fit: cover;
    }

    &:hover {
        cursor: pointer;
        filter: brightness(110%);
        transform: scale(1.05);
    }
`;
