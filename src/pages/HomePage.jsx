import Footer from "components/Footer";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userInfo = useSelector((state) => state.auth.userInfo);
  return (
    <Fragment>
      {loggedIn ? (
        <div className="container greet mt-1 mb-5">
          <h1 className="HomeH1">{userInfo.name}</h1>
          <p className="HomeParegraph">Make your dream come true!</p>
        </div>
      ) : (
        <div className="container greet mt-1 mb-5">
          <h1 className="HomeH1">Your Business dream</h1>
          <p className="HomeParegraph">lets get started</p>
        </div>
      )}

      <Footer />
    </Fragment>
  );
};

export default HomePage;
