import { Box, Typography } from "@mui/material";

export default function UserFavorites() {
    return (
        <>
            <Box sx={{ padding: "10px" }}>
                <Typography
                    variant="h2"
                    color="#F07B3F"
                    justifyContent="center"
                    display="flex"
                >
                    Seus filmes favoritos
                </Typography>
            </Box>
            <Box sx={{ padding: "10px" }}>
                <Typography
                    variant="h2"
                    color="#F07B3F"
                    justifyContent="center"
                    display="flex"
                >
                    Seus seriados favoritos
                </Typography>
            </Box>
        </>
    );
}
