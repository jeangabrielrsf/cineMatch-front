import {
    AppBar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LoginDialog from "../LoginDialog";
import SignupDialog from "../SignupDialog";
import UserTokenContext from "@/contexts/authContext";

export default function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { userToken, setUserToken } = useContext(UserTokenContext);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const pages = ["filmes", "séries"];
    const navigate = useNavigate();

    function handleMenu(event: ChangeEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }
    function handleClose() {
        setAnchorEl(null);
    }

    function handleOpenLoginDialog() {
        setOpenLoginDialog(true);
    }

    function handleOpenRegisterDialog() {
        setOpenRegisterDialog(true);
    }

    function handleLogout() {
        setUserToken("");
        handleClose();
    }

    return (
        <AppBar
            position="static"
            sx={{ padding: "10px", backgroundColor: "#3282B8" }}
        >
            <Toolbar disableGutters>
                <Typography
                    variant="h5"
                    component="div"
                    onClick={() => navigate("/")}
                >
                    CineMatch
                </Typography>

                <Box sx={{ display: "flex", flexGrow: 1 }}>
                    {pages.map((page) => (
                        <Button
                            variant="outlined"
                            key={page}
                            sx={{
                                marginLeft: "5px",
                                marginRight: "5px",
                                color: "white",
                                display: "block",
                            }}
                            onClick={() => {
                                if (page === "séries") {
                                    navigate("/series-populares");
                                } else {
                                    navigate("/filmes-populares");
                                }
                            }}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>
                <div>
                    <IconButton
                        size="large"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {userToken.length === 0
                            ? [
                                  <MenuItem
                                      onClick={handleOpenLoginDialog}
                                      key="login"
                                  >
                                      Login
                                  </MenuItem>,
                                  <MenuItem
                                      onClick={handleOpenRegisterDialog}
                                      key="register"
                                  >
                                      Cadastrar
                                  </MenuItem>,
                              ]
                            : [
                                  <MenuItem onClick={handleClose} key="profile">
                                      Perfil
                                  </MenuItem>,
                                  <MenuItem onClick={handleClose} key="likes">
                                      Minhas Curtidas
                                  </MenuItem>,
                                  <MenuItem onClick={handleLogout} key="logout">
                                      Logout
                                  </MenuItem>,
                              ]}
                    </Menu>
                    <LoginDialog
                        openDialog={openLoginDialog}
                        setOpenDialog={setOpenLoginDialog}
                        setAuth={setUserToken}
                    />
                    <SignupDialog
                        openDialog={openRegisterDialog}
                        setOpenDialog={setOpenRegisterDialog}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
}
