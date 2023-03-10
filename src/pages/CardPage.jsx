import { useEffect, useState } from "react";
import axios from "axios";
import { Fragment } from "react";
import Footer from "components/Footer";
import { useParams } from "react-router-dom";

const CardPage = () => {
  const [bizCard, setBizCard] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/cards/card/${id}`);
        setBizCard(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    bizCard && (
      <Fragment>
        <h1 className="greet">CardPage</h1>
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-5 col-sm-12">
              <div className="card text-center">
                <img
                  src={bizCard.image.url}
                  className="card-img-top card-page"
                  alt={bizCard.title}
                />
                <div className="card-body ">
                  <h5 className="card-title mb-4">{bizCard.title}</h5>
                  <p className="card-text">{bizCard.subTitle}</p>
                  <p className="card-text">{bizCard.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </Fragment>
    )
  );
};

export default CardPage;
