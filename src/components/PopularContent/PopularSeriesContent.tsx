import { getPopularSeries } from "@/services/seriesApi";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SerieContent from "../SerieContent/SerieContent";

export default function PopularSeriesContent() {
    const [popularSeries, setPopularSeries] = useState([]);

    const fetchSeriesData = useCallback( async () => {
        const data = await getPopularSeries();
        setPopularSeries(data.results);
    },[])

    useEffect(()=> {
        fetchSeriesData()
        .catch(console.error);
    }, [fetchSeriesData])

    return (
        <SeriesContainer>
            {popularSeries.length == 0? "Carregando..." : popularSeries.map((serie, index) => {
                return <SerieContent
                            key={index}
                            serie={serie}
                        />
            })}
        </SeriesContainer>
    )

}

const SeriesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

`