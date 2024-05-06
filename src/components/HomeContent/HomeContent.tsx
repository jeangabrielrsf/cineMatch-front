import { useCallback, useEffect, useState } from "react";
import PageSectionTitle from "../PageSectionTitle/PageSectionTitle";
import { getPopularMovies } from "@/services/moviesApi";
import { getPopularSeries } from "@/services/seriesApi";


export default function HomeContent() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularSeries, setPopularSeries] = useState([]);

    const fetchMoviesData = useCallback(async () => {
        const data = await getPopularMovies();
        console.log(data);
        setPopularMovies(data);
    },[])

    const fetchSeriesData = useCallback(async () => {
        const data = await getPopularSeries();
        console.log(data);
        setPopularSeries(data);
    },[])

    useEffect( ()=> {
        fetchMoviesData()
        fetchSeriesData()
       .catch(console.error);
    }, [fetchMoviesData, fetchSeriesData]);

    return (
        <>
            <PageSectionTitle title="filmes populares" />
            <PageSectionTitle title="séries populares" />
        </>
    )
}