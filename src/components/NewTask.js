import React, { useState } from "react";
import UserService from "../services/UserService";
import Button from "./Button";
import HiddenSideBar from "./HiddenSideBar";

const NewTask = ({ visible, onBack, success, failure }) => {
  const [taskname, setTaskname] = useState("");
  const [iserror, setIserror] = useState(false);
  const onCreate = () => {
    if (!taskname.trim()) {
      setIserror(true);
      return;
    }
    setTaskname("");
    UserService.createTask(taskname, success, failure);
  };
  return (
    <HiddenSideBar
      name={"New Task"}
      visible={visible}
      onBack={() => onBack(false)}
    >
      <div className="newTaskContainer">
        <div className="loginInputContainer">
          <p>Task Name</p>
          <div>
            <input
              className="loginInput"
              type={"text"}
              value={taskname}
              onChange={(e) => {
                setTaskname(e.target.value);
                if (iserror) setIserror(false);
              }}
            />
          </div>
        </div>
        {iserror && <p className="errorText">Task name is required</p>}

        <div className="taskButtonContainer">
          <Button text={"Create Task"} onclick={onCreate} />
        </div>
      </div>
    </HiddenSideBar>
  );
};

export default NewTask;
