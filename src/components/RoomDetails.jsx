import { Button, DatePicker, Slider, Space, Tabs } from "antd";
import {
  AppstoreOutlined,
  CarOutlined,
  CheckOutlined,
  HomeOutlined,
  StarOutlined,
  UserOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import styles from "../static/css/RoomDetails.module.css";
import OverView from "./DetailItems/OverView";
import FeesAndPolicy from "./DetailItems/FeesAndPolicy";
import Disabled from "./DetailItems/Disabled";
import { useState } from "react";
import ModalDetails from "./DetailItems/ModalDetails";

const RoomDetails = () => {
  const [isModal, setIsModal] = useState(false);
  const onChange = (key) => {
    console.log(key);
  };
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };
  const items = [
    {
      key: "1",
      label: <h4>Tổng quan</h4>,
      // children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: <h4>Thông tin</h4>,
      // children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: <h4>Phòng</h4>,
      // children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: <h4>Hỗ trợ người khuyết tật</h4>,
      // children: "Content of Tab Pane 3",
    },
    {
      key: "5",
      label: <h4>Chính sách</h4>,
      // children: "Content of Tab Pane 3",
    },
  ];

  const marks = {
    0: "0 đ",
    20: "2.984.127 đ",
    50: "5.680.541 đ",
    80: "8.520.812 đ",
    100: "",
  };

  const hanleViewDetail = () => {
    setIsModal(!isModal);
  };

  return (
    <div className={styles.container}>
      {/* Top header */}
      <div className={styles.top}>
        <div className={styles.pickPerson}>
          <Space direction="vertical">
            <DatePicker onChange={onChangeDate} />
          </Space>
          <h4 className={styles.customerTitle}>Ngày đến</h4>
        </div>

        <div className={styles.pickPerson}>
          <Space direction="vertical">
            <DatePicker onChange={onChangeDate} />
          </Space>

          <h4 className={styles.customerTitle}>Ngày đi</h4>
        </div>

        <div className={styles.pickPerson}>
          <UserOutlined />
          <div className={styles.customer}>
            <h4 className={styles.customerTitle}>Khách</h4>
            <p className={styles.customerNumber}>2 khách, 1 phòng</p>
          </div>
        </div>
        <div className={styles.buttonSearch}>
          <Button type="primary">Tìm</Button>
        </div>
      </div>

      {/* gallery image */}
      <div className={styles.gallery}>
        <img
          alt="image"
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8fDA%3D"
          className={styles.image1}
        />
        <img
          alt="image"
          src="https://plus.unsplash.com/premium_photo-1675745329954-9639d3b74bbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWx8ZW58MHx8MHx8fDA%3D"
          className={styles.image2}
        />
        <img
          alt="image"
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D"
          className={styles.image3}
        />
        <img
          alt="image"
          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8fDB8fHww"
          className={styles.image4}
        />
        <img
          alt="image"
          src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsfGVufDB8fDB8fHww"
          className={styles.image5}
        />
      </div>

      {/* tab */}
      <div className={styles.tab}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        <Button type="primary">Đặt ngay</Button>
      </div>

      {/* Booking */}
      <div className={styles.content}>
        {/* Description about hotel */}
        <div className={styles.description}>
          <h2 className={styles.name}>Cam Ranh Riviera Beach Resort & Spa</h2>
          <div className={styles.starContainer}>
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
          </div>

          <div className={styles.check}>
            <div className={styles.checkItem}>
              <CheckOutlined className={styles.star} />
              <p className={styles.checkTitle}>Hoàn tiền toàn bộ</p>
            </div>
            <div className={styles.checkItem}>
              <CheckOutlined className={styles.star} />
              <p className={styles.checkTitle}>Đặt ngay, thanh toán sau</p>
            </div>
          </div>

          {/* point */}
          <div className={styles.pointContainer}>
            <p className={styles.point}>8,8</p>
            <h3 className={styles.pointTitle}>Xuất sắc</h3>
          </div>
          <a href="" className={styles.resortLink}>
            Xem tất cả 123 nhận xét &gt;
          </a>

          {/* Information about this place */}
          <div className={styles.resortContainer}>
            <h2 className={styles.resortTitle}>Thông tin về nơi lưu trú này</h2>
            <p className={styles.resortDescription}>
              Resort trên bãi biển tại Cam Lâm với công viên nước miễn phí, spa
            </p>
            <ul className={styles.resortFeatures}>
              <li>🚐 Đưa đón sân bay</li>
              <li>🏋️‍♂️ Gym</li>
              <li>🏊‍♂️ Hồ bơi</li>
              <li>🚭 Không hút thuốc</li>
              <li>🍸 Bar</li>
              <li>💆 Spa</li>
            </ul>
            <a href="#" className={styles.resortLink}>
              Xem tất cả về nơi lưu trú này &gt;
            </a>
          </div>
        </div>
        {/* map */}
        <div className={styles.containerMap}>
          <h2 className={styles.titleMap}>Khám phá khu vực</h2>
          <div className={styles.cardMap}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.498351738144!2d105.52350832503093!3d21.012736680632578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2sFPT%20University!5e0!3m2!1sen!2s!4v1740818921172!5m2!1sen!2s"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            <div className={styles.infoMap}>
              <p>Bắc Bán đảo Cam Ranh, Nha Trang, Cam Lâm, Khánh Hòa</p>
              <a
                href="https://maps.app.goo.gl/N6USmDVRsBkocHNQ8"
                className={styles.linkMap}
              >
                Xem trong bản đồ
              </a>
            </div>
          </div>

          <ul className={styles.roomFeatures}>
            <li className={styles.greenText}>
              <CarOutlined /> Bãi đậu xe tự phục vụ miễn phí
            </li>
            <li style={{ color: "#3a3a3a" }}>
              <WifiOutlined /> Wifi miễn phí
            </li>
            <li style={{ color: "#3a3a3a" }}>
              <AppstoreOutlined /> 35 mét vuông
            </li>
            <li style={{ color: "#3a3a3a" }}>
              <UserOutlined /> 4 khách
            </li>
            <li style={{ color: "#3a3a3a" }}>
              <CheckOutlined /> Đặt ngay, thanh toán sau
            </li>
            <li style={{ color: "#3a3a3a" }}>
              <HomeOutlined /> 1 giường cỡ king
            </li>
            <li style={{ color: "#3a3a3a" }}>
              <AppstoreOutlined /> Quang cảnh biển
            </li>
          </ul>
        </div>
      </div>

      {/* View detail room */}
      <Button
        color="purple"
        variant="outlined"
        onClick={() => hanleViewDetail()}
      >
        View Detail
      </Button>

      {/* Detail date checkin-checkout */}
      <div className={styles.roomSelection}>
        <h2 className={styles.header}>Chọn phòng</h2>

        {/* Date selection */}
        <div className={styles.dateSelection}>
          <div className={styles.pickPerson}>
            <Space direction="vertical">
              <DatePicker onChange={onChangeDate} />
            </Space>
            <h4 className={styles.customerTitle}>Checkin</h4>
          </div>

          <div className={styles.pickPerson}>
            <Space direction="vertical">
              <DatePicker onChange={onChangeDate} />
            </Space>
            <h4 className={styles.customerTitle}>Checkout</h4>
          </div>

          <div className={styles.pickPerson}>
            <UserOutlined />
            <div className={styles.customer}>
              <h4 className={styles.customerTitle}>Khách</h4>
              <p className={styles.customerNumber}>2 khách, 1 phòng</p>
            </div>
          </div>
        </div>

        {/* Price info */}
        <div className={styles.price}>
          <div className={styles.priceInfo}>
            <div className={styles.priceHeader}>
              Giá thấp hơn mức thường thấy
            </div>
            <div className={styles.priceDetails}>
              Giá mỗi đêm trước thuế và phí thấp hơn mức giá chúng tôi ước tính
              cho nơi lưu trú tương tự.
            </div>
          </div>
          {/* Price Slider */}
          <div className={styles.priceSlider}>
            <Slider
              marks={marks}
              defaultValue={20}
              tooltip={{
                open: true,
                formatter: (value) => marks[value] || `${value} đ`, // Hiển thị giá trị từ marks
              }}
            />
          </div>
        </div>
      </div>

      {/* Overview */}
      <OverView />

      {/* disabled */}
      <Disabled />

      {/* Fees & Policies */}
      <FeesAndPolicy />

      {isModal && (
        <div className={styles.modalOverlay} onClick={() => setIsModal(false)}>
          <ModalDetails />
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
