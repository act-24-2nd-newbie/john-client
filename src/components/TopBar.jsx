import styles from './TopBar.module.css';
import {useMatch, useNavigate} from "react-router-dom";
import dateUtil from "../utils/dateUtil.js";
import {useRecoilState} from "recoil";
import {loginState} from "../atoms.js";

export default function TopBar() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const navigate = useNavigate();
    const isSignUpPage = useMatch("/signup");

    function handleClickLeftArea() {
        navigate("/");
    }

    function handleClickRightAreaButton() {
        if (isLoggedIn) {
            setIsLoggedIn(false);
            sessionStorage.removeItem('user');
            navigate("/login")
        } else {
            navigate("/signup");
        }
    }

    return (
        <div className={styles['top-bar']}>
            <div className={styles['left-area']} onClick={handleClickLeftArea}>
                <div className={styles['todo-icon']}/>
                <div className={styles['title-wrapper']}> {'My Todo'}</div>
            </div>
            <div className={styles['right-area']}>
                <div className={styles['date-wrapper']}>{dateUtil.getTodayWithFormattedDate("MM/DD (ddd)")}</div>
                {!isSignUpPage && <div className={styles['button-wrapper']}
                                       onClick={handleClickRightAreaButton}>{isLoggedIn ? 'Logout' : 'Sign up'}</div>}
            </div>
        </div>
    );
}