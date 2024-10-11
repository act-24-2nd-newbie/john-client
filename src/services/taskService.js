import httpClient from "../systems/httpClient.js";

function createTask(todo) {
    return httpClient.post("/tasks", todo).then(({data}) => data);
}

function getTasks() {
    return httpClient.get("/tasks").then(({data}) => data);
}

function updateTask() {
    return httpClient.put("/tasks").then(({data}) => data);
}

function deleteTask() {
    return httpClient.delete("/tasks").then(({data}) => data);
}

export default {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}