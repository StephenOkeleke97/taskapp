import React from 'react'

const Button = ({ text, onclick }) => {
  return (
    <div className='loginButton' onClick={onclick}>
        <p>{text}</p>
    </div>
  )
}

export default Button