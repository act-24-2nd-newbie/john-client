import styles from "./HomePage.module.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import TextField from "../components/common/TextField.jsx";
import taskService from "../services/taskService.js";
import TaskItem from "../components/TaskItem.jsx";
import Button from "../components/common/Button.jsx";

export default function HomePage() {
    const navigate = useNavigate();
    const userName = sessionStorage.getItem("userName");
    const [tasks, setTasks] = useState([]);
    const [contents, setContents] = useState('');
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        !userName && navigate('/login');
        (async () => {
            await getTasks();
        })();
    }, [])

    useEffect(() => {
        inputRef?.current?.focus();
    }, [selectedTaskId]);

    async function getTasks() {
        const todos = await taskService.getTasks();
        setTasks(todos.sort((a, b) => ((new Date(b) - new Date(a)) * -1)));
    }

    async function updateTask(taskId, task) {
        await taskService.updateTask(taskId, task);
        setSelectedTaskId(null);
        await getTasks();
    }

    function handleChangeTodo(text) {
        setContents(text);
    }

    async function handleSubmit() {
        await taskService.createTask({contents});
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

    async function handleChangeTasks(taskId, contents) {
        const task = tasks.find(task => task.id === taskId);
        if (task.contents === contents) {
            inputRef?.current?.focus();
        } else {
            await updateTask(taskId, {contents, isDone: task.isDone})
        }
    }

    async function handleCheckboxClick(e, taskId) {
        const task = tasks.find(task => task.id === taskId);
        await updateTask(taskId, {contents: task.contents, isDone: e.target.checked})
    }

    return (
        <div className={styles['home-page']}>
            <div className={styles['top-area']}>
                <div className={styles['text-wrapper']}>Good afternoon, Lily.</div>
                <div>
                    <div className={styles['text-wrapper']}>{`You've got`}</div>
                    <div className={styles['number-wrapper']}>2 / 2</div>
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
                        <div style={{height: '40px', background: '#fff'}}>드랍다운</div>
                    </div>
                    <div className={styles['clear-all-button-wrapper']}>
                        <Button onClick={() => {
                        }}>Clear All</Button>
                    </div>
                </div>
                {tasks.length ? <div className={styles['todo-container']}>
                        {tasks.map(todo => {
                            return selectedTaskId === todo.id ?
                                <TextField ref={inputRef} key={todo.id} value={todo.contents} showBorder
                                           onClickOutside={handleOutsideClick}
                                           onSubmit={async (contents) => {
                                               await handleChangeTasks(todo.id, contents)
                                           }}
                                /> :
                                <TaskItem key={todo.id} task={todo}
                                          onClickContents={handleContentsClick}
                                          onClickCheckbox={handleCheckboxClick}
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
