import TopBar from "./components/TopBar.jsx";
import {Outlet} from "react-router-dom";
import {useRecoilState} from "recoil";
import {loginState} from "./atoms.js";
import {useEffect} from "react";

export default function Layout() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

    useEffect(() => {
        sessionStorage.getItem("userName") && setIsLoggedIn(true);
    }, []);
    return <>
        <TopBar isLoggedIn={isLoggedIn}/>
        <Outlet/>
    </>;
}

