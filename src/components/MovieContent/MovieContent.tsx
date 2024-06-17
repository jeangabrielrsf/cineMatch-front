import UserTokenContext from "@/contexts/authContext";
import { likeAMovie } from "@/services/cinematch";
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
    const releaseDate = dayjs(props.movie.release_date).format("DD/MM/YYYY");
    const userToken = useContext(UserTokenContext)?.userToken;

    function handleOpenDialog() {
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

    async function handleLikeMovie() {
        console.log(userToken);
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
        };
        try {
            const response = await likeAMovie(userToken, movieData);
            console.log(response);
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
                            <Button
                                variant="contained"
                                onClick={handleLikeMovie}
                            >
                                Adicionar aos favoritos
                            </Button>
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
