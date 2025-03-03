import * as React from "react";
import "../../static/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./header";
import Footer from "./footer";
import MainContent from "./mainContent";




function HomePage() {
  return (
    <div className="">
        <Header/>
        <MainContent/>
        <Footer/>
    </div>
  );
}

export default HomePage;
