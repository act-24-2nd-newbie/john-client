import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./Layout.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '',
                element: <Home/>,
            }
        ],
    },
]);

export default router;
