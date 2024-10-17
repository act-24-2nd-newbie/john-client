import styles from "./SignUpPage.module.css"
import TextField from "../components/common/TextField.jsx";
import Button from "../components/common/Button.jsx";
import {useState} from "react";
import memberService from "../services/memberService.js";
import {useNavigate} from "react-router-dom";
import {useToast} from "../hooks/useToast.js";
import {MEMBER_MESSAGE, TEXT_FIELD_TYPE} from "../contants/commonConstants.js";

export default function SignUpPage() {
    const navigate = useNavigate();
    const {addToast} = useToast();
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [emailMessage, setEmailMessage] = useState('');
    const [userName, setUserName] = useState('');


    function handleEmailChange(text) {
        setEmail(text);
        setEmailValid(true);
        setEmailMessage('');
    }

    async function handleEmailCheck(email) {
        const emailExists = await memberService.checkEmailExists(email);
        if (emailExists) {
            setEmailValid(false);
            setEmailMessage('This email already exists.');
        } else {
            setEmailValid(true);
            setEmailMessage('This email is available.');
        }
    }

    function handleUserNameChange(text) {
        setUserName(text);
    }

    const canSignUp = (userName.length && emailValid);

    async function handleSignUpClick() {
        if (canSignUp) {
            await memberService.signUp(email, userName);
            navigate("/login");
            addToast(MEMBER_MESSAGE.CREATED);
        }
    }

    function handleResetClick() {
        handleEmailChange('');
        handleUserNameChange('');
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
                        <TextField
                            placeholder={'E-mail'}
                            value={email}
                            type={TEXT_FIELD_TYPE.EMAIL}
                            valid={emailValid}
                            message={emailMessage}
                            onChange={handleEmailChange}
                            onSubmit={handleEmailCheck}/>
                    </div>
                    <div className={styles['input-wrapper']}>
                        <div className={styles['label']}>User Name</div>
                        <TextField
                            placeholder={'User Name'}
                            showButton={false}
                            value={userName}
                            onChange={handleUserNameChange}
                            onSubmit={handleSignUpClick}
                        />
                    </div>
                </div>
                <div className={styles['sign-up-page__button-container']}>
                    <Button bordered onClick={handleResetClick}>Reset</Button>
                    <Button primary disabled={!canSignUp}
                            onClick={handleSignUpClick}>Confirm</Button>
                </div>
            </div>
        </div>
    )
}
