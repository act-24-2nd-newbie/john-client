import TextField from "../components/common/TextField.jsx";
import styles from "./LoginPage.module.css"
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {loginState} from "../atoms.js";

export default function LoginPage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

    function handleSubmit(value) {
        sessionStorage.setItem('userName', value);
        setIsLoggedIn(true);
        navigate('/home');
    }

    return (
        <div className={styles['login-page']}>
            <div className={styles['welcome-message-wrapper']}>
                {'Welcome Newbie!!\nMyTodo makes it easy to stay organized and manage your life.'}
            </div>
            <div className={styles['title-wrapper']}>
                {'What is your name?'}
            </div>
            <div className={styles['text-field-wrapper']}>
                <TextField placeholder={'Input your name'} onSubmit={handleSubmit}/>
            </div>
        </div>
    )
}
