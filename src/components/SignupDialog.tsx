import { register } from "@/services/auth";
import { UserRegisterData } from "@/utils/formUtils";
import {
    Alert,
    Backdrop,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";

export default function SignupDialog({ openDialog, setOpenDialog }) {
    const [loading, setLoading] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackStatus, setSnackStatus] = useState("");

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    function handleOpenLoading() {
        setLoading(true);
    }

    function handleCloseLoading() {
        setLoading(false);
    }

    function handleSnackBarOpen(status: string) {
        setSnackStatus(status);
        setOpenSnack(true);
    }

    function handleSnackBarClose() {
        setOpenSnack(false);
    }

    async function handleRegisterSubmit(event: FormEvent<HTMLFormElement>) {
        handleOpenLoading();
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const data: UserRegisterData = {
            username: formJson.username,
            email: formJson.email,
            password: formJson.password,
        };
        try {
            const response = await register(data);
            handleSnackBarOpen("success");
        } catch (error) {
            console.error(error);
            handleSnackBarOpen("error");
        }
        handleCloseLoading();
        handleCloseDialog();
    }

    return (
        <>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={{
                    component: "form",
                    onSubmit: (event: FormEvent<HTMLFormElement>) => {
                        handleRegisterSubmit(event);
                    },
                }}
            >
                <DialogTitle>Cadastra-se</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, entre com as informações abaixo para se
                        cadastrar.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        id="username"
                        name="username"
                        label="Nome de usuário"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        id="password"
                        name="password"
                        label="Senha"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button type="submit">Cadastrar</Button>
                </DialogActions>
            </Dialog>
            <Backdrop open={loading}>
                <CircularProgress />
            </Backdrop>
            <Snackbar
                open={openSnack}
                autoHideDuration={5000}
                onClose={handleSnackBarClose}
            >
                {snackStatus === "success" ? (
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        Cadastro efetuado com sucesso!
                    </Alert>
                ) : (
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        Erro ao cadastrar!
                    </Alert>
                )}
            </Snackbar>
        </>
    );
}
