import { useState } from "react";
import "@/reset.css";
import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes";
import PopularMovies from "./pages/PopularMovies";
import router from "./routes";

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
