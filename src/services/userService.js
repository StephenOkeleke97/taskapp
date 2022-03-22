import axios from "axios";
const host = "http://localhost:5100/";
const loginAPI = host + "login";
const authenticateAPI = host + "loggedin";
const registerAPI = host + "register";
const logoutAPI = host + "logout";
const requestTimeout = 10000;

class UserService {
    authenticate(success) {
        axios.post(authenticateAPI, null, {
            withCredentials: true,
            timeout: requestTimeout,
        })
        .then((response) => {
            if (response.status === 200) {
                success(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    register(username, password, success, failure) {
        axios.post(registerAPI, {
            username: username,
            password: password
        }, {
            withCredentials: true,
            timeout: requestTimeout,
        })
        .then((response) => {
            if (response.status === 200) success();
        })
        .catch((error) => {
            console.log(error);
            failure();
        })
    }

    login(username, password, success, failure) {
        axios.post(loginAPI, {
            username: username,
            password: password
        }, {
            withCredentials: true,
            timeout: requestTimeout,
        })
        .then((response) => {
            if (response.status === 200) success(response.data);
        })
        .catch((error) => {
            console.log(error);
            failure();
        })
    }

    logout(success, failure) {
        axios.post(logoutAPI, null, {
            withCredentials: true,
            timeout: requestTimeout,
        })
        .then((response) => {
            if (response.status === 200) success();
        })
        .catch((error) => {
            console.log(error);
            failure();
        })
    }
}

export default new UserService();
