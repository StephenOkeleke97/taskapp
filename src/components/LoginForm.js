import React, { useRef, useState } from "react";
import {
  AiFillCheckCircle,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import Button from "./Button";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const iconSize = 17;
const LoginForm = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [usernameIsError, setUsernameIsError] = useState(false);
  const [passwordIsError, setPasswordIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      console.log("Submitted");
  }

  return (
    <div>
    <ClipLoader loading={true}/>
      <h1>Sign in with username</h1>

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
                <Button text={"Continue"} onclick={onSubmit}/>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
