import axios from "axios";

const host = "https://taskappbysteveserver.herokuapp.com";
const loginAPI = host + "/login";
const authenticateAPI = host + "/loggedin";
const registerAPI = host + "/register";
const logoutAPI = host + "/logout";
const getUserAPI = host + "/api/user";
const createTaskAPI = host + "/tasks";
const addTaskItemAPI = host + "/taskitem";
const requestTimeout = 10000;

class UserService {
  authenticate(authenticate, usercredentials) {
    axios
      .post(authenticateAPI, null, {
        withCredentials: true,
        timeout: requestTimeout,
      })
      .then((response) => {
        if (response.status === 200) {
          authenticate(true);
          usercredentials(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        authenticate(false);
      });
  }

  register(username, password, success, failure) {
    axios
      .post(
        registerAPI,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
          timeout: requestTimeout,
        }
      )
      .then((response) => {
        if (response.status === 200) success();
      })
      .catch((error) => {
        if (error.response) failure(error.response.data);
        else failure();
        console.log(error);
      });
  }

  login(username, password, success, failure) {
    axios
      .post(
        loginAPI,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
          timeout: requestTimeout,
        }
      )
      .then((response) => {
        if (response.status === 200) success();
      })
      .catch((error) => {
        if (error.response) failure(error.response.data);
        else failure();
        console.log(error);
      });
  }

  logout(success, failure) {
    axios
      .post(logoutAPI, null, {
        withCredentials: true,
        timeout: requestTimeout,
      })
      .then((response) => {
        if (response.status === 200) success();
      })
      .catch((error) => {
        console.log(error);
        failure();
      });
  }

  getUser(success) {
    axios
      .get(getUserAPI, {
        withCredentials: true,
        timeout: requestTimeout,
      })
      .then((response) => {
        if (response.status === 200) success(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createTask(taskname, success, failure) {
    axios
      .post(
        createTaskAPI,
        {
          taskname: taskname,
        },
        {
          withCredentials: true,
          timeout: requestTimeout,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          success(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        failure();
      });
  }

  addTaskItem(itemname, taskid, success, failure) {
    axios
      .post(
        addTaskItemAPI,
        {
          itemname: itemname,
          taskid: taskid,
        },
        {
          withCredentials: true,
          timeout: requestTimeout,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          success(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        failure();
      });
  }

  deleteTask(taskid, success, failure) {
    axios
      .delete(createTaskAPI, {
        params: {
          taskid: taskid,
        },
        withCredentials: true,
        timeout: requestTimeout,
      })
      .then((response) => {
        if (response.status === 200) {
          success();
        }
      })
      .catch((error) => {
        console.log(error);
        failure();
      });
  }

  completeTaskItem(taskid, taskitemid, success, failure) {
    axios
      .put(
        addTaskItemAPI,
        {
          taskid: taskid,
          taskitemid: taskitemid,
        },
        {
          withCredentials: true,
          timeout: requestTimeout,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          success();
        }
      })
      .catch((error) => {
        console.log(error);
        failure();
      });
  }

  deleteTaskItem(taskid, taskitemid, success, failure) {
    axios
      .delete(addTaskItemAPI, {
        params: {
          taskid: taskid,
          taskitemid: taskitemid,
        },
        withCredentials: true,
        timeout: requestTimeout,
      })
      .then((response) => {
        if (response.status === 200) {
          success();
        }
      })
      .catch((error) => {
        console.log(error);
        failure();
      });
  }
}

export default new UserService();
