import UserTokenContext from "@/contexts/authContext";
import {
    getUserLikedSeries,
    likeAMovie,
    likeASerie,
} from "@/services/cinematch";
import { MovieData, SerieData } from "@/utils/contentUtils";
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

export default function SerieContent(props: Readonly<{ serie: any }>) {
    const [openInfo, setOpenInfo] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackStatus, setSnackStatus] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const userToken = useContext(UserTokenContext).userToken;
    const releaseDate = dayjs(props.serie.first_air_date).format("DD/MM/YYYY");

    function handleOpenDialog() {
        isSerieFavorited();
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

    async function isSerieFavorited() {
        const data = await getUserLikedSeries(userToken);
        const likedMovies = data.liked_series;
        for (let movie of likedMovies) {
            console.log(movie.title == props.serie.title);
            if (movie.title == props.serie.title) setIsLiked(true);
        }
    }

    async function handleLikeSerie() {
        if (!userToken) {
            // usuário não logado!
            return;
        }
        const serieData: SerieData = {
            name: props.serie.name,
            overview: props.serie.overview,
            tmdb_id: props.serie.id,
            popularity: props.serie.popularity,
            vote_average: props.serie.vote_average,
            vote_count: props.serie.vote_count,
            poster_path: props.serie.poster_path,
            first_air_date: props.serie.first_air_date,
        };
        try {
            const response = await likeASerie(userToken, serieData);
            handleSnackBarOpen("success");
        } catch (error) {
            console.error(error);
            handleSnackBarOpen("error");
        }
    }

    return (
        <>
            <Box onClick={handleOpenDialog}>
                <SeriePoster>
                    <img
                        src={
                            import.meta.env.VITE_BASE_POSTER_URL +
                            props.serie.poster_path
                        }
                        alt={props.serie.name}
                    />
                </SeriePoster>
            </Box>
            <Dialog open={openInfo} onClick={handleCloseDialog}>
                <DialogTitle>{props.serie.name}</DialogTitle>
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
                            props.serie.poster_path
                        }
                        alt={props.serie.name}
                    />
                    <CardContent>
                        <List>
                            <ListItem>
                                <Typography>{props.serie.overview}</Typography>
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
                                Nota média: {props.serie.vote_average}
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
                                    onClick={handleLikeSerie}
                                >
                                    Adicionar aos favoritos
                                </Button>
                            ) : (
                                <Button variant="contained" disabled>
                                    Seriado já favoritado!
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
                        Série adicionada com sucesso!
                    </Alert>
                ) : (
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        Não foi possível incluir!
                    </Alert>
                )}
            </Snackbar>
        </>
    );
}

const SeriePoster = styled.div`
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
