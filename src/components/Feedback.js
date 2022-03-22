import React from "react";
import { AiFillWarning } from "react-icons/ai";

const Feedback = ({ text, isVisible, isSuccess }) => {
  return (
    <>
      {isVisible && (
        <div
          className={`feedbackContainer 
    ${isSuccess ? "successFeedback" : "failureFeedback"}`}
        >
          {!isSuccess && (
            <div className="feedbackIconContainer">
              <AiFillWarning color="#002D6D" />
            </div>
          )}
          <div className="feedbackTextContainer">{text}</div>
        </div>
      )}
    </>
  );
};

export default Feedback;
