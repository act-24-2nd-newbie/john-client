import httpClient from "../systems/httpClient.js";

function checkEmailExists(email) {
    return httpClient.get("/members/check", {params: {email}}).then(({data}) => data);
}

function signUp(email, userName) {
    return httpClient.post("/members", {email, userName}).then(({data}) => data);
}

function getMember(email) {
    return httpClient.get("/members", {params: {email}}).then(({data}) => data);
}

export default {
    checkEmailExists,
    signUp,
    getMember
}