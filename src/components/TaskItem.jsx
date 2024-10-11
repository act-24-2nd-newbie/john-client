import styles from './TaskItem.module.css'
import dateUtil from "../utils/dateUtil.js";

export default function TaskItem({task = {id: '', contents: '', createdDate: '', modifiedDate: '',}, onClickContents}) {
    function formattedDate() {
        const createdDateString = `Created: ${dateUtil.getFormattedDate(task.createdDate, 'MM/DD HH:mm')}`;
        const modifiedDateString = task.createdDate === task.modifiedDate ? '' : ` (Modified: ${dateUtil.getFormattedDate(task.modifiedDate, 'MM/DD HH:mm')})`;
        return createdDateString + modifiedDateString;
    }

    function handleContentsClick() {
        onClickContents?.(task.id);
    }

    return (
        <div className={styles['task-item']}>
            <div className={styles['checkbox-wrapper']}>
                <input type='checkbox' id={`checkbox-${task.id}`}/>
                <label htmlFor={`checkbox-${task.id}`}/>
            </div>
            <div className={styles['task-item']} onClick={handleContentsClick}>
                <div className={styles['task-item-content']}>{task.contents}</div>
                <div className={styles['task-item-date-wrapper']}>{formattedDate()}</div>
            </div>
            <div className={styles['delete-icon-wrapper']}/>
        </div>
    )
}