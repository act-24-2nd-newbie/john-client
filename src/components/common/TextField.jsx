import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import styles from './TextField.module.css';
import commonUtil from "../../utils/commonUtil.js";
import Button from "./Button.jsx";

export const TEXT_FIELD_TYPE = {
    TEXT: 'text',
    EMAIL: 'email',
}

function TextField({
                       width = '100%',
                       value = '',
                       bordered = false,
                       showButton = true,
                       placeholder = 'Hint text',
                       maxLength = 255,
                       type = TEXT_FIELD_TYPE.TEXT,
                       customStatus = {valid: true, show: false, message: '', done: false},
                       valid = true,
                       onChange,
                       onSubmit,
                       onClickOutside
                   }, ref) {
    const [innerValue, setInnerValue] = useState(value);
    const [isValid, setIsValid] = useState(valid);
    const [errorMessage, setErrorMessage] = useState('');
    const inputRef = useRef(null);
    const textFieldRef = useRef(null);

    useEffect(() => {
        return commonUtil.registerOutsideClickHandler(textFieldRef, onClickOutside);
    }, []);

    useEffect(() => {
        setInnerValue(value);
    }, [value]);

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }))

    function validate() {
        let regex;
        if (type === TEXT_FIELD_TYPE.TEXT) {
            regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9\s]+$/;
        } else if (type === TEXT_FIELD_TYPE.EMAIL) {
            regex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
        }

        if (!regex.test(innerValue)) {
            setErrorMessage('invalid format');
            setIsValid(false);
            return false;
        }

        setIsValid(true);
        return true;
    }

    function handleChangeValue(e) {
        const text = e.target.value;
        setIsValid(true);
        setErrorMessage('');
        setInnerValue(text);
        onChange?.(text);
    }

    function handleClearClick() {
        setIsValid(true);
        setErrorMessage('');
        setInnerValue('');
        inputRef.current.focus();
        onChange?.('');
    }

    function handleKeyDown(e) {
        (e.key === 'Enter') && handleSubmit();
    }

    function handleSubmit() {
        if (trimmedValue()) {
            const valid = validate();
            valid && !customStatus?.done && onSubmit(innerValue, valid);
        }
    }

    function trimmedValue() {
        return innerValue.trim();
    }

    return (<div ref={textFieldRef} className={`${styles['text-field']}`} style={{width: width}}>
        <div
            className={`${styles['input-area']} ${bordered ? styles['border'] : styles['no-border']} ${(!isValid || !customStatus?.valid) && styles['invalid']}`}>
            <div className={styles['input-wrapper']}>
                <input ref={inputRef} value={innerValue} maxLength={maxLength} onChange={handleChangeValue}
                       placeholder={placeholder}
                       onKeyDown={handleKeyDown}/>
                {
                    trimmedValue() && !bordered &&
                    <div className={styles['clear-button-wrapper']}>
                        <div className={styles['clear-button']} onClick={handleClearClick}/>
                    </div>
                }
            </div>
            {
                showButton &&
                <div className={styles['send-button-wrapper']} onClick={handleSubmit}>
                    {
                        type === 'text' ?
                            <div
                                className={`${styles['send-button']} ${!(isValid && trimmedValue()) && styles.disabled}`}/>
                            : (<Button disabled={!isValid} bordered small done={!!customStatus?.done}>Check</Button>)
                    }
                </div>

            }
        </div>
        {!isValid && <div className={styles['error-message-wrapper']}>{errorMessage}</div>}
        {(customStatus?.show && customStatus?.message) &&
            <div
                className={`${styles['custom-message-wrapper']} ${customStatus?.valid && styles['valid']}`}>{customStatus.message}</div>}
    </div>);
}

export default forwardRef(TextField);