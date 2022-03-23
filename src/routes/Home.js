import React from "react";
import LoginForm from "../components/LoginForm";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="homeLeftPane">
        <div className="loginContainer">
          <LoginForm />
        </div>
      </div>
      <div className="homeRightPane"></div>
    </div>
  );
};

export default Home;
