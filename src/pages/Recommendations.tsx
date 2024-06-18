import MovieContent from "@/components/MovieContent/MovieContent";
import SerieContent from "@/components/SerieContent/SerieContent";
import UserTokenContext from "@/contexts/authContext";
import {
    getMovieRecommendations,
    getSerieRecommendations,
} from "@/services/cinematch";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";

export default function Recommendations() {
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [recommendedSeries, setRecommendedSeries] = useState([]);
    const context = useContext(UserTokenContext);

    const { userToken } = context;

    const fecthRecommendedMovies = useCallback(async () => {
        const data = await getMovieRecommendations(userToken);
        setRecommendedMovies(data);
    }, [userToken]);

    const fetchRecommendedSeries = useCallback(async () => {
        const data = await getSerieRecommendations(userToken);
        setRecommendedSeries(data);
    }, [userToken]);

    useEffect(() => {
        fecthRecommendedMovies().catch(console.error);
        fetchRecommendedSeries().catch(console.error);
    }, [fetchRecommendedSeries, fecthRecommendedMovies]);

    return (
        <>
            <Box sx={{ padding: "10px" }}>
                <Typography
                    variant="h2"
                    justifyContent="center"
                    display="flex"
                    color="#fff"
                >
                    Recomendações de filmes
                </Typography>
                <Grid container spacing={3} justifyContent={"center"}>
                    {recommendedMovies.length === 0 ? (
                        <CircularProgress />
                    ) : (
                        recommendedMovies.map((movie, index) => {
                            return (
                                <Grid item key={index}>
                                    <MovieContent movie={movie} />
                                </Grid>
                            );
                        })
                    )}
                </Grid>
            </Box>
            <Box>
                <Typography
                    variant="h2"
                    justifyContent="center"
                    display="flex"
                    color="#fff"
                >
                    Recomendações de seriados
                </Typography>
                <Grid container spacing={3} justifyContent={"center"}>
                    {recommendedSeries.length === 0 ? (
                        <CircularProgress />
                    ) : (
                        recommendedSeries.map((serie, index) => {
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
