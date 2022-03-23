import React, { useEffect, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import UserService from "../services/UserService";

const TaskItems = ({ activeTask, handleTaskItems, handleCompleteTaskItem, handleDeleteTaskItem }) => {
  const [taskname, setTaskname] = useState("");
  const [tasknameIsError, setTasknameIsError] = useState(false);

  useEffect(() => {
    setTasknameIsError(false);
    setTaskname("");
  }, [activeTask]);

  const onClick = () => {
    if (!taskname.trim()) {
      setTasknameIsError(true);
    } else {
      UserService.addTaskItem(
        taskname.trim(),
        activeTask._id,
        (data) => {
          handleTaskItems(activeTask._id, {
            _id: data,
            item: taskname,
            completed: false,
          });
        },
        () => {}
      );
    }
  };

  function handleDelete(taskitemid) {
    UserService.deleteTaskItem(activeTask._id, taskitemid, () => {
      handleDeleteTaskItem(activeTask._id, taskitemid);
    }, () => {
      console.log("failed");
    })
  }

  function handleComplete(taskitemid) {
    UserService.completeTaskItem(activeTask._id, taskitemid, () => {
     handleCompleteTaskItem(activeTask._id, taskitemid);
    }, () => {
      console.log("failed");
    })
  }

  return (
    <div className="taskContainer">
      <div className="taskHeader">
        <h1>Task Items</h1>
        <div className="addButton" onClick={onClick}>
          <p>Add</p>
        </div>
      </div>
      <div className="loginInputContainer taskInput">
        <p>Item</p>
        <div>
          <input
            className="loginInput"
            type={"text"}
            value={taskname}
            onChange={(e) => {
              setTaskname(e.target.value);
              if (tasknameIsError) setTasknameIsError(false);
            }}
          />
        </div>
      </div>
      {tasknameIsError && <p className="errorText">Required</p>}

      <div className="taskItemContent">
        {activeTask.taskitems.length <= 0 ? (
          <div className="emptyTaskContainer">
           <p>No task items</p>
          </div>
        ) : (
          <div>
            {activeTask.taskitems.map((item, index) => {
              return (
                <div className="taskItem" key={item._id}>
                  <div className="taskItemStatus">
                    {!item.completed ? (
                      <AiOutlineClockCircle color="#FFD600" />
                    ) : (
                      <AiOutlineCheckCircle color="#41B619" />
                    )}
                    <p> {item.item}</p>
                  </div>
                  <div className="taskItemButtons">
                    {!item.completed && (
                      <div className="completeButton itemButton">
                        <AiOutlineCheck color="#41B619" 
                        onClick={() => handleComplete(item._id)}/>
                      </div>
                    )}

                    <div className="deleteButton itemButton"
                    onClick={() => handleDelete(item._id)}>
                      <BiTrashAlt color="red" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItems;
