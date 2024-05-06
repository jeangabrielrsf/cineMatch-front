import { useCallback, useEffect, useState } from "react";
import { getPopularMovies } from "@/services/moviesApi";
import MovieContent from "../MovieContent/MovieContent";
import styled from "styled-components";


export default function PopularMovieContent() {
    const [popularMovies, setPopularMovies] = useState([]);

    const fetchMoviesData = useCallback(async () => {
        const data = await getPopularMovies();
        console.log(data);
        setPopularMovies(data.results);
    },[])

    useEffect( ()=> {
        fetchMoviesData()
       .catch(console.error);
    }, [fetchMoviesData]);

    return (
        <Wrapper>
            <MoviesContainer>
                {popularMovies.length == 0? "" : popularMovies.map((movie:object, index) => {
                    return <MovieContent 
                                key={index}
                                movie={movie}
                            />
                })}
            </MoviesContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
`;

const MoviesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;