import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import validate from "validation/validation";
import axios from "axios";
import { useSelector } from "react-redux";
import useAutoLogin from "hooks/useAutoLogin";
import cardSchema from "validation/card.validation";
import { toast } from "react-toastify";
import Footer from "components/Footer";

const BizRegFormPage = () => {
  const autoLoginFunction = useAutoLogin();
  const bizUserInfo = useSelector((state) => state.bizUserInfo.bizUserInfo);
  const [businessInput, setBusinessInfo] = useState({
    title: "",
    subTitle: "",
    description: "",
    address: "",
    phone: "",
    url: "",
  });
  const [businessInputErrors, setBusinessInfoErrors] = useState({
    title: [],
    subTitle: [],
    description: [],
    address: [],
    phone: [],
    url: [],
  });
  const handleBusinessChange = (ev) => {
    let newBusinessInput = JSON.parse(JSON.stringify(businessInput));
    if (newBusinessInput.hasOwnProperty(ev.target.id)) {
      newBusinessInput[ev.target.id] = ev.target.value;
      setBusinessInfo(newBusinessInput);
    }
  };

  const handleRegisterClick = async () => {
    const { error } = validate(businessInput, cardSchema);
    if (error) {
      let newBusinessInput = {
        title: [],
        subTitle: [],
        description: [],
        address: [],
        phone: [],
        url: [],
      };
      for (let errorItem of error.details) {
        if (errorItem.message.includes("pattern")) {
          errorItem.message =
            "Please insert a valid image link(the url needs to end with .jpg or .png etc...)";
        }
        newBusinessInput[errorItem.path[0]] = [
          ...newBusinessInput[errorItem.path[0]],
          errorItem.message,
        ];
      }
      setBusinessInfoErrors(newBusinessInput);
      return;
    }
    try {
      let loginAxios = await axios.post("/users/login", {
        email: bizUserInfo.email,
        password: bizUserInfo.password,
      });
      if (loginAxios) {
        localStorage.setItem("token", loginAxios.data.token);
        autoLoginFunction(loginAxios.data.token);
        let createCardAxios = await axios.post("/cards/", {
          title: businessInput.title,
          subTitle: businessInput.subTitle,
          description: businessInput.description,
          address: businessInput.address,
          phone: businessInput.phone,
          url: businessInput.url,
        });
        if (createCardAxios) {
          toast(`You have successfully created a card.`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <h1 className="mt-5">Business Registration form</h1>
      <div>
        <div className="container">
          <div className="mb-3">
            <label htmlFor="title" className="form-label my-input">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={businessInput.title}
              onChange={handleBusinessChange}
            />
          </div>
          <ul className="list-group">
            {businessInputErrors.title.map((error, index) => (
              <li
                className="list-group-item list-group-item-danger"
                key={"title" + index}
              >
                {error}
              </li>
            ))}
          </ul>
          <div className="mb-3">
            <label htmlFor="subTitle" className="form-label my-input">
              Subtitle
            </label>
            <input
              type="text"
              className="form-control"
              id="subTitle"
              value={businessInput.subTitle}
              onChange={handleBusinessChange}
            />
          </div>
          <ul className="list-group">
            {businessInputErrors.subTitle.map((error, index) => (
              <li
                className="list-group-item list-group-item-danger"
                key={"subTitle" + index}
              >
                {error}
              </li>
            ))}
          </ul>
          <div className="mb-3">
            <label htmlFor="description" className="form-label my-input">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={businessInput.description}
              onChange={handleBusinessChange}
            />
          </div>
          <ul className="list-group">
            {businessInputErrors.description.map((error, index) => (
              <li
                className="list-group-item list-group-item-danger"
                key={"description" + index}
              >
                {error}
              </li>
            ))}
          </ul>
          <div className="mb-3">
            <label htmlFor="address" className="form-label my-input">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={businessInput.address}
              onChange={handleBusinessChange}
            />
          </div>
          <ul className="list-group">
            {businessInputErrors.address.map((error, index) => (
              <li
                className="list-group-item list-group-item-danger"
                key={"address" + index}
              >
                {error}
              </li>
            ))}
          </ul>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label my-input">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              value={businessInput.phone}
              onChange={handleBusinessChange}
            />
          </div>
          <ul className="list-group">
            {businessInputErrors.phone.map((error, index) => (
              <li
                className="list-group-item list-group-item-danger"
                key={"phone" + index}
              >
                {error}
              </li>
            ))}
          </ul>
          <div className="mb-3">
            <label htmlFor="url" className="form-label my-input">
              Image url
            </label>
            <input
              type="text"
              className="form-control"
              id="url"
              value={businessInput.url}
              onChange={handleBusinessChange}
            />
          </div>
          <ul className="list-group">
            {businessInputErrors.url.map((error, index) => (
              <li
                className="list-group-item list-group-item-danger"
                key={"url" + index}
              >
                {error}
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-evenly">
            <button
              type="submit"
              className="btn my-btn-log-reg"
              onClick={handleRegisterClick}
            >
              Create Card
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default BizRegFormPage;
