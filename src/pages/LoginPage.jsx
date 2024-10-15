import TextField from "../components/common/TextField.jsx";
import styles from "./LoginPage.module.css"
import {useNavigate} from "react-router-dom";
import memberService from "../services/memberService.js";
import {useToast} from "../hooks/useToast.js";
import {MEMBER_MESSAGE} from "../contants/commonConstants.js";
import {useEffect} from "react";

export default function LoginPage() {
    const navigate = useNavigate();
    const {addToast} = useToast();

    useEffect(() => {
        sessionStorage.getItem("user") && navigate('/home');
    }, [])

    async function handleLogin(email) {
        try {
            const member = await memberService.getMember(email);
            sessionStorage.setItem('user', JSON.stringify(member));
            navigate('/home');
        } catch (e) {
            addToast(MEMBER_MESSAGE.NOT_REGISTRATION);
        }
    }

    return (
        <div className={styles['login-page']}>
            <div className={styles['welcome-message-wrapper']}>
                {'Welcome Newbie!!\nMyTodo makes it easy to stay organized and manage your life.'}
            </div>
            <div className={styles['title-wrapper']}>
                {'What is your email?'}
            </div>
            <div className={styles['text-field-wrapper']}>
                <TextField placeholder={'Input your email'} onSubmit={handleLogin}/>
            </div>
        </div>
    )
}
