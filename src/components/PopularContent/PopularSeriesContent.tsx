import { getPopularSeries } from "@/services/seriesApi";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SerieContent from "../SerieContent/SerieContent";
import {
    Box,
    CircularProgress,
    Container,
    Grid,
    Pagination,
    Stack,
} from "@mui/material";

export default function PopularSeriesContent() {
    const [popularSeries, setPopularSeries] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchSeriesData = useCallback(async () => {
        setLoading(true);
        const data = await getPopularSeries(page);
        setPopularSeries(data.results);
        setLoading(false);
    }, [page]);

    useEffect(() => {
        fetchSeriesData().catch(console.error);
    }, [fetchSeriesData]);

    function handlePage(event: ChangeEvent<unknown>, value: number) {
        setPage(value);
    }

    return (
        <Container>
            <Grid container columns={4}>
                {loading == true ? (
                    <Box display={"flex"} justifyContent={"center"}>
                        <CircularProgress
                            size="large"
                            sx={{ margin: "5px auto" }}
                        />
                    </Box>
                ) : (
                    popularSeries.map((serie, index) => {
                        return (
                            <SeriesContainer key={index}>
                                <SerieContent serie={serie} />
                            </SeriesContainer>
                        );
                    })
                )}
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

const SeriesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
