import { useState } from "react";
import "@/reset.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";

import router from "./routes";
import UserTokenContext from "./contexts/authContext";
import MoviesContext from "./contexts/movieContext";

function App() {
    const [userToken, setUserToken] = useState("");
    const [popularMovies, setPopularMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    return (
        <UserTokenContext.Provider value={{ userToken, setUserToken }}>
            <MoviesContext.Provider
                value={{
                    popularMovies,
                    setPopularMovies,
                    allMovies,
                    setAllMovies,
                }}
            >
                <RouterProvider router={router} />
            </MoviesContext.Provider>
        </UserTokenContext.Provider>
    );
}

export default App;
