import React, { useEffect, useRef, useState } from "react";
import {
  AiFillCheckCircle,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthenticate from "../authentication/useAuthenticate";
import UserService from "../services/UserService";
import Button from "./Button";
import Feedback from "./Feedback";
import Loading from "./Loading";

const iconSize = 17;
const LoginForm = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [usernameIsError, setUsernameIsError] = useState(false);
  const [passwordIsError, setPasswordIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState("");
  const [isLogIn, setIsLogin] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const auth = useAuthenticate();
  const authenticated = useSelector((state) => state.authenticate.value);
  const navigate = useNavigate();
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  });

  useEffect(() => {
    if (authenticated.toString() === "true") navigate("/task");
  });

  useEffect(() => {
    function handleEnter(event) {
      if (event.key === "Enter") onSubmit();
    }
    document.addEventListener("keypress", handleEnter);

    return () => {
      document.removeEventListener("keypress", handleEnter);
    };
  });

  function getPasswordType(isVisible) {
    if (isVisible) return "text";
    return "password";
  }

  function onSubmit() {
    if (!username.trim() || !password) {
      setUsernameIsError(!username.trim());
      setPasswordIsError(!password);
      return;
    }
    setLoadingAction("Logging in...");
    setLoading(true);
    if (isLogIn) handleSignIn(username.trim(), password);
    else handleSignUp(username.trim(), password);
  }

  function handleSignUp(username, password) {
    const success = () => {
      setLoading(false);
      feedback("Success", true);
    };

    const failure = (
      message = "Something went wrong. Please try again later"
    ) => {
      setLoading(false);
      feedback(message, false);
    };
    UserService.register(username, password, success, failure);
  }

  function handleSignIn(username, password) {
    const success = () => {
      setLoading(false);
      feedback("Success", true);
      auth();
    };

    const failure = (
      message = "Something went wrong. Please try again later"
    ) => {
      setLoading(false);
      feedback(message, false);
    };
    UserService.login(username, password, success, failure);
  }

  function handleSwitchMode(isLogIn) {
    setIsLogin(isLogIn);
  }

  function feedback(text, isSuccess) {
    setFeedbackText(text);
    setIsSuccess(isSuccess);
    setShowFeedback(true);

    setTimeout(() => {
      if (isMounted) setShowFeedback(false);
    }, 3000);
  }

  return (
    <div>
      <h1>{isLogIn ? "Sign in with username" : "Sign up for a new account"}</h1>
      <div className="loginFormContainer">
        <div
          className="loginInputContainer"
          onClick={() => {
            usernameRef.current.focus();
          }}
        >
          <p>Username</p>
          <div>
            <input
              className="loginInput"
              type={"text"}
              ref={usernameRef}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (usernameIsError) setUsernameIsError(false);
              }}
            />
            {username.trim() && (
              <div className="formIcons">
                <AiFillCheckCircle size={iconSize - 2} color="#00DC7D" />
              </div>
            )}
          </div>
        </div>
        {usernameIsError && <p className="errorText">Username is required</p>}

        <div
          className="loginInputContainer"
          onClick={() => {
            passwordRef.current.focus();
          }}
        >
          <p>Password</p>
          <div>
            <input
              className="loginInput"
              type={getPasswordType(passwordIsVisible)}
              ref={passwordRef}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordIsError) setPasswordIsError(false);
              }}
            />
            <div
              className="formIcons"
              onClick={() => setPasswordIsVisible(!passwordIsVisible)}
            >
              {passwordIsVisible ? (
                <AiFillEyeInvisible size={iconSize} />
              ) : (
                <AiFillEye size={iconSize} />
              )}
            </div>
          </div>
        </div>
        {passwordIsError && <p className="errorText">Password is required</p>}

        <div className="loginButtonContainer">
          <Button text={"Continue"} onclick={onSubmit} />
        </div>

        <div className="signupSwitchContainer">
          {isLogIn ? (
            <p>
              Don't have an account? Sign up
              <span
                className="signupSwitch"
                onClick={() => handleSwitchMode(false)}
              >
                {" "}
                here
              </span>
            </p>
          ) : (
            <p>
              Already a member? Sign in
              <span
                className="signupSwitch"
                onClick={() => handleSwitchMode(true)}
              >
                {" "}
                here
              </span>
            </p>
          )}
        </div>
      </div>
      <Loading loading={loading} text={loadingAction} />
      <Feedback
        text={feedbackText}
        isSuccess={isSuccess}
        isVisible={showFeedback}
      />
    </div>
  );
};

export default LoginForm;
