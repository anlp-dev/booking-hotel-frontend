import * as React from "react";
import "../../static/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const promotions = [
  {
    id: 1,
    img: "https://cdn6.agoda.net/images/blt2/wcActivitiesPaydayCampaign-NV-20250217/Hong_Kong_Disneyland/Web/en-us.png",
    title: "Nhận mọi ưu đãi của quý khách tại đây!",
  },
  {
    id: 2,
    img: "https://cdn6.agoda.net/images/blt2/wcActivitiesPaydayCampaign-NV-20250217/Aquaria_KLCC/Web/en-us.png",
    title: "Giảm thêm 15% mừng xuân",
  },
  {
    id: 3,
    img: "https://7304094.fs1.hubspotusercontent-na1.net/hubfs/7304094/flight_ops/marketing%20campaigns/Eva%20Air/upto15bundle/mspa/en-us.png",
    title: "Ưu đãi độc quyền tại Abu Dhabi",
  },
  {
    id: 4,
    img: "https://cdn6.agoda.net/images/blt2/wcActivtiesEG-NV-20240514/Web/vi-vn.png",
    title: "Ưu đãi độc quyền tại Abu Dhabi",
  },
];

function MainContent() {
  return ( 
    <div>
     
      <div className="main-content-home">
        <img
          src="https://forever.travel-assets.com/flex/flexmanager/images/2025/01/28/PD2_00227_HCOM_ICA_DUBAI_BAB_AL_SHAMS_0771.jpg?impolicy=fcrop&w=1200&h=675&q=mediumHigh"
        />
        <div className="main-content-home-title">
          Chốn dừng chân lý tưởng chờ đón bạn
        </div>
        <div className="main-content-home-content">
          <div className="main-content-home-content-choose">
            <Button>Chỗ Ở Qua Đêm</Button>
            <Button>Chỗ Ở Trong Ngày</Button>
          </div>
          <div className="main-content-home-content-choose-2">
            <Button>
            <FontAwesomeIcon icon={faCalendarDays} />
            <span>Ngày nhận phòng</span>
            </Button>
            <Button>
            <FontAwesomeIcon icon={faCalendarDays} />
            <span>Ngày trả phòng</span>
            </Button>
          </div>

        </div>
      </div>

      <div className="discount-home">
            <img src="https://a.travel-assets.com/egds/marks/mod_hotels.svg"></img>
            <span>Thành viên tiết kiệm 10% trở lên tại hơn 100.000 khách sạn trên toàn thế giới khi đăng nhập</span>
            <Button>Đăng nhập ngay</Button>
      </div>

      <div className="advertisement-home">
        <h2>Tìm và đặt nơi lưu trú hoàn hảo</h2>
        <div className="advertisement-home-1">
        <svg class="uitk-icon uitk-icon-xlarge" aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill-rule="evenodd" d="M12.723 2.6a1 1 0 0 1-.194 1.094 5.5 5.5 0 0 0 7.777 7.776 1 1 0 0 1 1.692.743C21.884 17.638 17.45 22 12 22 6.477 22 2 17.523 2 12c0-5.452 4.362-9.884 9.787-9.998a1 1 0 0 1 .936.598zM9.698 4.336a8 8 0 1 0 9.966 9.966 7.5 7.5 0 0 1-9.966-9.966z" clip-rule="evenodd"></path></svg>
            <span>Nhận phần thưởng cho mỗi đêm bạn lưu trú</span>
        </div>
        <div className="advertisement-home-1">
        <svg class="uitk-icon uitk-icon-xlarge" aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M7.494 8.995a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path><path fill-rule="evenodd" d="M4.877 2A2.877 2.877 0 0 0 2 4.877v6.975c0 .763.303 1.495.843 2.034l7.27 7.271a2.877 2.877 0 0 0 4.07 0l6.974-6.974a2.877 2.877 0 0 0 0-4.07l-7.27-7.27A2.877 2.877 0 0 0 11.851 2H4.877zM4 4.877c0-.485.393-.878.878-.878h6.975c.233 0 .456.092.621.257l7.27 7.271c.344.343.344.9 0 1.242l-6.974 6.975a.878.878 0 0 1-1.242 0l-7.27-7.271A.879.879 0 0 1 4 11.852V4.877z" clip-rule="evenodd"></path></svg>
        <span>Tiết kiệm hơn với Giá thành viên</span>
        </div>
        <div className="advertisement-home-1">
        <svg class="uitk-icon uitk-icon-xlarge" aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M7 12.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm.5 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm3.5-3.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm.5 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm3.5-3.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm.5 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"></path><path fill-rule="evenodd" d="M16 4H8V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V4H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V4zM5 6a1 1 0 0 0-1 1v1h16V7a1 1 0 0 0-1-1H5zm15 4H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9z" clip-rule="evenodd"></path></svg>
        <span>Lựa chọn hủy miễn phí nếu đổi kế hoạch</span>
        </div>
          
      </div>

      {/* Preferred Accommodation */}
      <div className="main-PreferredAccommodation">
        <h2>Tìm cho mình nơi lưu trú yêu thích tiếp theo</h2>

        <div className="main-PreferredAccommodation-img">
            <div className="main-PreferredAccommodation-img-a">
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/624608378.jpg?k=d1b48b5c6f96884d97b31b7582fe3c0f15c4dff3228c23754a1ae828cc0d8e0c&o=&hp=1"></img>
            <span>Resort</span>
            </div>
            <div className="main-PreferredAccommodation-img-a">
            <img src="https://www.hotelescenter.es/wp-content/blogs.dir/1601/files/home//header-home-mb.jpg"></img>
            <span>Resort</span>
            </div>
            <div className="main-PreferredAccommodation-img-a">
            <img src="https://pro-static.h10hotels.com/gallery/T2D3/07_OCSHotel7.jpg"></img>
            <span>Resort</span>
            </div>
            <div className="main-PreferredAccommodation-img-a">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoWnQ76KGgDhoCCgWvQ6wbre_FUi8_kDnkzA&s"></img>
            <span>Resort</span>
            </div>
            <div className="main-PreferredAccommodation-img-a">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7ALU4st0khcyisgNPy1E7ghXitdDJ-fRJGA&s"></img>
            <span>Resort</span>
            </div>
            
        </div>
       
      </div>

        <div className="promotion-slider">
            <div className="header-promotion-slider">
              <h2>Chương trình khuyến mại chỗ ở</h2>
              <a href="#">Xem tất cả &gt;</a>
            </div>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
            >
              {promotions.map((promo) => (
                <SwiperSlide key={promo.id}>
                  <div className="slide-item">
                    <img src={promo.img} alt={promo.title} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
        </div>
        
    </div>
   );
}

export default MainContent;