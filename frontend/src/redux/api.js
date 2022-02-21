import axios from 'axios';

const development = "http://localhost:8000";
const production = "https://meusic-api-app.herokuapp.com";

const url = process.env.NODE_ENV === "development" ? development : production;

const user = JSON.parse(localStorage.getItem("user")) || "" ;

export const api = axios.create({
    baseURL: `${url}/api`,
    credentials: "include",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": `${user.token}`
    },
});