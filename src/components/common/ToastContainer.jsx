import styles from './ToastContainer.module.css';
import {useToast} from "../../hooks/useToast.js";

export default function ToastContainer() {
    const {toasts, deleteToast} = useToast();

    return (
        <div className={styles['toast-container']}>
            {
                toasts.map((toast) => {
                    return <div className={styles['toast-wrapper']} key={toast.id}>
                        <div className={styles['toast-message-wrapper']}>{toast.message}</div>
                        <div className={styles['toast-close-button-wrapper']} onClick={() => {
                            deleteToast(toast.id)
                        }}/>
                    </div>;
                })
            }
        </div>
    )
}