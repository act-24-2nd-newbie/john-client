import styles from './Button.module.css';

export default function Button({bordered, primary = false, disabled, onClick, small, done = false, children}) {

    function handleClick() {
        !disabled && onClick?.();
    }

    return (<>
            {
                !done ? (<div
                    className={`${styles['button']} ${bordered && styles['bordered']} ${primary && styles['primary']} ${disabled && styles['disabled']} ${small && styles['small']}`}
                    onClick={handleClick}>
                    {children}
                </div>) : (<div
                        className={`${styles['button']} ${bordered && styles['bordered']} ${styles['done']}`}/>
                )
            }
        </>
    )
}