import React from 'react'

const Tasks = ({task }) => {
  return (
    <div>
        <p>{task.taskname}</p>
        <p>{task.datecreated}</p>
    </div>
  )
}

export default Tasks