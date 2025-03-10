import "../../static/css/styles.css";
import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <div className="">
      <Header />
      <main>
        <Outlet /> {/* Nơi hiển thị nội dung của trang con */}
      </main>
      {/* <MainContent /> */}
      <Footer />
    </div>
  );
}

export default HomePage;
