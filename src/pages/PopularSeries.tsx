import PageSectionTitle from "@/components/PageSectionTitle/PageSectionTitle";
import PopularSeriesContent from "@/components/PopularContent/PopularSeriesContent";
import { Box, Typography } from "@mui/material";

export default function PopularSeries() {
    return (
        <Box sx={{ padding: "10px" }}>
            <Typography
                variant="h2"
                color="#BBE1FA"
                justifyContent="center"
                display="flex"
            >
                Séries Populares
            </Typography>
            <PopularSeriesContent />
        </Box>
    );
}
