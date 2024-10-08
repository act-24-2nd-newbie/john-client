import httpClient from "../systems/httpClient.js";

function createTask(todo) {
    return httpClient.post("/tasks", todo);
}

function getTasks() {
    return httpClient.get("/tasks");
}

function updateTask() {
    return httpClient.put("/tasks");
}

function deleteTask() {
    return httpClient.delete("/tasks");
}

export default {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}