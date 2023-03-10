import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation, useHistory, Link } from "react-router-dom";
import cardSchema from "validation/card.validation";
import validate from "validation/validation";
import Footer from "components/Footer";

const MyCards = () => {
  const location = useLocation();
  const history = useHistory();
  const [arrForFilter, setArrForFilter] = useState([]);
  const [cardArr, setCardArr] = useState([]);
  const [cardEditInfo, setCardEditInfo] = useState({
    title: "",
    subTitle: "",
    description: "",
    address: "",
    phone: "",
    url: "",
    id: "",
  });
  const [cardInputErrors, setCardInputErrors] = useState({
    title: [],
    subTitle: [],
    description: [],
    address: [],
    phone: [],
    url: [],
  });
  const [filterInput, setFilterInput] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useEffect(() => {
  //   (async () => {
  //     let { data } = await axios.get("/cards/my-cards");
  //     if (data) {
  //       setArrForFilter(data);
  //       setCardArr(data);
  //     }
  //     let qParams = new URLSearchParams(location.search);
  //     history.push(`/mycards?${qParams.toString()}`);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/cards/my-cards");
        if (data) {
          setArrForFilter(data);
          setCardArr(data);
        }
        let qParams = new URLSearchParams(location.search);
        history.push(`/mycards?${qParams.toString()}`);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDeleteClick = async (ev) => {
    try {
      let deleted = await axios.delete(`/cards/${ev.target.id}`);
      if (deleted) {
        let { data } = await axios.get("/cards/my-cards");
        if (data) {
          setCardArr(data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditClick = async (ev) => {
    setCardInputErrors({
      title: [],
      subTitle: [],
      description: [],
      address: [],
      phone: [],
      url: [],
    });
    try {
      let { data } = await axios.get(`cards/card/${ev.target.id}`);
      if (data) {
        setCardEditInfo({
          title: data.title,
          subTitle: data.subTitle,
          description: data.description,
          address: data.address,
          phone: data.phone,
          url: data.image.url,
          id: data._id,
        });
        handleShow();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleCardInputChange = (ev) => {
    let newCardInput = JSON.parse(JSON.stringify(cardEditInfo));
    if (newCardInput.hasOwnProperty(ev.target.id)) {
      newCardInput[ev.target.id] = ev.target.value;
      setCardEditInfo(newCardInput);
    }
  };
  const handleModalSave = async (ev) => {
    const { error } = validate(cardEditInfo, cardSchema);
    if (error) {
      let newCardInfoInput = {
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
        newCardInfoInput[errorItem.path[0]] = [
          ...newCardInfoInput[errorItem.path[0]],
          errorItem.message,
        ];
      }
      setCardInputErrors(newCardInfoInput);
      return;
    }
    try {
      let { data } = await axios.put(`/cards/${ev.target.id}`, {
        title: cardEditInfo.title,
        subTitle: cardEditInfo.subTitle,
        description: cardEditInfo.description,
        address: cardEditInfo.address,
        phone: cardEditInfo.phone,
        url: cardEditInfo.url,
      });
      if (data) {
        setCardEditInfo(data);
        let cards = await axios.get("/cards/my-cards");
        if (cards) {
          setCardArr(cards.data);
          setArrForFilter(cards.data);
          let qParams = new URLSearchParams(location.search);
          history.push(`/mycards?${qParams.toString()}`);
        }
      }
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };
  const handleFilterInputChange = (ev) => {
    setFilterInput(ev.target.value);
  };

  const handleFilterEnterPress = (event) => {
    if (event.code === "Enter") {
      let qParams = new URLSearchParams(location.search);
      qParams.set("filter", filterInput);
      history.push(`/mycards?${qParams.toString()}`);
    }
  };
  const handleSortASC = () => {
    let qParams = new URLSearchParams(location.search);
    qParams.set("sort", "asc");
    history.push(`/mycards?${qParams.toString()}`);
  };
  const handleSortDESC = () => {
    let qParams = new URLSearchParams(location.search);
    qParams.set("sort", "desc");
    history.push(`/mycards?${qParams.toString()}`);
  };

  useEffect(() => {
    let newFilteredArr = undefined;
    let qParams = new URLSearchParams(location.search);
    if (qParams.has("filter")) {
      let filter = qParams.get("filter");
      let regex = new RegExp(filter, "i");
      newFilteredArr = JSON.parse(JSON.stringify(arrForFilter));
      newFilteredArr = newFilteredArr.filter((item) => regex.test(item.title));
      if (filter !== filterInput) {
        setFilterInput(filter);
      }
    }
    if (qParams.has("sort")) {
      if (!newFilteredArr) {
        newFilteredArr = JSON.parse(JSON.stringify(arrForFilter));
      }
      if (qParams.get("sort") === "asc") {
        newFilteredArr = [...newFilteredArr].sort((a, b) =>
          a.title > b.title ? 1 : -1
        );
      } else if (qParams.get("sort") === "desc") {
        newFilteredArr = [...newFilteredArr].sort((a, b) =>
          a.title < b.title ? 1 : -1
        );
      }
    }
    if (newFilteredArr) {
      setCardArr(newFilteredArr);
    }
  }, [location]);

  return (
    <Fragment>
      <h1 className="container greet mt-5">My cards</h1>
      <div className="input-group mb-3 d-flex justify-content-center ">
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="filter"
            placeholder="Search"
            value={filterInput}
            onChange={handleFilterInputChange}
            onKeyUp={handleFilterEnterPress}
          />
          <label htmlFor="filter">Search</label>
        </div>
        <button
          type="button"
          id="AZ"
          className="btn btn-primary ms-2 rounded-4"
          onClick={handleSortASC}
        >
          A-Z ⬇️
        </button>
        <button
          type="button"
          id="ZA"
          className="btn btn-primary ms-2 rounded-4"
          onClick={handleSortDESC}
        >
          Z-A ⬇️
        </button>
      </div>
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {cardArr.map((item, index) => (
            <div className="col-md-6 col-sm-6 col-lg-4" key={"card" + index}>
              <div className="card h-100">
                <img
                  src={item.image.url}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <div className="card-buttons d-flex justify-content-evenly">
                    <button
                      id={item._id}
                      type="button"
                      className="btn btn-info"
                      onClick={handleEditClick}
                    >
                      <i className="bi bi-pencil"></i>
                      Edit
                    </button>
                    <button
                      id={item._id}
                      type="button"
                      className="btn btn-danger"
                      onClick={handleDeleteClick}
                    >
                      <i className="bi bi-trash"></i>
                      Delete
                    </button>
                    <Link
                      to={`/cardpage/${item._id}`}
                      id={item._id}
                      type="button"
                      className="btn btn-success"
                    >
                      <i className="bi bi-binoculars"></i>
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="container">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={cardEditInfo.title}
                    onChange={handleCardInputChange}
                  />
                </div>
                <ul className="list-group">
                  {cardInputErrors.title.map((error, index) => (
                    <li
                      className="list-group-item list-group-item-danger"
                      key={"title" + index}
                    >
                      {error}
                    </li>
                  ))}
                </ul>
                <div className="mb-3">
                  <label htmlFor="subTitle" className="form-label">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subTitle"
                    value={cardEditInfo.subTitle}
                    onChange={handleCardInputChange}
                  />
                </div>
                <ul className="list-group">
                  {cardInputErrors.subTitle.map((error, index) => (
                    <li
                      className="list-group-item list-group-item-danger"
                      key={"subTitle" + index}
                    >
                      {error}
                    </li>
                  ))}
                </ul>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={cardEditInfo.description}
                    onChange={handleCardInputChange}
                  />
                </div>
                <ul className="list-group">
                  {cardInputErrors.description.map((error, index) => (
                    <li
                      className="list-group-item list-group-item-danger"
                      key={"description" + index}
                    >
                      {error}
                    </li>
                  ))}
                </ul>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={cardEditInfo.address}
                    onChange={handleCardInputChange}
                  />
                </div>
                <ul className="list-group">
                  {cardInputErrors.address.map((error, index) => (
                    <li
                      className="list-group-item list-group-item-danger"
                      key={"address" + index}
                    >
                      {error}
                    </li>
                  ))}
                </ul>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={cardEditInfo.phone}
                    onChange={handleCardInputChange}
                  />
                </div>
                <ul className="list-group">
                  {cardInputErrors.phone.map((error, index) => (
                    <li
                      className="list-group-item list-group-item-danger"
                      key={"phone" + index}
                    >
                      {error}
                    </li>
                  ))}
                </ul>
                <div className="mb-3">
                  <label htmlFor="url" className="form-label">
                    Image url
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="url"
                    value={cardEditInfo.url}
                    onChange={handleCardInputChange}
                  />
                </div>
              </div>
            </div>
            <ul className="list-group">
              {cardInputErrors.url.map((error, index) => (
                <li
                  className="list-group-item list-group-item-danger"
                  key={"url" + index}
                >
                  {error}
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleModalSave}
              id={cardEditInfo.id}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Footer />
    </Fragment>
  );
};

export default MyCards;
