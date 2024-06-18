import LoginDialog from "@/components/LoginDialog";
import UserTokenContext from "@/contexts/authContext";
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Stepper,
    Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const { userToken, setUserToken } = useContext(UserTokenContext);

    function handleClickButton() {
        if (!userToken) {
            setOpenDialog(true);
        } else {
            navigate("/recomendacoes");
        }
    }

    return (
        <Box
            sx={{
                alignItems: "center",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography variant="h3" sx={{ color: "#fff" }}>
                Cansou de perder tempo pensando no que assistir? Deixa com a
                gente!
            </Typography>

            <Typography></Typography>
            <Stack direction="row" spacing={2} margin={"50px"}>
                <Card>
                    <CardContent>
                        <Stepper></Stepper>
                        <Typography>Navegue entre os conteúdos</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography>
                            Adicione-os à sua lista de favoritos
                        </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography>
                            Receba recomendações com base nos seus favoritos
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>

            <Box
                sx={{
                    mx: "auto",
                    width: "80%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleClickButton}
                    size="large"
                    sx={{
                        backgroundColor: "#FB8500",
                        ":hover": {
                            backgroundColor: "#FB8500",
                            transform: "scale(1.2)",
                        },
                    }}
                >
                    O que assistir?
                </Button>
            </Box>
            <LoginDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                setAuth={setUserToken}
            />
        </Box>
    );
}
