import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const BizGuardRoute = ({ component: Page, ...rest }) => {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <Route
      {...rest}
      render={(props) =>
        userData && userData.biz ? (
          <Page {...props}></Page>
        ) : (
          <Redirect to="/login"></Redirect>
        )
      }
    ></Route>
  );
};

export default BizGuardRoute;
