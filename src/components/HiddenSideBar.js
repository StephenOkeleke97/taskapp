import React from 'react';
import { BiArrowBack } from "react-icons/bi";

const HiddenSideBar = ({ name, visible, children }) => {
  return (
    <div className='hiddenSideBarContainer'>
        <div className='hiddenSideBarHeader'>
            <BiArrowBack/>
            <p>{name}</p>
        </div>
        {children}
    </div>
  )
}

export default HiddenSideBar