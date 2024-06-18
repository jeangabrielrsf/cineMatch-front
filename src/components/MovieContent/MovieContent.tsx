import UserTokenContext from "@/contexts/authContext";
import { getUserLikedMovies, likeAMovie } from "@/services/cinematch";
import { MovieData } from "@/utils/contentUtils";
import { CalendarMonth, StarRate } from "@mui/icons-material";
import {
    Alert,
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
    Snackbar,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import styled from "styled-components";

export default function MovieContent(props: Readonly<{ movie: any }>) {
    const [openInfo, setOpenInfo] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackStatus, setSnackStatus] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const releaseDate = dayjs(props.movie.release_date).format("DD/MM/YYYY");
    const userToken = useContext(UserTokenContext).userToken;

    function handleOpenDialog() {
        isMovieFavorited();
        setOpenInfo(true);
    }

    function handleCloseDialog() {
        setOpenInfo(false);
    }

    function handleSnackBarOpen(status: string) {
        setSnackStatus(status);
        setOpenSnack(true);
    }

    function handleSnackBarClose() {
        setOpenSnack(false);
    }

    async function isMovieFavorited() {
        const data = await getUserLikedMovies(userToken);
        const likedMovies = data.liked_movies;
        console.log(props.movie);
        for (let movie of likedMovies) {
            console.log(movie.title == props.movie.title);
            if (movie.title == props.movie.title) setIsLiked(true);
        }
    }

    async function handleLikeMovie() {
        if (!userToken) {
            return;
        }
        const movieData: MovieData = {
            title: props.movie.title,
            overview: props.movie.overview,
            tmdb_id: props.movie.id,
            popularity: props.movie.popularity,
            vote_average: props.movie.vote_average,
            vote_count: props.movie.vote_count,
            poster_path: props.movie.poster_path,
            release_date: props.movie.release_date,
        };
        try {
            const response = await likeAMovie(userToken, movieData);
            handleSnackBarOpen("success");
        } catch (error) {
            console.error(error);
            handleSnackBarOpen("error");
        }
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
                        {userToken ? (
                            isLiked != true ? (
                                <Button
                                    variant="contained"
                                    onClick={handleLikeMovie}
                                >
                                    Adicionar aos favoritos
                                </Button>
                            ) : (
                                <Button variant="contained" disabled>
                                    Filme já favoritado!
                                </Button>
                            )
                        ) : (
                            <Button variant="contained" disabled>
                                Entre para adicionar este conteúdo aos
                                favoritos!
                            </Button>
                        )}
                    </CardActions>
                </Card>
            </Dialog>
            <Snackbar
                open={openSnack}
                autoHideDuration={5000}
                onClose={handleSnackBarClose}
            >
                {snackStatus === "success" ? (
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        Filme adicionado com sucesso!
                    </Alert>
                ) : (
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        Algo deu errado!
                    </Alert>
                )}
            </Snackbar>
        </>
    );
}

export const MoviePoster = styled.div`
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
