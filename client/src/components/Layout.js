import React from "react";
import { Container } from "react-materialize";
import Header from "./Header";
import Footer from "./Footer";

import LandingPage from "./LandingPage";

export default () => {
  return (
    <div className="body-padding">
      <Header />
      <Container>
        <LandingPage />
      </Container>
      <Footer />
    </div>
  );
};
