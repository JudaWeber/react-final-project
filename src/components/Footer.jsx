import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

const Footer = () => {
  const history = useHistory();

  const pushToNotFoundPage = () => {
    history.push("/*");
  };
  return (
    <Fragment>
      <div className="all-wrap">
        <div className="footer-wrapper container-fluid">
          <div className="row p-2">
            <div className="col-lg-4 col-sm-12">
              <div className="grid-item footer-header mb-2">OVERVIEW</div>
              <div
                className="grid-item footer-text"
                onClick={() => {
                  history.push("/aboutus");
                }}
              >
                About
              </div>
              <div
                className="grid-item footer-text"
                onClick={pushToNotFoundPage}
              >
                Carees
              </div>
              <div
                className="grid-item footer-text"
                onClick={pushToNotFoundPage}
              >
                Contact
              </div>
              <div
                className="grid-item footer-text"
                onClick={pushToNotFoundPage}
              >
                Terms of Use
              </div>
              <div
                className="grid-item footer-text mb-3"
                onClick={pushToNotFoundPage}
              >
                Privacy Policy
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="grid-item footer-header mb-2">COMMUNITY</div>
              <div
                className="grid-item footer-text"
                onClick={pushToNotFoundPage}
              >
                Support
              </div>
              <div
                className="grid-item footer-text"
                onClick={pushToNotFoundPage}
              >
                Help
              </div>
              <div
                className="grid-item footer-text"
                onClick={pushToNotFoundPage}
              >
                Blog
              </div>
              <div
                className="grid-item footer-text mb-3"
                onClick={pushToNotFoundPage}
              >
                FAQ
              </div>
            </div>
            <div className="col">
              <div className=" grid-item footer-header mb-2">FOLLOW US</div>
              <div className=" grid-item">
                <i className="bi bi-twitter"></i>
              </div>
              <div className=" grid-item">
                <i className="bi bi-facebook"></i>
              </div>
              <div className=" grid-item">
                <i className="bi bi-youtube"></i>
              </div>
              <div className=" grid-item">
                <i className="bi bi-instagram"></i>
              </div>
              <div className=" grid-item mb-3">
                <i className="bi bi-linkedin"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
