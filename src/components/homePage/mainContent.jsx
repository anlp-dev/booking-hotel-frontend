import { useState } from "react";
import {
  Layout,
  Button,
  Typography,
  Card,
  Row,
  Col,
  Carousel,
  Tabs,
  Space,
} from "antd";
import {
  RightOutlined,
  GiftOutlined,
  TagOutlined,
  ScheduleOutlined,
  HomeOutlined,
  BankOutlined,
} from "@ant-design/icons";
import "../../static/css/styles.css";
import { Popover, InputNumber } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Uncomment and use this data for the carousel
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

// Accommodation types data
const accommodationTypes = [
  {
    id: 1,
    img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/624608378.jpg?k=d1b48b5c6f96884d97b31b7582fe3c0f15c4dff3228c23754a1ae828cc0d8e0c&o=&hp=1",
    title: "Resort",
    icon: <BankOutlined />,
  },
  {
    id: 2,
    img: "https://www.hotelescenter.es/wp-content/blogs.dir/1601/files/home//header-home-mb.jpg",
    title: "Khách sạn",
    icon: <HomeOutlined />,
  },
  {
    id: 3,
    img: "https://pro-static.h10hotels.com/gallery/T2D3/07_OCSHotel7.jpg",
    title: "Căn hộ",
    icon: <BankOutlined />,
  },
  {
    id: 4,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoWnQ76KGgDhoCCgWvQ6wbre_FUi8_kDnkzA&s",
    title: "Biệt thự",
    icon: <HomeOutlined />,
  },
  {
    id: 5,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7ALU4st0khcyisgNPy1E7ghXitdDJ-fRJGA&s",
    title: "Nhà nghỉ B&B",
    icon: <HomeOutlined />,
  },
  {
    id: 6,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7ALU4st0khcyisgNPy1E7ghXitdDJ-fRJGA&s",
    title: "Nhà nghỉ B&B",
    icon: <HomeOutlined />,
  },
  {
    id: 7,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7ALU4st0khcyisgNPy1E7ghXitdDJ-fRJGA&s",
    title: "Nhà nghỉ B&B",
    icon: <HomeOutlined />,
  },
  {
    id: 8,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7ALU4st0khcyisgNPy1E7ghXitdDJ-fRJGA&s",
    title: "Nhà nghỉ B&B",
    icon: <HomeOutlined />,
  },
];

function MainContent() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const content = (
    <div style={{ width: 280 }}>
      <Typography.Title level={5}>Phòng 1</Typography.Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Người lớn</span>
          <InputNumber
            min={1}
            max={10}
            value={adults}
            onChange={(value) => setAdults(value)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Trẻ em</span>
          <InputNumber
            min={0}
            max={10}
            value={children}
            onChange={(value) => setChildren(value)}
          />
        </div>
        <Button type="link">Thêm phòng khác</Button>
        <Button type="primary" block>
          {" "}
          Xong{" "}
        </Button>
      </Space>
    </div>
  );

  return (
    <Content
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 16px",
        paddingTop: "20px",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          marginBottom: "48px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src="https://forever.travel-assets.com/flex/flexmanager/images/2025/01/28/PD2_00227_HCOM_ICA_DUBAI_BAB_AL_SHAMS_0771.jpg?impolicy=fcrop&w=1200&h=675&q=mediumHigh"
          alt="Beach destination"
          style={{ width: "100%", height: "470px", objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // textAlign: "center",
            width: "100%",
            maxWidth: "800px",
            padding: "0 24px",
          }}
        >
          <Title
            level={1}
            style={{
              color: "white",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              marginBottom: "32px",
            }}
          >
            Chốn dừng chân lý tưởng chờ đón bạn
          </Title>

          <Card
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "16px",
            }}
          >
            <Tabs
              defaultActiveKey="1"
              centered
              style={{ marginBottom: "24px" }}
            >
              <TabPane tab="Chỗ Ở Qua Đêm" key="1" />
              <TabPane tab="Chỗ Ở Trong Ngày" key="2" />
            </Tabs>

            <Space
              direction="vertical"
              size={13}
              style={{ paddingRight: "35px" }}
            >
              <RangePicker
                className="custom-range-picker"
                lassName="custom-range-picker"
                style={{
                  width: "300px",
                  borderColor: "black",
                  height: "48px",
                  color: "black",
                  "--antd-wave-shadow-color": "red",
                }}
                disabledDate={disabledDate}
                placeholder={["Ngày nhận phòng", "Ngày trả phòng"]}
              />
            </Space>

            <Popover content={content} title="Khách" trigger="click">
              <Button
                style={{
                  width: "210px",
                  borderColor: "black",
                  height: "48px",
                  color: "black",
                }}
                icon={<UserOutlined />}
              >
                {adults} khách, 1 phòng
              </Button>
            </Popover>

            <Button
              type="primary"
              style={{
                marginTop: "16px",
                height: "48px",
                fontSize: "16px",
                marginLeft: "35px",
                borderRadius: "30px",
              }}
            >
              Tìm kiếm
            </Button>
          </Card>
        </div>
      </div>

      {/* Membership Banner */}
      <Card
        style={{
          marginBottom: "48px",
          background: "#191E3B",
          borderRadius: "10px",
        }}
      >
        <Row align="middle" gutter={15}>
          <Col xs={24} md={3} style={{ textAlign: "center" }}>
            <img
              src="https://a.travel-assets.com/egds/marks/mod_hotels.svg"
              alt="Hotels logo"
              style={{ height: "64px" }}
            />
          </Col>
          <Col xs={24} md={16}>
            <Text style={{ color: "white", fontSize: "18px" }}>
              Thành viên tiết kiệm 10% trở lên tại hơn 100.000 khách sạn trên
              toàn thế giới khi đăng nhập
            </Text>
          </Col>
          <Col xs={24} md={5} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              ghost
              style={{
                color: "white",
                backgroundColor: "#1668E3",
                borderRadius: "18px",
              }}
              size="large"
            >
              Đăng nhập ngay
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Features Section */}
      <div style={{ marginBottom: "48px", textAlign: "center" }}>
        <Title level={2} style={{ marginBottom: "32px" }}>
          Tìm và đặt nơi lưu trú hoàn hảo
        </Title>

        <Row gutter={[32, 24]} justify="center">
          <Col xs={24} md={8}>
            <Card hoverable style={{ height: "100%", borderRadius: "8px" }}>
              <GiftOutlined
                style={{
                  fontSize: "48px",
                  color: "#A1122C",
                  marginBottom: "16px",
                }}
              />
              <Paragraph style={{ fontSize: "16px" }}>
                Nhận phần thưởng cho mỗi đêm bạn lưu trú
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card hoverable style={{ height: "100%", borderRadius: "8px" }}>
              <TagOutlined
                style={{
                  fontSize: "48px",
                  color: "#A1122C",
                  marginBottom: "16px",
                }}
              />
              <Paragraph style={{ fontSize: "16px" }}>
                Tiết kiệm hơn với Giá thành viên
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card hoverable style={{ height: "100%", borderRadius: "8px" }}>
              <ScheduleOutlined
                style={{
                  fontSize: "48px",
                  color: "#A1122C",
                  marginBottom: "16px",
                }}
              />
              <Paragraph style={{ fontSize: "16px" }}>
                Lựa chọn hủy miễn phí nếu đổi kế hoạch
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Preferred Accommodation Section */}
      <div style={{ marginBottom: "48px" }}>
        <Title level={2} style={{ marginBottom: "24px" }}>
          Tìm cho mình nơi lưu trú yêu thích tiếp theo
        </Title>
        
        <Carousel
          dots={false}
          arrows
          infinite
          slidesToShow={5}
          slidesToScroll={5}
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
          ]}
          
        >
          {accommodationTypes.map((item) => (
            <div key={item.id} style={{ padding: "10px" }}>
              <Card style={{marginLeft: "10px"}}
                hoverable
                cover={
                  <div style={{ height: "210px", overflow: "hidden" }}>
                    <img
                      alt={item.title}
                      src={item.img}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px", 
                      }}
                    />
                  </div>
                }
              
                bodyStyle={{ padding: "12px", textAlign: "center"}}
              >
                <Space direction="vertical" size={4} style={{ width: "100%" }}>
                  {item.icon}
                  <Text strong>{item.title}</Text>
                </Space>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Promotions Section */}
      <div style={{ marginBottom: "48px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Title level={2} style={{ margin: 0 }}>
            Chương trình khuyến mại chỗ ở
          </Title>
          <Button type="link" icon={<RightOutlined />}>
            Xem tất cả
          </Button>
        </div>

        <Carousel autoplay arrows dots>
          <div>
            <Row gutter={16}>
              {promotions.slice(0, 3).map((promo) => (
                <Col span={8} key={promo.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={promo.title}
                        src={promo.img}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    }
                  >
                    <Card.Meta title={promo.title} />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <div>
            <Row gutter={16}>
              {promotions.slice(1, 4).map((promo) => (
                <Col span={8} key={promo.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={promo.title}
                        src={promo.img}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    }
                  >
                    <Card.Meta title={promo.title} />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Carousel>
      </div>
    </Content>
  );
}

export default MainContent;
