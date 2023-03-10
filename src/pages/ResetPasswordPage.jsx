import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const HandlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios
      .post("/auth/resetpassword/" + token, { password })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          New password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={HandlePasswordChange}
          value={password}
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ResetPasswordPage;
