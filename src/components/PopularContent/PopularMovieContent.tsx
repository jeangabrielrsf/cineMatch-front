import {
    ChangeEvent,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { getPopularMovies } from "@/services/moviesApi";
import MovieContent from "../MovieContent/MovieContent";
import styled from "styled-components";
import MoviesContext from "@/contexts/movieContext";
import {
    Box,
    CircularProgress,
    Container,
    Grid,
    Pagination,
    Stack,
} from "@mui/material";

export default function PopularMovieContent() {
    const { popularMovies, setPopularMovies } = useContext(MoviesContext);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchMoviesData = useCallback(async () => {
        setLoading(true);
        const data = await getPopularMovies(page);
        setPopularMovies(data.results);
        setLoading(false);
    }, [page]);

    useEffect(() => {
        fetchMoviesData().catch(console.error);
    }, [fetchMoviesData]);

    function handlePage(event: ChangeEvent<unknown>, value: number) {
        setPage(value);
    }
    return (
        <Container>
            <Grid container columns={4}>
                <MoviesContainer>
                    {loading == true ? (
                        <Box display={"flex"} justifyContent={"center"}>
                            <CircularProgress
                                size="large"
                                sx={{ margin: "5px auto" }}
                            />
                        </Box>
                    ) : (
                        popularMovies.map((movie: object, index) => {
                            return <MovieContent key={index} movie={movie} />;
                        })
                    )}
                </MoviesContainer>
            </Grid>
            <Stack spacing={2}>
                <Pagination
                    onChange={handlePage}
                    count={20}
                    size="large"
                    sx={{
                        border: "1px solid black",
                        display: "flex",
                        justifyContent: "center",
                        color: "#fff",
                    }}
                />
            </Stack>
        </Container>
    );
}

const MoviesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
