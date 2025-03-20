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
  Popconfirm,
  Alert,
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
  FileTextOutlined,
  MailOutlined,
  EyeOutlined,
  FilterOutlined,
} from "@ant-design/icons";

import styles from "../../static/css/BookingHistory.module.css";
import BookingService from "../../services/BookingService";

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

const BookingHistory = () => {
  // const { userId } = useAppContext();
  const userId = "67d86459885b58e3b1695066";
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for bookings history
  // Simulate API call
  const fetchBookingByUser = async () => {
    try {
      const response = await BookingService.getBookingByUser(userId);
      console.log("response booking", response);
      if (response.status === 200) {
        // Map the new data structure to the existing state structure
        const mappedBookings = response.data.map((booking) => ({
          id: booking._id,
          code: booking.code,
          hotelName: booking.room_id.hotel_id.name,
          hotelAddress: booking.room_id.hotel_id.address,
          hotelImage: booking.room_id.hotel_id.images[0],
          roomType: booking.room_id.type,
          roomImage: booking.room_id.images[0],
          checkIn: booking.check_in,
          checkOut: booking.check_out,
          guests: booking.room_id.capacity,
          status: booking.status,
          totalAmount: booking.total_price,
          paymentMethod: booking.payment_method || "vnpayqr",
          paymentId: booking.payment_id || "N/A",
          bookingDate: booking.created_at,
          rating: booking.room_id.hotel_id.rating || null,
          review: booking.review || null,
          amenities: booking.room_id.facility_id.map(
            (facility) => facility.name
          ),
          customerName: booking.user_id.username,
          email: booking.user_id.email,
          phone: booking.user_id.phone || "",
        }));
        setBookings(mappedBookings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBookingByUser();
      setLoading(false);
    }
  }, []);

  const showModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      case "confirmed":
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Đã hoàn thành
          </Tag>
        );
      case "pending":
        return (
          <Tag icon={<ClockCircleOutlined />} color="processing">
            Sắp tới
          </Tag>
        );
      case "cancelled":
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Đã hủy
          </Tag>
        );
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  const calculateNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.hotelName.toLowerCase().includes(searchText.toLowerCase()) ||
      booking.roomType.toLowerCase().includes(searchText.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchText.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return booking.status === activeTab && matchesSearch;
  });

  const handleCancelBooking = (booking) => {
    console.log("booking", booking);
    if (booking.status === "pending") {
      // Directly cancel the booking
      cancelBooking(booking);
    } else if (booking.status === "confirmed") {
      // Show refund policy and confirmation modal
      showRefundPolicyModal(booking);
    }
  };

  const showRefundPolicyModal = (booking) => {
    Modal.confirm({
      title: "Chính sách hoàn tiền",
      content: (
        <div>
          <p>Hủy trước 24 giờ: Hoàn lại 100% tiền đặt cọc</p>
          <p>Hủy trong 24-48 giờ: Hoàn lại 50% tiền đặt cọc</p>
          <p>Hủy sau 48h: Không hoàn tiền</p>
          <p>Bạn có chắc chắn muốn hủy đặt phòng này không?</p>
        </div>
      ),
      onOk() {
        calculateRefund(booking);
      },
    });
  };

  const calculateRefund = (booking) => {
    const now = new Date();
    const checkInDate = new Date(booking.checkIn);
    const hoursBeforeCheckIn = (checkInDate - now) / (1000 * 60 * 60);
    let refundAmount = 0;

    if (hoursBeforeCheckIn > 48) {
      refundAmount = booking.totalAmount;
    } else if (hoursBeforeCheckIn >= 24) {
      refundAmount = booking.totalAmount * 0.5;
    }

    // Proceed with cancellation and refund
    cancelBooking(booking, refundAmount);
  };

  const cancelBooking = async (booking, refundAmount = 0) => {
    try {
      const response = await BookingService.updateBooking(booking._id, {
        status: "cancelled",
      });
      console.log("response cancel booking", response);
      if (response.status === 200) {
        <Alert
          message="Hủy Phòng Thành Công"
          description={`Hủy đặt phòng mã ${booking.code} với số tiền hoàn trả ${refundAmount}`}
          type="success"
          showIcon
        />;
        fetchBookingByUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Khách sạn",
      dataIndex: "hotelName",
      key: "hotelName",
      render: (text, record) => (
        <div className={styles.hotelCell}>
          <Avatar
            src={record.hotelImage}
            size={64}
            shape="square"
            className={styles.hotelAvatar}
          />
          <div className={styles.hotelInfo}>
            <Text strong>{text}</Text>
            <div className={styles.hotelMeta}>
              <Text type="secondary">
                <EnvironmentOutlined /> {record.hotelAddress}
              </Text>
            </div>
            <div>
              <Text type="secondary">
                <HomeOutlined /> {record.roomType}
              </Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (text, record) => (
        <div className={styles.dateInfo}>
          <div>
            <CalendarOutlined /> Check-in: {formatDate(record.checkIn)}
          </div>
          <div>
            <CalendarOutlined /> Check-out: {formatDate(record.checkOut)}
          </div>
          <div>
            <ClockCircleOutlined />{" "}
            {calculateNights(record.checkIn, record.checkOut)} đêm
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
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => (
        <Text strong className={styles.amount}>
          {formatCurrency(amount)}
        </Text>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      render: (note) => (
        <Text className={styles.dateInfo}>
          {note ? note : "Không có ghi chú"}
        </Text>
      ),
    },
    // {
    //   title: "Đánh giá",
    //   dataIndex: "rating",
    //   key: "rating",
    //   render: (rating) =>
    //     rating ? (
    //       <Rate disabled defaultValue={rating} allowHalf />
    //     ) : (
    //       <Text type="secondary">Chưa đánh giá</Text>
    //     ),
    // },
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
          {(record.status === "pending" || record.status === "confirmed") && (
            <Popconfirm
              title="Hủy đặt phòng"
              description="Bạn có chắc chắn muốn hủy đặt phòng này không?"
              onConfirm={() => handleCancelBooking(record)}
              onCancel={() => message.error("Click on No")}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger ghost>
                Hủy
              </Button>
            </Popconfirm>
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
                <Button key="cancel" danger>
                  Hủy đặt phòng
                </Button>
              ),
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
                src={selectedBooking.hotelImage}
                alt={selectedBooking.hotelName}
                className={styles.hotelDetailImage}
                width={200}
              />
              <div className={styles.hotelDetailInfo}>
                <Title level={4}>{selectedBooking.hotelName}</Title>
                <Text>
                  <EnvironmentOutlined /> {selectedBooking.hotelAddress}
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
                      src={selectedBooking.roomImage}
                      alt={selectedBooking.roomType}
                      className={styles.roomDetailImage}
                    />
                    <Badge.Ribbon
                      text={selectedBooking.roomType}
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
                            {formatDate(selectedBooking.checkIn)}
                          </>
                        ),
                        dot: <CalendarOutlined />,
                      },
                      {
                        color: "red",
                        children: (
                          <>
                            <Text strong>Check-out:</Text>{" "}
                            {formatDate(selectedBooking.checkOut)}
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
                          selectedBooking.checkIn,
                          selectedBooking.checkOut
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
                      <UserOutlined /> {selectedBooking.customerName}
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
                      <CreditCardOutlined /> {selectedBooking.paymentMethod}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mã thanh toán">
                      {selectedBooking.paymentId}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày đặt phòng">
                      {formatDate(selectedBooking.bookingDate)}
                    </Descriptions.Item>
                  </Descriptions>

                  <div className={styles.totalAmount}>
                    <Text>Tổng tiền:</Text>
                    <Text strong className={styles.amountValue}>
                      {formatCurrency(selectedBooking.totalAmount)}
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
