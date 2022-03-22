import React from 'react'

const Tasks = ({task, setActiveTask, activeTask }) => {
    function onClick() {
        setActiveTask(task);
    }
    const active = task === activeTask;

  return (
    <div className={`task ${active && "activeTask"}`}
     onClick={onClick}>
        <p>{new Date(Date.parse(task.datecreated)).toLocaleDateString()}</p>
        <p>{task.taskname}</p>
    </div>
  )
}

export default Tasks