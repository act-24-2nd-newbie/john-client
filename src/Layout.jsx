import TopBar from "./components/TopBar.jsx";
import {Outlet} from "react-router-dom";
import ToastContainer from "./components/common/ToastContainer.jsx";

export default function Layout() {
    return <>
        <TopBar/>
        <Outlet/>
        <ToastContainer/>
    </>;
}

