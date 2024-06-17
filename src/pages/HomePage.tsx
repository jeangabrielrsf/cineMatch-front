import { Box, Button, Typography } from "@mui/material";

export default function HomePage() {
    return (
        <Box
            sx={{
                alignItems: "center",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography variant="h3" sx={{ color: "#0F4C75" }}>
                Cansou de perder tempo pensando no que assistir, seja sozinho ou
                acompanhado? Deixa com a gente!
            </Typography>
            <Typography variant="h3" sx={{ color: "#0F4C75" }}>
                Clique no botão abaixo e vamos recomendar conteúdos de acordos
                com o seu gosto!
            </Typography>
            <Box
                sx={{
                    mx: "auto",
                    width: "80%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Button variant="contained" size="large">
                    O que assistir?
                </Button>
            </Box>
        </Box>
    );
}
