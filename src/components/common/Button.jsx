import styles from './Button.module.css';

export default function Button({bordered, disabled, onClick, children}) {

    function handleClick() {
        !disabled && onClick?.();
    }

    return (
        <div className={`${styles['button']} ${bordered && styles['bordered']} ${disabled && styles['disabled']}`}
             onClick={handleClick}>
            {children}
        </div>)
}