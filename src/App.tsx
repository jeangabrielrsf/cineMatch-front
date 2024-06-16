import { useState } from "react";
import "@/reset.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";

import router from "./routes";
import UserTokenContext from "./contexts/authContext";

function App() {
    const [userToken, setUserToken] = useState("");
    return (
        <UserTokenContext.Provider value={{ userToken, setUserToken }}>
            <RouterProvider router={router} />
        </UserTokenContext.Provider>
    );
}

export default App;
