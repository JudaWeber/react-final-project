import axios from "axios";

const getUserInfo = () => {
  if (localStorage.getItem("token")) {
    return axios.get("/users/userInfo");
  }
};

export default getUserInfo;
