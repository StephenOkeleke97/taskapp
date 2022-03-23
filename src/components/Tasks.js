import React, { useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import UserService from "../services/UserService";

const Tasks = ({ task, setActiveTask, activeTask, handleDeleteTask }) => {
  const active = task === activeTask;
  const deleteRef = useRef(null);
  function onClick(event) {
    if (deleteRef.current && !deleteRef.current.contains(event.target)) {
      setActiveTask(task);
    }
  }

  function deleteTask() {
    UserService.deleteTask(
      task._id,
      () => {
        handleDeleteTask(task._id);
      },
      () => {}
    );
  }

  return (
    <div className={`task ${active && "activeTask"}`} onClick={onClick}>
      <div className="taskleftitems">
        <p>{new Date(Date.parse(task.datecreated)).toLocaleDateString()}</p>
        <p>{task.taskname}</p>
      </div>
      <div onClick={deleteTask} ref={deleteRef}>
        <AiFillCloseCircle className="deleteTaskIcon" />
      </div>
    </div>
  );
};

export default Tasks;
