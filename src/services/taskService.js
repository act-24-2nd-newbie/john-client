import httpClient from "../systems/httpClient.js";

function createTask(todo) {
    return httpClient.post("/tasks", todo).then(({data}) => data);
}

function getTasks() {
    return httpClient.get("/tasks").then(({data}) => data);
}

function updateTask(taskId, task) {
    return httpClient.patch(`/tasks/${taskId}`, task).then(({data}) => data);
}

function deleteTask(taskId) {
    return httpClient.delete(`/tasks/${taskId}`).then(({data}) => data);
}

function deleteAllTasks() {
    return httpClient.delete(`/tasks`).then(({data}) => data);
}
export default {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    deleteAllTasks
}