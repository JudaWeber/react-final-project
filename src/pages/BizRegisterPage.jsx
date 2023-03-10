import { useEffect, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import validate from "validation/validation";
import { useDispatch, useSelector } from "react-redux";
import { bizUserInfoActions } from "store/bizUserInfo";
import bizRegisterSchema from "validation/bizRegister.validation";
import useAutoLogin from "hooks/useAutoLogin";
import Footer from "components/Footer";

const BizRegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const bizUserInfo = useSelector((state) => state.bizUserInfo.bizUserInfo);
  const autoLoginFunction = useAutoLogin();
  const [nextBtn, setNextBtn] = useState(true);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    bizInput: false,
  });
  const [userInputErrors, setUserInputErrors] = useState({
    name: [],
    email: [],
    password: [],
  });
  const [eyePasswordShow, setEyePasswordShow] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordVarifyType, setPasswordVarifyType] = useState("password");
  const [passwordVarificator, setPasswordVarificator] = useState("");
  const [show, setShow] = useState(false);
  const handleUserChange = (ev) => {
    let newUserInput = JSON.parse(JSON.stringify(userInput));
    if (newUserInput.hasOwnProperty(ev.target.id)) {
      newUserInput[ev.target.id] = ev.target.value;
      setUserInput(newUserInput);
    }
  };
  const handleBizCheckBox = (ev) => {
    let newUserInput = JSON.parse(JSON.stringify(userInput));
    if (newUserInput.hasOwnProperty(ev.target.id) && nextBtn === true) {
      newUserInput[ev.target.id] = ev.target.checked;
      setUserInput(newUserInput);
      setNextBtn(false);
    } else {
      newUserInput[ev.target.id] = ev.target.checked = false;
      setUserInput(newUserInput);
      setNextBtn(true);
    }
  };
  const handleNextClick = async () => {
    const { error } = validate(userInput, bizRegisterSchema);
    if (error) {
      let newUserInput = {
        name: [],
        email: [],
        password: [],
      };
      for (let errorItem of error.details) {
        newUserInput[errorItem.path[0]] = [
          ...newUserInput[errorItem.path[0]],
          errorItem.message,
        ];
      }
      setUserInputErrors(newUserInput);
      return;
    }
    if (!bizUserInfo) {
      let registerAxios = await axios.post("/users/register", {
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
        biz: userInput.bizInput,
      });
      if (registerAxios) {
        let loginAxios = await axios.post("/users/login", {
          email: userInput.email,
          password: userInput.password,
        });
        if (loginAxios) {
          dispatch(bizUserInfoActions.save(userInput));
          localStorage.setItem("token", loginAxios.data.token);
          autoLoginFunction(loginAxios.data.token);
          history.push("/bizform");
          toast(`welcome ${userInput.name} please create a business card`, {
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
    }
  };
  useEffect(() => {
    if (bizUserInfo) {
      setUserInput(bizUserInfo);
      setNextBtn(false);
    }
  }, []);
  const handleBlur = () => {
    let newUserInputForCaps = JSON.parse(JSON.stringify(userInput));
    let arr = newUserInputForCaps.name.split(" ");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    newUserInputForCaps.name = arr.join(" ");
    setUserInput(newUserInputForCaps);
  };
  const handleBlurPassword = () => {
    if (
      passwordVarificator &&
      userInput.password &&
      userInput.password === passwordVarificator
    ) {
      setShow(false);
    } else if (
      passwordVarificator &&
      userInput.password &&
      userInput.password !== passwordVarificator
    ) {
      setShow(true);
    }
  };
  const handlePasswordVarificationChange = (ev) => {
    setPasswordVarificator(ev.target.value);
  };
  const handleEyePassword = () => {
    if (eyePasswordShow === false) {
      setEyePasswordShow(true);
      setPasswordType("text");
      setPasswordVarifyType("text");
    } else if (eyePasswordShow === true) {
      setEyePasswordShow(false);
      setPasswordType("password");
      setPasswordVarifyType("password");
    }
  };
  return (
    <Fragment>
      <h1 className="mt-5">Business register page</h1>
      <div>
        <div className="mb-3">
          <label htmlFor="firstNameInput" className="form-label my-input">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={userInput.name}
            onChange={handleUserChange}
            onBlur={handleBlur}
          />
        </div>
        <ul className="list-group">
          {userInputErrors.name.map((error, index) => (
            <li
              className="list-group-item list-group-item-danger"
              key={"name" + index}
            >
              {error}
            </li>
          ))}
        </ul>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label my-input">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={userInput.email}
            onChange={handleUserChange}
          />
        </div>
        <ul className="list-group">
          {userInputErrors.email.map((error, index) => (
            <li
              className="list-group-item list-group-item-danger"
              key={"email" + index}
            >
              {error}
            </li>
          ))}
        </ul>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label my-input"
          >
            Password
          </label>
          <div className="input-group flex-nowrap">
            <input
              type={passwordType}
              className="form-control"
              id="password"
              value={userInput.password}
              onChange={handleUserChange}
              onBlur={handleBlurPassword}
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
        <ul className="list-group">
          {userInputErrors.password.map((error, index) => (
            <li
              className="list-group-item list-group-item-danger"
              key={"password" + index}
            >
              {error}
            </li>
          ))}
        </ul>
        <div className="mb-3">
          <label htmlFor="passwordVarification" className="form-label my-input">
            Varify Password
          </label>
          <div className="input-group flex-nowrap">
            <input
              type={passwordVarifyType}
              className="form-control"
              id="passwordVarification"
              value={passwordVarificator}
              onChange={handlePasswordVarificationChange}
              onBlur={handleBlurPassword}
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
        <ul className="list-group">
          {show && (
            <li className="list-group-item list-group-item-danger ">
              The passwords don't match😕
            </li>
          )}
        </ul>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="bizInput"
            checked={userInput.bizInput}
            onChange={handleBizCheckBox}
          />
          <label className="form-check-label" htmlFor="bizInput">
            Are you a business
          </label>
        </div>

        <button
          type="submit"
          className="btn my-btn-log-reg"
          disabled={nextBtn}
          id="nextBtnId"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
      <Footer />
    </Fragment>
  );
};

export default BizRegisterPage;
