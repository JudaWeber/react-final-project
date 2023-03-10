import { Fragment } from "react";
import Footer from "components/Footer";

const AboutUsPage = () => {
  return (
    <Fragment>
      <h1 className="HomeH1 greet text-center pb-5">About us</h1>
      <div className="container d-flex flex-column justify-content-center mt-3 about-box p-2 text-center">
        <h2>So what are we all about?</h2>
        <p>In this website you can get your very own business card.</p>
        <p>You can edit view and delete your cards</p>
      </div>
      <div className="container d-flex flex-column justify-content-center mt-3 about-box p-2 text-center">
        <h2>how to create a card?</h2>
        <p>
          Its simple! you just register as a business and create your cards.
        </p>
      </div>
      <div className="container d-flex flex-column justify-content-center mt-3 about-box p-2 text-center">
        <h2>Is it safe?</h2>
        <p>
          Sure! Only you can accsess your saved cards and manage them as you
          wish.
        </p>
      </div>
      <Footer />
    </Fragment>
  );
};

export default AboutUsPage;
