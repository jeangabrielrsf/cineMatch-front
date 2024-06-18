import {
    AppBar,
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import {
    ChangeEvent,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LoginDialog from "../LoginDialog";
import SignupDialog from "../SignupDialog";
import UserTokenContext from "@/contexts/authContext";
import MoviesContext from "@/contexts/movieContext";
import { searchAContent } from "@/services/moviesApi";

export default function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { userToken, setUserToken } = useContext(UserTokenContext);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [options, setOptions] = useState([]);
    const pages = ["filmes populares", "séries populares"];
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

    const debounce = (func: Function, delay: number) => {
        let debounceTimer: NodeJS.Timeout;
        return function (...args: any) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const fetchSearchResults = useCallback(async (query: string) => {
        if (query.length < 2) {
            setOptions([]);
            setLoadingSearch(false);
            return;
        }

        setLoadingSearch(true);
        try {
            const data = await searchAContent(query);
            console.log(data);
            setOptions(data.results);
        } catch (error) {
            console.error(error);
            setOptions([]);
        }
        setLoadingSearch(false);
    }, []);

    const debouncedFetchSearchResults = useCallback(
        debounce(fetchSearchResults, 300),
        []
    );

    useEffect(() => {
        if (searchText) {
            debouncedFetchSearchResults(searchText);
        }
    }, [searchText, debouncedFetchSearchResults]);

    return (
        <AppBar
            position="static"
            sx={{ padding: "10px", backgroundColor: "#FB8500" }}
        >
            <Toolbar
                disableGutters
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Stack direction="row" flexGrow={0}>
                    <Typography
                        variant="h3"
                        onClick={() => navigate("/")}
                        textAlign="center"
                    >
                        CineMatch
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                variant="outlined"
                                size="large"
                                key={page}
                                sx={{
                                    marginLeft: "5px",
                                    marginRight: "5px",
                                    display: "block",
                                    color: "#fff",
                                    backgroundColor: "#023047",
                                    ":hover": {
                                        backgroundColor: "#023047",
                                        transform: "scale(1.05)",
                                    },
                                }}
                                onClick={() => {
                                    if (page === "séries populares") {
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
                </Stack>

                <Autocomplete
                    sx={{ width: "300px" }}
                    options={options}
                    open={openSearch}
                    loading={loadingSearch}
                    isOptionEqualToValue={(option, value) =>
                        option.title === value.title
                    }
                    getOptionLabel={(option) => option.title}
                    onInputChange={(event, value) => {
                        setSearchText(value);
                        setOpenSearch(true);
                    }}
                    onClose={() => setOpenSearch(false)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Procure um conteúdo..."
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loadingSearch ? (
                                            <CircularProgress
                                                color="inherit"
                                                size={20}
                                            />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
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
                        setAnchorEl={setAnchorEl}
                    />
                    <SignupDialog
                        openDialog={openRegisterDialog}
                        setOpenDialog={setOpenRegisterDialog}
                        setAnchorEl={setAnchorEl}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
}
