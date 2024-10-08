import styles from "./HomePage.module.css"
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import TextField from "../components/TextField.jsx";

export default function HomePage() {
    const navigate = useNavigate();
    const userName = sessionStorage.getItem("userName");

    useEffect(() => {
        !userName && navigate('/login');
    }, [])

    function handleSubmit() {

    }

    return (
        <div className={styles['home-page']}>
            <div className={styles['top-area']}>
                <div className={styles['text-wrapper']}>Good afternoon, Lily.</div>
                <div>
                    <div className={styles['text-wrapper']}>{`You've got`}</div>
                    <div className={styles['number-wrapper']}>2 / 2</div>
                    <div className={styles['text-wrapper']}>tasks Today</div>
                </div>
                <div className={styles['text-field-wrapper']}>
                    <TextField placeholder={'Enter your task'} onSubmit={handleSubmit}/>
                </div>
            </div>
            <div className={styles['todo-list-wrapper']}>
                <div>oldest랑 clearAll</div>
                <div className={styles['empty-wrapper']}>
                    <div className={styles['empty-image-wrapper']}/>
                    <div className={styles['empty-text-wrapper']}>There is no task registered.</div>
                </div>
            </div>
        </div>
    )
}
