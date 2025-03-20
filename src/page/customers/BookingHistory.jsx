import { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Descriptions,
  Divider,
  Empty,
  Skeleton,
  Avatar,
  Row,
  Col,
  Timeline,
  Tabs,
  Rate,
  Badge,
  Image,
  Statistic,
  Input,
  message,
} from "antd";
import {
  HistoryOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  CreditCardOutlined,
  PhoneOutlined,
  SearchOutlined,
  StarOutlined,
  HomeOutlined,
  PrinterOutlined,
  FileTextOutlined,
  MailOutlined,
  EyeOutlined,
  FilterOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BookingService from "../../services/BookingService";

import styles from "../../static/css/BookingHistory.module.css";
import { jwtDecode } from "jwt-decode";

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

const BookingHistory = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  // Fetch real bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token)
        
        console.log(decoded.userId)
        const response = await BookingService.getUserBookings(decoded.userId);
        
        if (response.success) {
          setBookings(response.data);
        } else {
          message.error("Không thể tải lịch sử đặt phòng: " + response.message);
        }
      } catch (error) {
        console.error("Error fetching booking history:", error);
        message.error("Không thể tải lịch sử đặt phòng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const showModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancelBooking = (bookingId) => {
    navigate(`/booking-cancel-refund/${bookingId}`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const getStatusTag = (status) => {
    switch (status) {
      case "pending":
        return <Tag icon={<ClockCircleOutlined />} color="orange">Chờ xác nhận</Tag>;
      case "confirmed":
        return <Tag icon={<CheckCircleOutlined />} color="green">Đã xác nhận</Tag>;
      case "cancelled":
        return <Tag icon={<CloseCircleOutlined />} color="red">Đã hủy</Tag>;
      case "refunded":
        return <Tag icon={<CheckCircleOutlined />} color="blue">Đã hoàn tiền</Tag>;
      default:
        return null;
    }
  };

  const calculateNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.hotel_name.toLowerCase().includes(searchText.toLowerCase()) ||
      booking.room_type.toLowerCase().includes(searchText.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchText.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return booking.status === activeTab && matchesSearch;
  });

  const handleViewRefundStatus = (refundId) => {
    navigate(`/refund-status/${refundId}`);
  };

  const columns = [
    {
      title: "Khách sạn",
      dataIndex: "hotel_name",
      key: "hotel_name",
      render: (text, record) => (
        <div className={styles.hotelCell}>
          <Avatar
            src={record.hotel_image}
            size={64}
            shape="square"
            className={styles.hotelAvatar}
          />
          <div className={styles.hotelInfo}>
            <Text strong>{text}</Text>
            <div className={styles.hotelMeta}>
              <Text type="secondary">
                <EnvironmentOutlined /> {record.hotel_address}
              </Text>
            </div>
            <div>
              <Text type="secondary">
                <HomeOutlined /> {record.room_type}
              </Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "check_in",
      key: "check_in",
      render: (text, record) => (
        <div className={styles.dateInfo}>
          <div>
            <CalendarOutlined /> Check-in: {formatDate(record.check_in)}
          </div>
          <div>
            <CalendarOutlined /> Check-out: {formatDate(record.check_out)}
          </div>
          <div>
            <ClockCircleOutlined />{" "}
            {calculateNights(record.check_in, record.check_out)} đêm
          </div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Hoàn tiền",
      dataIndex: "refund_status",
      key: "refund_status",
      render: (refundStatus, record) => {
        if (record.status !== "cancelled" && record.status !== "refunded") {
          return <Text type="secondary">N/A</Text>;
        }
        
        if (!refundStatus) {
          return <Text type="secondary">Không hoàn tiền</Text>;
        }
        
        let color, icon, text;
        switch (refundStatus) {
          case "pending":
            color = "blue";
            icon = <ClockCircleOutlined />;
            text = "Đang chờ xử lý";
            break;
          case "processing":
            color = "orange";
            icon = <ExclamationCircleOutlined />;
            text = "Đang xử lý";
            break;
          case "completed":
            color = "success";
            icon = <CheckCircleOutlined />;
            text = "Đã hoàn thành";
            break;
          case "failed":
            color = "error";
            icon = <CloseCircleOutlined />;
            text = "Thất bại";
            break;
          default:
            color = "default";
            icon = <InfoCircleOutlined />;
            text = "Không xác định";
        }
        
        return (
          <Space direction="vertical">
            <Tag icon={icon} color={color}>
              {text}
            </Tag>
            {refundStatus && record.refund_id && (
              <Button 
                type="link" 
                size="small"
                icon={<EyeOutlined />}
                onClick={() => handleViewRefundStatus(record.refund_id)}
              >
                Xem chi tiết
              </Button>
            )}
          </Space>
        );
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_price",
      key: "total_price",
      render: (amount) => (
        <Text strong className={styles.amount}>
          {formatCurrency(amount)}
        </Text>
      ),
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating) =>
        rating ? (
          <Rate disabled defaultValue={rating} allowHalf />
        ) : (
          <Text type="secondary">Chưa đánh giá</Text>
        ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => showModal(record)}
            className={styles.viewButton}
          >
            Chi tiết
          </Button>
          
          {record.status === "upcoming" && (
            <Button
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => handleCancelBooking(record.id)}
            >
              Hủy đặt phòng
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <div className={styles.pageHeader}>
          <div className={styles.titleSection}>
            <HistoryOutlined className={styles.headerIcon} />
            <Title level={2}>Lịch sử đặt phòng</Title>
          </div>
          <div className={styles.searchSection}>
            <Input
              placeholder="Tìm kiếm theo tên khách sạn, loại phòng, mã đặt phòng..."
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchText(e.target.value)}
              className={styles.searchInput}
              allowClear
            />
          </div>
        </div>

        <Card className={styles.card}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className={styles.tabs}
            tabBarExtraContent={
              <div className={styles.tabExtra}>
                <Badge
                  count={bookings.filter((b) => b.status === "upcoming").length}
                  offset={[-5, 5]}
                >
                  <Button icon={<FilterOutlined />}>Lọc</Button>
                </Badge>
              </div>
            }
          >
            <TabPane
              tab={
                <span>
                  <HistoryOutlined />
                  Tất cả
                </span>
              }
              key="all"
            />
            <TabPane
              tab={
                <span>
                  <CheckCircleOutlined />
                  Đã hoàn thành
                </span>
              }
              key="completed"
            />
            <TabPane
              tab={
                <span>
                  <ClockCircleOutlined />
                  Sắp tới
                </span>
              }
              key="upcoming"
            />
            <TabPane
              tab={
                <span>
                  <CloseCircleOutlined />
                  Đã hủy
                </span>
              }
              key="cancelled"
            />
          </Tabs>

          {loading ? (
            <div className={styles.loadingContainer}>
              <Skeleton active avatar paragraph={{ rows: 4 }} />
              <Skeleton active avatar paragraph={{ rows: 4 }} />
              <Skeleton active avatar paragraph={{ rows: 4 }} />
            </div>
          ) : filteredBookings.length > 0 ? (
            <Table
              dataSource={filteredBookings}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              className={styles.table}
            />
          ) : (
            <Empty
              description="Không tìm thấy lịch sử đặt phòng nào"
              className={styles.empty}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </Card>

        {selectedBooking && (
          <Modal
            title={
              <div className={styles.modalTitle}>
                <HistoryOutlined className={styles.modalTitleIcon} />
                Chi tiết đặt phòng
              </div>
            }
            open={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Đóng
              </Button>,
              selectedBooking.status === "upcoming" && (
                <Button key="cancel" danger onClick={() => handleCancelBooking(selectedBooking.id)}>
                  Hủy đặt phòng
                </Button>
              ),
              <Button
                key="print"
                icon={<PrinterOutlined />}
                onClick={() => window.print()}
              >
                In hóa đơn
              </Button>,
              selectedBooking.status === "completed" &&
                !selectedBooking.review && (
                  <Button key="review" type="primary" icon={<StarOutlined />}>
                    Đánh giá
                  </Button>
                ),
            ]}
            width={800}
            className={styles.detailModal}
          >
            <div className={styles.bookingId}>
              <FileTextOutlined /> Mã đặt phòng:{" "}
              <Text strong>{selectedBooking.id}</Text>
            </div>

            <div className={styles.hotelDetailHeader}>
              <Image
                src={selectedBooking.hotel_image}
                alt={selectedBooking.hotel_name}
                className={styles.hotelDetailImage}
                width={200}
              />
              <div className={styles.hotelDetailInfo}>
                <Title level={4}>{selectedBooking.hotel_name}</Title>
                <Text>
                  <EnvironmentOutlined /> {selectedBooking.hotel_address}
                </Text>
                <div className={styles.statusContainer}>
                  {getStatusTag(selectedBooking.status)}
                </div>
              </div>
            </div>

            <Divider />

            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card
                  title="Thông tin đặt phòng"
                  bordered={false}
                  className={styles.detailCard}
                >
                  <div className={styles.roomImageContainer}>
                    <Image
                      src={selectedBooking.room_image}
                      alt={selectedBooking.room_type}
                      className={styles.roomDetailImage}
                    />
                    <Badge.Ribbon
                      text={selectedBooking.room_type}
                      color="blue"
                    />
                  </div>

                  <Timeline
                    className={styles.timeline}
                    items={[
                      {
                        color: "green",
                        children: (
                          <>
                            <Text strong>Check-in:</Text>{" "}
                            {formatDate(selectedBooking.check_in)}
                          </>
                        ),
                        dot: <CalendarOutlined />,
                      },
                      {
                        color: "red",
                        children: (
                          <>
                            <Text strong>Check-out:</Text>{" "}
                            {formatDate(selectedBooking.check_out)}
                          </>
                        ),
                        dot: <CalendarOutlined />,
                      },
                    ]}
                  />

                  <Row gutter={16} className={styles.statsRow}>
                    <Col span={12}>
                      <Statistic
                        title="Số đêm"
                        value={calculateNights(
                          selectedBooking.check_in,
                          selectedBooking.check_out
                        )}
                        suffix="đêm"
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Số khách"
                        value={selectedBooking.guests}
                        suffix="người"
                      />
                    </Col>
                  </Row>

                  <Divider />

                  <div className={styles.amenitiesSection}>
                    <Text strong>Tiện nghi phòng:</Text>
                    <div className={styles.amenitiesTags}>
                      {selectedBooking.amenities.map((amenity, index) => (
                        <Tag key={index} color="blue">
                          {amenity}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card
                  title="Thông tin khách hàng"
                  bordered={false}
                  className={styles.detailCard}
                >
                  <Descriptions column={1}>
                    <Descriptions.Item label="Họ tên">
                      <UserOutlined /> {selectedBooking.customer_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      <MailOutlined /> {selectedBooking.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">
                      <PhoneOutlined /> {selectedBooking.phone}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  title="Thông tin thanh toán"
                  bordered={false}
                  className={styles.detailCard}
                >
                  <Descriptions column={1}>
                    <Descriptions.Item label="Phương thức thanh toán">
                      <CreditCardOutlined /> {selectedBooking.payment_method}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mã thanh toán">
                      {selectedBooking.payment_id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày đặt phòng">
                      {formatDate(selectedBooking.booking_date)}
                    </Descriptions.Item>
                  </Descriptions>

                  <div className={styles.totalAmount}>
                    <Text>Tổng tiền:</Text>
                    <Text strong className={styles.amountValue}>
                      {formatCurrency(selectedBooking.total_price)}
                    </Text>
                  </div>
                </Card>

                {selectedBooking.review && (
                  <Card
                    title="Đánh giá của bạn"
                    bordered={false}
                    className={styles.detailCard}
                  >
                    <Rate
                      disabled
                      defaultValue={selectedBooking.rating}
                      allowHalf
                    />
                    <Paragraph className={styles.reviewText}>
                      {selectedBooking.review}
                    </Paragraph>
                  </Card>
                )}
              </Col>
            </Row>
          </Modal>
        )}
      </Content>
    </Layout>
  );
};

export default BookingHistory;
