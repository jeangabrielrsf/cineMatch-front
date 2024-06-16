import { CalendarMonth, StarRate } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    Typography,
} from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

export default function SerieContent(props: Readonly<{ serie: any }>) {
    const [openInfo, setOpenInfo] = useState(false);

    function handleOpenDialog() {
        setOpenInfo(true);
    }

    function handleCloseDialog() {
        setOpenInfo(false);
    }

    return (
        <>
            <Box onClick={handleOpenDialog}>
                <SeriePoster>
                    <img
                        src={
                            import.meta.env.VITE_BASE_POSTER_URL +
                            props.serie.poster_path
                        }
                        alt={props.serie.name}
                    />
                </SeriePoster>
            </Box>
            <Dialog open={openInfo} onClick={handleCloseDialog}>
                <DialogTitle>{props.serie.name}</DialogTitle>
                <Card
                    sx={{
                        maxWidth: "600px",
                        overflowY: "scroll",
                    }}
                >
                    <CardMedia
                        component="img"
                        height="300px"
                        sx={{ objectFit: "contain", maxWidth: "100%" }}
                        image={
                            import.meta.env.VITE_BASE_POSTER_URL +
                            props.serie.poster_path
                        }
                        alt={props.serie.name}
                    />
                    <CardContent>
                        <List>
                            <ListItem>
                                <Typography>{props.serie.overview}</Typography>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <CalendarMonth />
                                </ListItemIcon>
                                Data de lançamento: {props.serie.first_air_date}
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <StarRate />
                                </ListItemIcon>
                                {props.serie.vote_average}
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Button variant="contained">
                            Adicionar aos favoritos
                        </Button>
                    </CardActions>
                </Card>
            </Dialog>
        </>
    );
}

const SeriePoster = styled.div`
    margin: 5px 10px;
    img {
        width: 100%;
        height: 250px;
        object-fit: cover;
    }

    &:hover {
        cursor: pointer;
        filter: brightness(110%);
        transform: scale(1.05);
    }
`;
