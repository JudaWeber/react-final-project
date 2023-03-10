import { Fragment, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import validate from "validation/validation";
import loginSchema from "validation/login.validation";
import { useHistory } from "react-router-dom";
import useAutoLogin from "hooks/useAutoLogin";
import Footer from "components/Footer";

const LoginPage = () => {
  const history = useHistory();
  const autoLoginFunction = useAutoLogin();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [eyePasswordShow, setEyePasswordShow] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const splitString = (stringToSplit, separator) => {
    const arrayOfStrings = stringToSplit.split(separator);
    for (let item of arrayOfStrings) return item;
  };

  const handleLoginClick = async () => {
    const { error } = validate(userInput, loginSchema);
    if (error) {
      let errorMessages = "";
      for (let errorItem of error.details) {
        switch (errorItem.type) {
          case "string.min":
            errorMessages += `${errorItem.context.label} length needs to be at least ${errorItem.context.limit} characters long, `;
            break;
          case "string.max":
            errorMessages += `${errorItem.context.label} length needs to be max ${errorItem.context.limit} characters long, `;
            break;
          case "any.empty":
            errorMessages += `${errorItem.context.label} must not be empty, `;
            break;
          case "string.email":
            errorMessages += `The email you entered is not in proper format, `;
            break;
          default:
            errorMessages += `Somthing went wrong with ${errorItem.context.label}, `;
            break;
        }
      }
      toast.warn(splitString(errorMessages, ","), {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }
    try {
      let { data } = await axios.post("/users/login", {
        email: userInput.email,
        password: userInput.password,
      });
      if (data) {
        localStorage.setItem("token", data.token);
        autoLoginFunction(data.token);
        history.push("/home");
      }
    } catch (err) {
      if (err.response) {
        toast.error(splitString(err.response.data), {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  const handleUserInputChange = (ev) => {
    let newUserInput = JSON.parse(JSON.stringify(userInput));
    if (newUserInput.hasOwnProperty(ev.target.id)) {
      newUserInput[ev.target.id] = ev.target.value;
      setUserInput(newUserInput);
    }
  };
  const handleEyePassword = () => {
    if (eyePasswordShow === false) {
      setEyePasswordShow(true);
      setPasswordType("text");
    } else if (eyePasswordShow === true) {
      setEyePasswordShow(false);
      setPasswordType("password");
    }
  };
  return (
    <Fragment>
      <h1 className="greet mt-5">Login Page</h1>
      <div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label my-input">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={userInput.email}
            onChange={handleUserInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label my-input">
            Password
          </label>
          <div className="input-group flex-nowrap">
            <input
              type={passwordType}
              className="form-control"
              id="password"
              value={userInput.password}
              onChange={handleUserInputChange}
            />
            <button
              className="input-group-text"
              id="addon-wrapping"
              onClick={handleEyePassword}
            >
              {eyePasswordShow ? (
                <i className="bi bi-eye-fill"></i>
              ) : (
                <i className="bi bi-eye-slash-fill"></i>
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="btn my-btn-log-reg"
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>
      <Footer />
    </Fragment>
  );
};

export default LoginPage;
