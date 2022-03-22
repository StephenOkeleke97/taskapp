import React from "react";
import useAuthenticate from "./useAuthenticate";

const Authenticate = () => {
  const auth = useAuthenticate();
  auth();
  return <></>;
};

export default Authenticate;
