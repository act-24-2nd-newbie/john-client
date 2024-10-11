import styles from './TaskItem.module.css'
import dateUtil from "../utils/dateUtil.js";

export default function TaskItem({
                                     task,
                                     onClickContents,
                                     onClickCheckbox
                                 }) {
    function formattedDate() {
        const createdDateString = `Created: ${dateUtil.getFormattedDate(task.createdDate, 'MM/DD HH:mm')}`;
        const modifiedDateString = task.createdDate === task.modifiedDate ? '' : ` (Modified: ${dateUtil.getFormattedDate(task.modifiedDate, 'MM/DD HH:mm')})`;
        return createdDateString + modifiedDateString;
    }

    function handleContentsClick(e) {
        !task.isDone && onClickContents?.(e, task.id);
    }

    function handleCheckboxClick(e) {
        onClickCheckbox?.(e, task.id);
    }

    return (
        <div className={styles['task-item']}>
            <div className={styles['checkbox-wrapper']}>
                <input type='checkbox' checked={task.isDone} id={`checkbox-${task.id}`} onChange={handleCheckboxClick}/>
                <label htmlFor={`checkbox-${task.id}`}/>
            </div>
            <div className={styles['task-item-content-wrapper']} onClick={handleContentsClick}>
                <div className={`${styles['task-item-content']} ${task.isDone && styles['done']}`}>{task.contents}</div>
                <div className={styles['task-item-date-wrapper']}>{formattedDate()}</div>
            </div>
            <div className={styles['delete-icon-wrapper']}/>
        </div>
    )
}