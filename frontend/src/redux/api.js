import axios from 'axios';

const development = "http://localhost:8000";
const production = "https://meusic-api-app.herokuapp.com";

const url = process.env.NODE_ENV === "production" ? process.env.REACT_APP_PRODUCTION_PORT_API : process.env.REACT_APP_DEVELOPMENT_PORT_API;

const user = JSON.parse(localStorage.getItem("user")) || "" ;

export const api = axios.create({
    baseURL: `${url}/api`,
    credentials: "include",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": `${user.token}`
    },
});