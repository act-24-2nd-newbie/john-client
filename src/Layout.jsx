import TopBar from "./components/TopBar.jsx";
import {Outlet} from "react-router-dom";

export default function Layout() {
    return <>
        <TopBar/>
        <Outlet/>
    </>;
}

