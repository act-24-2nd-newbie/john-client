import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import styles from './TextField.module.css';
import commonUtil from "../../utils/commonUtil.js";
import Button from "./Button.jsx";
import {TEXT_FIELD_TYPE} from "../../contants/commonConstants.js";

function TextField({
                       value = '',
                       bordered = false,
                       showButton = true,
                       placeholder = 'Hint text',
                       maxLength = 255,
                       type = TEXT_FIELD_TYPE.TEXT,
                       valid = true,
                       message = '',
                       onChange,
                       onSubmit,
                       onClickOutside
                   }, ref) {
    const [innerValue, setInnerValue] = useState(value);
    const [isValid, setIsValid] = useState(true);
    const [currentMsg, setCurrentMsg] = useState('');
    const inputRef = useRef(null);
    const textFieldRef = useRef(null);

    const trimmedValue = innerValue.trim();

    useEffect(() => {
        return commonUtil.registerOutsideClickHandler(textFieldRef, onClickOutside);
    }, [onClickOutside]);

    useEffect(() => {
        setInnerValue(value);
    }, [value]);

    useEffect(() => {
        setCurrentMsg(message);
    }, [message]);

    useEffect(() => {
        setIsValid(valid);
    }, [valid]);

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }))

    function validate() {
        let regex;
        if (type === TEXT_FIELD_TYPE.TEXT) {
            regex = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9\s.?@,!'"]+$/;
        } else if (type === TEXT_FIELD_TYPE.EMAIL) {
            regex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
        }

        if (!regex.test(innerValue)) {
            setCurrentMsg('Invalid ' + type + ' format');
            setIsValid(false);
            return false;
        }

        setIsValid(true);
        return true;
    }

    function handleChangeValue(e) {
        const text = e.target.value;
        setIsValid(true);
        setCurrentMsg('');
        setInnerValue(text);
        onChange?.(text);
    }

    function handleClearClick() {
        setIsValid(true);
        setCurrentMsg('');
        setInnerValue('');
        inputRef.current.focus();
        onChange?.('');
    }

    function handleKeyDown(e) {
        (e.key === 'Enter') && handleSubmit();
    }

    function handleSubmit() {
        validate() && onSubmit?.(innerValue);
    }

    return (<div ref={textFieldRef} className={`${styles['text-field']}`}>
        <div
            className={`${styles['input-area']} ${bordered ? styles['border'] : styles['no-border']} ${(!isValid) && styles['invalid']}`}>
            <div className={styles['input-wrapper']}>
                <input
                    ref={inputRef}
                    value={innerValue}
                    maxLength={maxLength}
                    onChange={handleChangeValue}
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                />
                {
                    trimmedValue && !bordered &&
                    <div className={styles['clear-button-wrapper']}>
                        <div className={styles['clear-button']} onClick={handleClearClick}/>
                    </div>
                }
            </div>
            {
                showButton &&
                <div className={styles['send-button-wrapper']}>
                    {
                        type === 'text' ? <div
                            className={`${styles['send-button']} ${!(isValid && trimmedValue) && styles.disabled}`}
                            onClick={handleSubmit}/> : (
                            !(isValid && currentMsg)
                                ? (<Button disabled={!isValid} bordered small onClick={handleSubmit}>Check</Button>)
                                : <div className={styles['checked-icon-wrapper']}/>
                        )
                    }
                </div>
            }
        </div>
        {currentMsg && <div className={`${styles['message-wrapper']} ${isValid && styles['valid']}`}>{currentMsg}</div>}
    </div>);
}

export default forwardRef(TextField);