import React from 'react';
import { BiArrowBack } from "react-icons/bi";

const HiddenSideBar = ({ name, visible, onBack, children }) => {
  return (
    <div className={`hiddenSideBarContainer ${visible && "hiddenVisible"}`}>
        <div className='hiddenSideBarHeader'>
            <BiArrowBack className='hiddenSideBarBackArrow' 
            onClick={() => onBack(false)}/>
            <h1>{name}</h1>
        </div>
        {children}
    </div>
  )
}

export default HiddenSideBar