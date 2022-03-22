import React, { useState } from "react";

const TaskItems = ({ items }) => {
  const [taskname, setTaskname] = useState("");
  const [tasknameIsError, setTasknameIsError] = useState(false);
  const onClick = () => {
    console.log(items);
  }
  return (
    <div className="taskContainer">
      <div className="taskHeader">
        <h1>Task Items</h1>
        <div className="addButton" onClick={onClick}>
          <p>Add</p>
        </div>
      </div>
      <div
          className="loginInputContainer taskInput" >
          <p>Task Name</p>
          <div>
            <input
              className="loginInput"
              type={"text"}
              value={"taskname"}
              onChange={(e) => {
               
              }}
            />
          </div>
        </div>
        <p className="errorText">Required</p>

      <div className="taskItemContent">
          {items.length <= 0 ? <p>No task items</p> : <div></div>}
        </div>
    </div>
  );
};

export default TaskItems;
