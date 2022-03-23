import { useDispatch } from "react-redux";
import { setAuthState } from "../redux/reducers/authenticate";
import { setUser } from "../redux/reducers/user";
import UserService from "../services/UserService";

const useAuthenticate = () => {
  const dispatch = useDispatch();

  function handleAuthenticated(isAuthenticated) {
    dispatch(setAuthState(isAuthenticated));
  }

  function handleUser(data) {
    dispatch(
      setUser({
        id: data._id,
        username: data.username,
        password: data.password,
      })
    );
  }

  return () => {
    UserService.authenticate(handleAuthenticated, handleUser);
  };
};

export default useAuthenticate;
