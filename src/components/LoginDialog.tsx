import { login } from "@/services/auth";
import { UserLoginData } from "@/utils/formUtils";
import {
    Backdrop,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";

export default function LoginDialog({ openDialog, setOpenDialog, setAuth }) {
    const [loading, setLoading] = useState(false);

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    function handleOpenLoading() {
        setLoading(true);
    }

    function handleCloseLoading() {
        setLoading(false);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        handleOpenLoading();
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const data: UserLoginData = {
            username: formJson.email,
            password: formJson.password,
        };
        try {
            const response = await login(data);
            console.log(response);
            setAuth(response.data.access_token);
        } catch (error) {
            console.error(error);
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
                        handleSubmit(event);
                    },
                }}
            >
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, entra com as informações abaixo para entrar.
                    </DialogContentText>
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
                    <Button type="submit">Entrar</Button>
                </DialogActions>
            </Dialog>
            <Backdrop open={loading}>
                <CircularProgress />
            </Backdrop>
        </>
    );
}
