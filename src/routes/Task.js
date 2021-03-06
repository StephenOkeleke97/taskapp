import React, { useEffect, useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import Feedback from "../components/Feedback";
import Loading from "../components/Loading";
import { AiOutlineSearch } from "react-icons/ai";
import useAuthenticate from "../authentication/useAuthenticate";
import TaskItems from "../components/TaskItems";
import NewTask from "../components/NewTask";
import Tasks from "../components/Tasks";

const Task = () => {
  const auth = useAuthenticate();
  const userId = useSelector((state) => state.user.value).id;
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
  const [newTask, setNewTask] = useState(false);
  const [user, setUser] = useState();
  const [tasks, setTasks] = useState([]);
  const [searchedTasks, setSearchedTasks] = useState("");
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    if (authenticated.toString() !== "true") navigate("/");
  }, [authenticated]);

  useEffect(() => {
    let isMounted = true;
    UserService.getUser((data) => {
      if (isMounted) {
        setUser(user);
        setTasks(data.tasks);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (options.current && !options.current.contains(event.target)) {
        setOptionsVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLogout() {
    setLoadingText("Logging out...");
    setLoading(true);
    const success = () => {
      setLoading(false);
      auth();
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

  function newTaskSuccessful(data) {
    // window.location.reload();
    const temp = [...tasks];
    temp.push(data);
    setTasks(temp);
    setNewTask(false);
  }

  function newTaskError() {
    feedback("Failed to create task.", false);
  }

  function handleTaskItems(taskid, taskitem) {
    const temp = [...tasks];
    temp.forEach((task) => {
      if (task._id === taskid) {
        task.taskitems.push(taskitem);
      }
    });
    setTasks(temp);
  }

  function handleDeleteTaskItem(taskid, taskitemid) {
    const temp = [...tasks];
    temp.forEach((task) => {
      if (task._id === taskid) {
        const filtered = task.taskitems.filter(
          (item) => item._id !== taskitemid
        );
        task.taskitems = filtered;
      }
    });
    setTasks([...temp]);
  }

  function handleCompleteTaskItem(taskid, taskitemid) {
    const temp = [...tasks];
    temp.forEach((task) => {
      if (task._id === taskid) {
        task.taskitems.forEach((item) => {
          if (item._id === taskitemid) {
            item.completed = true;
          }
        });
      }
    });
    setTasks(temp);
  }

  function handleSwitchTask(task) {
    setActiveTask(task);
  }

  function handleDeleteTask(taskid) {
    const temp = tasks.filter((task) => task._id !== taskid);
    setTasks(temp);
    if (activeTask._id === taskid) setActiveTask(null);
  }

  return (
    <div className="taskMainContainer">
      <div className="taskSideBar">
        <div className="sideBarNav">
          <div className="userProfilePicture">
            <img
              src="loginusericon.png"
              alt="myprofilepicture"
              width={"100%"}
              height={"100%"}
            />
          </div>
          <div className="rightAlignedIcons">
            <div
              className={`optionsButtonContainer navButton
             ${optionsVisible && "optionsOpen"}`}
            >
              <div
                className="optionsButton"
                ref={options}
                onClick={toggleOptions}
              >
                <FiMoreVertical color="#58595B" size={navIconSize} />
                <div className="options">
                  <div className="optionItems" onClick={() => setNewTask(true)}>
                    <p>New Task</p>
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
              <AiOutlineSearch color="#58595B" />
              <input
                className="searchInput"
                placeholder="Search for tasks"
                value={searchedTasks}
                onChange={(e) => {
                  setSearchedTasks(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="tasks">
            {tasks.length <= 0 ? (
              <div className="emptyTaskContainer">
                <p>No tasks to show</p>
              </div>
            ) : (
              tasks
                .filter((task) =>
                  task.taskname
                    .toLowerCase()
                    .includes(searchedTasks.toLowerCase())
                )
                .map((task, index) => {
                  return (
                    <Tasks
                      task={task}
                      key={task._id}
                      setActiveTask={handleSwitchTask}
                      activeTask={activeTask}
                      handleDeleteTask={handleDeleteTask}
                    />
                  );
                })
            )}
          </div>
        </div>
        <NewTask
          visible={newTask}
          onBack={setNewTask}
          success={newTaskSuccessful}
          failure={newTaskError}
        />
      </div>
      <div className="taskPane">
        {activeTask && (
          <TaskItems
            activeTask={activeTask}
            handleTaskItems={handleTaskItems}
            handleCompleteTaskItem={handleCompleteTaskItem}
            handleDeleteTaskItem={handleDeleteTaskItem}
          />
        )}
      </div>
      <Feedback
        text={feedbackText}
        isVisible={showFeedback}
        isSuccess={feedbackIsSuccess}
      />
      <Loading text={loadingText} loading={loading} />
    </div>
  );
};

export default Task;
