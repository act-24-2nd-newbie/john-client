import styles from "./HomePage.module.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import TextField from "../components/common/TextField.jsx";
import taskService from "../services/taskService.js";
import TaskItem from "../components/TaskItem.jsx";
import Button from "../components/common/Button.jsx";
import Dropdown from "../components/common/Dropdown.jsx";
import {SORT_KEY, SORT_OPTIONS, TASK_MESSAGE} from "../contants/commonConstants.js";
import dateUtil from "../utils/dateUtil.js";
import {useToast} from "../hooks/useToast.js";

export default function HomePage() {
    const [tasks, setTasks] = useState([]);
    const [contents, setContents] = useState('');
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [selectedOptionKey, setSelectedOptionKey] = useState(SORT_KEY.OLDEST);
    const navigate = useNavigate();
    const {userName = '', id: userId} = JSON.parse(sessionStorage.getItem("user")) ?? {};
    const inputRef = useRef(null);
    const {addToast} = useToast();

    useEffect(() => {
        if (!userName) {
            navigate('/login');
        } else {
            (async () => {
                await getTasks();
            })();
        }
    }, [])

    useEffect(() => {
        inputRef?.current?.focus();
    }, [selectedTaskId]);

    const sortedTasks = tasks.toSorted(({createdDate: a}, {createdDate: b}) => ((new Date(b) - new Date(a)) * (SORT_KEY.OLDEST === selectedOptionKey ? 1 : -1)));

    async function getTasks() {
        const tasks = await taskService.getTasks(userId);
        setTasks(tasks);
    }

    async function updateTask(taskId, task) {
        await taskService.updateTask(taskId, task);
        setSelectedTaskId(null);
        await getTasks();
    }

    function handleSortOrderSelect(key) {
        setSelectedOptionKey(key);
    }

    function handleChangeTodo(text) {
        setContents(text);
    }

    async function handleSubmit() {
        await taskService.createTask({memberId: userId, contents});
        addToast(TASK_MESSAGE.CREATED);
        setContents('');
        await getTasks();
    }

    function handleContentsClick(e, taskId) {
        e.stopPropagation();
        setSelectedTaskId(taskId);
    }

    function handleOutsideClick() {
        setSelectedTaskId(null);
    }

    async function handleTasksChange(taskId, contents) {
        const task = tasks.find(task => task.id === taskId);
        if (task.contents === contents) {
            inputRef?.current?.focus();
        } else {
            await updateTask(taskId, {contents, isDone: task.isDone});
            addToast(TASK_MESSAGE.UPDATED);
        }
    }

    async function handleCheckboxClick(taskId) {
        const task = tasks.find(task => task.id === taskId);
        await updateTask(taskId, {contents: task.contents, isDone: !task.isDone});
        !task.isDone && addToast(TASK_MESSAGE.DONE);
    }

    async function handleDeleteIconClick(taskId) {
        await taskService.deleteTask(taskId);
        addToast(TASK_MESSAGE.DELETED);
        await getTasks();
    }

    async function handleDeleteAllClick() {
        await taskService.deleteAllTasks();
        addToast(TASK_MESSAGE.DELETE_ALL);
        await getTasks();
    }


    return (
        <div className={styles['home-page']}>
            <div className={styles['top-area']}>
                <div className={styles['text-wrapper']}>{`Good ${dateUtil.getTimeOfDay()}, ${userName}`}</div>
                <div>
                    <div className={styles['text-wrapper']}>{`You've got`}</div>
                    <div className={styles['number-wrapper']}>
                        {`${tasks.filter(({isDone}) => (!isDone)).length} / ${tasks.length}`}
                    </div>
                    <div className={styles['text-wrapper']}>tasks Today</div>
                </div>
                <div className={styles['text-field-wrapper']}>
                    <TextField value={contents} placeholder={'Enter your task'} onChange={handleChangeTodo}
                               onSubmit={handleSubmit}/>
                </div>
            </div>
            <div className={styles['todo-list-wrapper']}>
                <div className={styles['top-area']}>
                    <div className={styles['drop-down-wrapper']}>
                        <Dropdown options={SORT_OPTIONS} selectedOptionKey={selectedOptionKey}
                                  onSelect={handleSortOrderSelect}/>
                    </div>
                    <div className={styles['clear-all-button-wrapper']}>
                        <Button disabled={!tasks.length} onClick={handleDeleteAllClick}>Clear All</Button>
                    </div>
                </div>
                {tasks.length ? <div className={styles['todo-container']}>
                        {sortedTasks.map(todo => {
                            return selectedTaskId === todo.id ?
                                <TextField ref={inputRef} key={todo.id} value={todo.contents} bordered
                                           onClickOutside={handleOutsideClick}
                                           onSubmit={async (contents) => {
                                               await handleTasksChange(todo.id, contents)
                                           }}
                                /> :
                                <TaskItem key={todo.id} task={todo}
                                          onClickContents={handleContentsClick}
                                          onClickCheckbox={handleCheckboxClick}
                                          onClickDeleteIcon={handleDeleteIconClick}
                                />
                        })}
                    </div> :
                    <div className={styles['empty-wrapper']}>
                        <div className={styles['empty-image-wrapper']}/>
                        <div className={styles['empty-text-wrapper']}>There is no task registered.</div>
                    </div>
                }
            </div>
        </div>
    )
}
