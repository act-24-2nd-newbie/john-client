import styles from './TopBar.module.css';
import {useNavigate} from "react-router-dom";
import dateUtil from "../utils/dateUtil.js";

export default function TopBar({isLoggedIn = false}) {
    const navigate = useNavigate();

    function handleClickLeftArea() {
        navigate("/");
    }

    return (
        <div className={styles['top-bar']}>
            <div className={styles['left-area']} onClick={handleClickLeftArea}>
                <div className={styles['todo-icon']}/>
                <div className={styles['title-wrapper']}> {'My Todo'}</div>
            </div>
            <div className={styles['right-area']}>
                <div className={styles['date-wrapper']}>{dateUtil.getTodayWithFormattedDate("MM/DD (ddd)")}</div>
                <div className={styles['button-wrapper']}>{isLoggedIn ? 'Logout' : 'Sign up'}</div>
            </div>
        </div>
    );
}