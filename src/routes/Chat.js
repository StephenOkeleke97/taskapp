import React, { useEffect, useRef, useState } from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import Feedback from "../components/Feedback";
import Loading from "../components/Loading";
import { AiOutlineSearch } from "react-icons/ai";

const Chat = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackIsSuccess, setFeedbackIsSuccess] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [loading, setLoading] = useState(false);
  const navIconSize = 20;
  const options = useRef(null);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const authenticated = useSelector((state) => state.authenticate.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) navigate("/");
  }, [authenticated]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (options.current && !options.current.contains(event.target)) {
        setOptionsVisible(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleLogout() {
    setLoadingText("Logging out...");
    setLoading(true);
    const success = () => {
      setLoading(false);
      navigate("/");
    };

    const failure = () => {
      setLoading(false);
      feedback("Something went wrong. Please try again later", false);
    };

    UserService.logout(success, failure);
  }

  function toggleOptions() {
    setOptionsVisible(!optionsVisible);
  }

  function feedback(text, isSuccess) {
    setFeedbackText(text);
    setFeedbackIsSuccess(isSuccess);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
    }, 3000);
  }

  return (
    <div className="chatContainer">
      <div className="chatSideBar">
        <div className="sideBarNav">
          <div className="userProfilePicture">
            <img
              src="loginusericon.png"
              alt="myprofilepicture"
              width={"100%"}
              height={"100%"}
            />
          </div>
          <div className="rightAlinedIcons">
            <div className="newChatButton">
              <BsFillChatLeftTextFill color="#58595B" size={navIconSize} />
            </div>

            <div
              className={`optionsButtonContainer
             ${optionsVisible && "optionsOpen"}`}
            >
              <div
                className="optionsButton"
                ref={options}
                onClick={toggleOptions}
              >
                <FiMoreVertical color="#58595B" size={navIconSize} />
                <div className="options">
                  <div className="optionItems">
                    <p>New Group</p>
                  </div>

                  <div className="optionItems" onClick={handleLogout}>
                    <p>Invitations</p>
                  </div>

                  <div className="optionItems" onClick={handleLogout}>
                    <p>Logout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sideBarContent">
          <div className="searchContainer">
            <div className="searchBox">
              <AiOutlineSearch color="#58595B"/>
              <input className="searchInput" 
              placeholder="Search for chats"/>
            </div>
          </div>
        </div>
      </div>
      <div className="messageContainer"></div>

      <Feedback
        text={feedbackText}
        isVisible={showFeedback}
        isSuccess={feedbackIsSuccess}
      />
      <Loading text={loadingText} loading={loading} />
    </div>
  );
};

export default Chat;
