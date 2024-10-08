import {useRef, useState} from "react";
import styles from './TextField.module.css';

export default function TextField({width = '100%', showBorder = false, placeholder = 'Hint text'}) {
    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    function handleChangeValue(e) {
        setValue(e.target.value);
    }

    function handleClearClick() {
        setValue('');
        inputRef.current.focus();
    }

    function trimmedValue() {
        return value.trim();
    }

    return (<div className={`${styles['text-field']} ${showBorder ? styles['border'] : styles['no-border']}`}
                 style={{width: width}}>
        <div className={styles['input-wrapper']}>
            <input ref={inputRef} value={value} onChange={handleChangeValue} placeholder={placeholder}/>
            {
                trimmedValue() && !showBorder &&
                <div className={styles['clear-button-wrapper']}>
                    <div className={styles['clear-button']} onClick={handleClearClick}/>
                </div>
            }
        </div>
        <div className={styles['send-button-wrapper']}>
            <div className={`${styles['send-button']} ${!trimmedValue() && styles.disabled}`}/>
        </div>
    </div>);
}