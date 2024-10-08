import TextField from "../components/TextField.jsx";
import styles from "./Home.module.css"

export default function Home() {
    return (
        <div className={styles['home']}>
            <div className={styles['welcome-message-wrapper']}>
                {'Welcome Newbie!!\nMyTodo makes it easy to stay organized and manage your life.'}
            </div>
            <div className={styles['title-wrapper']}>
                {'What is your name?'}
            </div>
            <div className={styles['text-field-wrapper']}>
                <TextField placeholder={'Input your name'}/>
            </div>
        </div>
    )
}
