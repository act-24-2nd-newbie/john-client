import styles from "./HomePage.module.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import TextField from "../components/common/TextField.jsx";
import taskService from "../services/taskService.js";
import TaskItem from "../components/TaskItem.jsx";
import Button from "../components/common/Button.jsx";

export default function HomePage() {
    const navigate = useNavigate();
    const userName = sessionStorage.getItem("userName");
    const [todos, setTodos] = useState([]);
    const [contents, setContents] = useState('');
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        !userName && navigate('/login');
        (async () => {
            await getTasks();
        })();
    }, [])

    async function getTasks() {
        const todos = await taskService.getTasks();
        setTodos(todos.sort((a, b) => ((new Date(b) - new Date(a)) * -1)));
    }

    function handleChangeTodo(text) {
        setContents(text);
    }

    async function handleSubmit() {
        await taskService.createTask({contents});
        setContents('');
        await getTasks();
    }

    function handleContentsClick(taskId) {
        setSelectedTaskId(taskId);
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
                {todos.length ? <div className={styles['todo-container']}>
                        {todos.map(todo => {
                            return selectedTaskId === todo.id ?
                                <TextField key={todo.id} value={todo.contents} showBorder/> :
                                <TaskItem key={todo.id} task={todo} onClickContents={handleContentsClick}/>
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
