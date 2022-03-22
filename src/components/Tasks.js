import React from 'react'

const Tasks = ({task, setTaskItems, setActiveTask, activeTask }) => {
    function onClick() {
        setTaskItems(task.taskitems);
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