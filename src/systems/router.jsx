import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import Layout from "../Layout.jsx";
import HomePage from "../pages/HomePage.jsx";

const router = createBrowserRouter([
    {
        path: '',
        element: <Layout/>,
        children: [
            {
                path: '',
                element: <HomePage/>,
            },
            {
                path: '/home',
                element: <HomePage/>,
            },
            {
                path: '/login',
                element: <LoginPage/>,
            },

        ],
    },
]);

export default router;
