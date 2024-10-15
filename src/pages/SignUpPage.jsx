import styles from "./SignUpPage.module.css"
import TextField, {TEXT_FIELD_TYPE} from "../components/common/TextField.jsx";
import Button from "../components/common/Button.jsx";
import {useState} from "react";
import memberService from "../services/memberService.js";
import {useNavigate} from "react-router-dom";
import {useToast} from "../hooks/useToast.js";
import {MEMBER_MESSAGE} from "../contants/commonConstants.js";

export default function SignUpPage() {
    const navigate = useNavigate();
    const {addToast} = useToast();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({valid: true, show: false, message: '', done: false});
    const [emailValid, setEmailValid] = useState(false);
    const [userName, setUserName] = useState('');


    function handleEmailChange(text) {
        setEmail(text);
        setStatus({valid: true, show: false, message: '', done: false});
        setEmailValid(false);
    }

    async function handleEmailCheck() {
        const emailExists = await memberService.checkEmailExists(email);
        if (emailExists) {
            setStatus({valid: false, show: true, message: 'This email already exists.', done: false});
        } else {
            setStatus({valid: true, show: true, message: 'This email is available.', done: true});
        }
        setEmailValid(!emailExists);
    }

    function handleUserNameChange(text) {
        setUserName(text);
    }

    async function handleSignUpClick() {
        await memberService.signUp(email, userName);
        navigate("/login");
        addToast(MEMBER_MESSAGE.CREATED);
    }

    return (
        <div className={styles['sign-up-page']}>
            <div className={styles['sign-up-wrapper']}>
                <div className={styles['sign-up-page__title']}>
                    {'Sign Up'}
                </div>
                <div className={styles['sign-up-page__input-area']}>
                    <div className={styles['input-wrapper']}>
                        <div className={styles['label']}>E-mail</div>
                        <TextField placeholder={'E-mail'}
                                   value={email}
                                   type={TEXT_FIELD_TYPE.EMAIL}
                                   customStatus={status}
                                   onChange={handleEmailChange}
                                   onSubmit={handleEmailCheck}/>
                    </div>
                    <div className={styles['input-wrapper']}>
                        <div className={styles['label']}>User Name</div>
                        <TextField showButton={false} placeholder={'User Name'}
                                   value={userName}
                                   onChange={handleUserNameChange}/>
                    </div>
                </div>
                <div className={styles['sign-up-page__button-container']}>
                    <Button bordered onClick={() => {
                    }}>Cancel</Button>
                    <Button primary disabled={!(userName.length && emailValid)}
                            onClick={handleSignUpClick}>Confirm</Button>
                </div>
            </div>
        </div>
    )
}
