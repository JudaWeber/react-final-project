import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "store/auth";
import { NavLink } from "react-router-dom";

let links = [
  {
    label: "Home",
    url: "/home",
  },
  {
    label: "About us",
    url: "/aboutus",
  },
];
let bizLinks = [
  {
    label: "Create a card",
    url: "/createacard",
  },
  {
    label: "My cards",
    url: "/mycards",
  },
];
let authLinks = {
  isLoggedIn: [
    {
      label: "Logout",
      url: "/home",
    },
  ],
  isLoggedOut: [
    {
      label: "Login",
      url: "/login",
    },
    {
      label: "Register",
      url: "/register",
    },
    {
      label: " Business Register",
      url: "/bizregister",
    },
  ],
};
const NavBar = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dataFromToken = useSelector((state) => state.auth.userData);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogoutBtnClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    history.push("/home");
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg my-navbar sticky-top">
        <div className="container-fluid">
          <div className="navbar-brand ms-5 my-logo-font" href="#">
            BizDream
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon my-toggler"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 my-logo-font">
              {links.map((item, index) => (
                <li className="nav-item" key={index + "1"}>
                  <NavLink
                    className="nav-link navbar-collapse"
                    to={item.url}
                    isActive={(match, location) => match && match.isExact}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              {dataFromToken &&
                dataFromToken.biz &&
                bizLinks.map((item, index) => (
                  <li className="nav-item" key={"links" + index}>
                    <NavLink
                      className="nav-link navbar-collapse"
                      to={item.url}
                      isActive={(match, location) => match && match.isExact}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
            </ul>
            <div className="d-flex" role="search">
              <ul className="navbar-nav me-3 mb-2 mb-lg-0">
                {loggedIn ? (
                  <Fragment>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn m-1
                       ms-2 my-button-name-logout "
                        onClick={handleLogoutBtnClick}
                      >
                        Logout
                      </button>
                    </div>
                  </Fragment>
                ) : (
                  authLinks.isLoggedOut.map((item, index) => (
                    <button
                      type="button"
                      key={"loggedOut" + index}
                      className="btn m-1
                       ms-2 my-button-name-logout"
                      onClick={() => {
                        history.push(item.url);
                      }}
                    >
                      {item.label}
                    </button>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;
