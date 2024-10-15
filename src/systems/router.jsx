import {createBrowserRouter, Navigate} from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import Layout from "../Layout.jsx";
import HomePage from "../pages/HomePage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

const ProtectedRoute = ({children}) => {
    return !sessionStorage.getItem("user") ? <Navigate to="/login" replace/> : children;
};

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/home" replace/>,
            },
            {
                path: '/home',
                element: (<ProtectedRoute> <HomePage/> </ProtectedRoute>),
            },
            {
                path: '/login',
                element: <LoginPage/>,
            },
            {
                path: '/signup',
                element: <SignUpPage/>,
            },
            {
                path: "*",
                element: <NotFoundPage/>
            }
        ],
    },
]);

export default router;
