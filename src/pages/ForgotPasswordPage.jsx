import { useState } from "react";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const HandleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios
      .post("/auth/forgotpassword", { email })
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
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={HandleEmailChange}
          value={email}
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ForgotPasswordPage;
