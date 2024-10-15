import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import Layout from "../Layout.jsx";
import HomePage from "../pages/HomePage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";

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
            {
                path: '/signup',
                element: <SignUpPage/>,
            },
        ],
    },
]);

export default router;
