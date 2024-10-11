import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import styles from './TextField.module.css';

function TextField({
                       width = '100%',
                       value = '',
                       showBorder = false,
                       placeholder = 'Hint text',
                       onChange,
                       onSubmit,
                       onClickOutside
                   }, ref) {
    const [innerValue, setInnerValue] = useState(value);
    const inputRef = useRef(null);
    const textFieldRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(e) {
            if (textFieldRef.current && !textFieldRef.current.contains(e.target)) {
                onClickOutside?.();
            }
        }

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);

    useEffect(() => {
        setInnerValue(value);
    }, [value]);

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }))

    function handleChangeValue(e) {
        const text = e.target.value;
        setInnerValue(text);
        onChange?.(text);
    }

    function handleClearClick() {
        setInnerValue('');
        inputRef.current.focus();
    }

    function handleKeyDown(e) {
        (e.key === 'Enter') && handleSubmit();
    }

    function handleSubmit() {
        trimmedValue() && onSubmit?.(innerValue);
    }

    function trimmedValue() {
        return innerValue.trim();
    }

    return (<div ref={textFieldRef}
                 className={`${styles['text-field']} ${showBorder ? styles['border'] : styles['no-border']}`}
                 style={{width: width}}>
        <div className={styles['input-wrapper']}>
            <input ref={inputRef} value={innerValue} onChange={handleChangeValue} placeholder={placeholder}
                   onKeyDown={handleKeyDown}/>
            {
                trimmedValue() && !showBorder &&
                <div className={styles['clear-button-wrapper']}>
                    <div className={styles['clear-button']} onClick={handleClearClick}/>
                </div>
            }
        </div>
        <div className={styles['send-button-wrapper']} onClick={handleSubmit}>
            <div className={`${styles['send-button']} ${!trimmedValue() && styles.disabled}`}/>
        </div>
    </div>);
};

export default forwardRef(TextField);