import { useDispatch } from "react-redux";
import getUserInfo from "services/getUserInfo";
import { authActions } from "store/auth";
import jwt_decode from "jwt-decode";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  const autoLoginFunction = async (token) => {
    try {
      let { data } = await getUserInfo();
      let dataFromToken = jwt_decode(token);
      if (data) {
        dispatch(authActions.login(dataFromToken));
        dispatch(authActions.updateUserInfo(data));

        return true;
      }
    } catch (err) {
      return false;
    }
  };
  return autoLoginFunction;
};

export default useAutoLogin;
