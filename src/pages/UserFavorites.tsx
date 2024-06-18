import MovieContent, {
    MoviePoster,
} from "@/components/MovieContent/MovieContent";
import SerieContent from "@/components/SerieContent/SerieContent";
import UserTokenContext from "@/contexts/authContext";
import { getUserLikedMovies, getUserLikedSeries } from "@/services/cinematch";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";

export default function UserFavorites() {
    const [likedMovies, setLikedMovies] = useState([]);
    const [likedSeries, setLikedSeries] = useState([]);
    const { userToken } = useContext(UserTokenContext);

    const fetchLikedMovies = useCallback(async () => {
        const data = await getUserLikedMovies(userToken);
        setLikedMovies(data.liked_movies);
    }, []);

    const fetchLikedSeries = useCallback(async () => {
        const data = await getUserLikedSeries(userToken);
        setLikedSeries(data.liked_series);
    }, []);

    useEffect(() => {
        fetchLikedMovies().catch(console.error);
        fetchLikedSeries().catch(console.error);
    }, [fetchLikedMovies, fetchLikedSeries]);

    return (
        <>
            <Box sx={{ padding: "10px" }}>
                <Typography
                    variant="h2"
                    color="#fff"
                    justifyContent="center"
                    display="flex"
                >
                    Seus filmes favoritos
                </Typography>
                <Grid container spacing={3} justifyContent={"center"}>
                    {likedMovies.length === 0 ? (
                        <CircularProgress />
                    ) : (
                        likedMovies.map((movie, index) => {
                            return (
                                <Grid item key={index}>
                                    <MovieContent movie={movie} />
                                </Grid>
                            );
                        })
                    )}
                </Grid>
            </Box>
            <Box sx={{ padding: "10px" }}>
                <Typography
                    variant="h2"
                    color="#fff"
                    justifyContent="center"
                    display="flex"
                >
                    Seus seriados favoritos
                </Typography>
                <Grid container spacing={3} justifyContent={"center"}>
                    {likedSeries.length === 0 ? (
                        <CircularProgress />
                    ) : (
                        likedSeries.map((serie, index) => {
                            return (
                                <Grid item key={index}>
                                    <SerieContent serie={serie} />
                                </Grid>
                            );
                        })
                    )}
                </Grid>
            </Box>
        </>
    );
}
