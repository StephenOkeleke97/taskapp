import React from "react";
import { BiGhost } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className="notFoundContainer">
      <BiGhost size={200} />
      <p>404. Page Not Found</p>
    </div>
  );
};

export default NotFound;
