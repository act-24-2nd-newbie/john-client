import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import styles from './TextField.module.css';
import commonUtil from "../../utils/commonUtil.js";

function TextField({
                       width = '100%',
                       value = '',
                       showBorder = false,
                       placeholder = 'Hint text',
                       maxLength = 255,
                       type = 'text',
                       errorMessage = 'error message',
                       onChange,
                       onSubmit,
                       onClickOutside
                   }, ref) {
    const [innerValue, setInnerValue] = useState(value);
    const [isValid, setIsValid] = useState(true);
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
        if (type === 'text') {
            regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9\s]+$/;
        } else if (type === 'email') {
            regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        }
        setIsValid(regex.test(innerValue));
    }

    function handleChangeValue(e) {
        const text = e.target.value;
        setIsValid(true);
        setInnerValue(text);
        onChange?.(text);
    }

    function handleClearClick() {
        setIsValid(true);
        setInnerValue('');
        inputRef.current.focus();
    }

    function handleKeyDown(e) {
        (e.key === 'Enter') && handleSubmit();
    }

    function handleSubmit() {
        if (trimmedValue()) {
            validate();
            isValid && onSubmit();
        }
    }

    function trimmedValue() {
        return innerValue.trim();
    }

    return (<div ref={textFieldRef} className={`${styles['text-field']}`} style={{width: width}}>
        <div
            className={`${styles['input-area']} ${showBorder ? styles['border'] : styles['no-border']} ${!isValid && styles['invalid']}`}>
            <div className={styles['input-wrapper']}>
                <input ref={inputRef} value={innerValue} maxLength={maxLength} onChange={handleChangeValue}
                       placeholder={placeholder}
                       onKeyDown={handleKeyDown}/>
                {
                    trimmedValue() && !showBorder &&
                    <div className={styles['clear-button-wrapper']}>
                        <div className={styles['clear-button']} onClick={handleClearClick}/>
                    </div>
                }
            </div>
            <div className={styles['send-button-wrapper']} onClick={handleSubmit}>
                <div className={`${styles['send-button']} ${!(isValid && trimmedValue()) && styles.disabled}`}/>
            </div>
        </div>
        {!isValid && <div className={styles['error-message-wrapper']}>{errorMessage}</div>}
    </div>);
};

export default forwardRef(TextField);