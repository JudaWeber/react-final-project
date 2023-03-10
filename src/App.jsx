import LoginPage from "pages/LoginPage";
import NavBar from "components/NavBar";
import RegisterPage from "pages/RegisterPage";
import "../src/style/App.scss";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import CreateACardPage from "pages/CreateACardPage";
import AboutUsPage from "pages/AboutUsPage";
import HomePage from "pages/HomePage";
import BizRegisterPage from "pages/BizRegisterPage";
import MyCards from "pages/MyCards";
import useAutoLogin from "hooks/useAutoLogin";
import NotFoundPage from "pages/NotFoundPage";
import BizRegFormPage from "pages/BizRegFormPage";
import BizGuardRoute from "components/BizGuardRoute";
import Background from "components/Background";
import CardPage from "pages/CardPage";
import ForgotPasswordPage from "pages/ForgotPasswordPage";
import ResetPasswordPage from "pages/ResetPasswordPage";

const App = () => {
  const autoLoginFunction = useAutoLogin();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [tryingToLogin, setTryingToLogin] = useState(true);
  useEffect(() => {
    (async () => {
      let status = await autoLoginFunction(localStorage.getItem("token"));
      if (status === false) {
        setTryingToLogin(false);
      }
    })();
  }, []);
  useEffect(() => {
    if (loggedIn === true && tryingToLogin === true) {
      setTryingToLogin(false);
    }
  }, [loggedIn]);
  return (
    <div className="container ">
      <NavBar />
      <ToastContainer />
      <Background />
      {!tryingToLogin && (
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path={"/home"} component={HomePage}></Route>
          <Route path={"/register"} component={RegisterPage}></Route>
          <Route path={"/bizregister"} component={BizRegisterPage}></Route>
          <Route path={"/login"} component={LoginPage}></Route>
          <Route path={"/aboutus"} component={AboutUsPage}></Route>
          <BizGuardRoute path={"/mycards"} component={MyCards}></BizGuardRoute>
          <BizGuardRoute
            path={"/createacard"}
            component={CreateACardPage}
          ></BizGuardRoute>
          <BizGuardRoute
            path={"/cardpage/:id"}
            component={CardPage}
          ></BizGuardRoute>
          <Route path="/forgotpassword" component={ForgotPasswordPage}></Route>
          <Route
            path="/resetpassword/:token"
            component={ResetPasswordPage}
          ></Route>
          <Route path={"/bizform"} component={BizRegFormPage}></Route>
          <Route path="*" component={NotFoundPage}></Route>
        </Switch>
      )}
    </div>
  );
};

export default App;
