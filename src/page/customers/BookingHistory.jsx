import { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Table,
  Button,
  Space,
  Modal,
  Empty,
  Skeleton,
  Avatar,
  Tabs,
  Badge,
  Input,
  message,
  Popconfirm,
  Tag,
} from "antd";
import {
  HistoryOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  SearchOutlined,
  HomeOutlined,
  EyeOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import styles from "../../static/css/BookingHistory.module.css";
import BookingService from "../../services/BookingService";
import ModalNotification from "../../components/cancelBooking/ModalNotification";
import ModalDetailBooking from "../../components/cancelBooking/ModalDetailBooking";
import {
  calculateNights,
  formatCurrency,
  formatDate,
} from "../../components/function/format";
import { showMessage } from "../../components/notification/Message";
const { Title, Text } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

const BookingHistory = () => {
  // const { userId } = useAppContext();
  const userId = "67d86459885b58e3b1695066";
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCancelBooking, setSelectedCancelBooking] = useState(null);
  const [returnAmount, setReturnAmount] = useState(0);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  // Mock data for bookings history
  // Simulate API call
  const fetchBookingByUser = async () => {
    try {
      const response = await BookingService.getBookingByUser(userId);

      if (response.status === 200) {
        // Map the new data structure to the existing state structure
        const mappedBookings = response.data.map((booking) => ({
          id: booking._id,
          code: booking.code,
          hotelName: booking.room_id.hotel_id.name,
          hotelAddress: booking.room_id.hotel_id.address,
          hotelImage: booking.room_id.hotel_id.images[0],
          roomId: booking.room_id._id,
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
          createdAt: booking.created_at,
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

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.hotelName.toLowerCase().includes(searchText.toLowerCase()) ||
      booking.roomType.toLowerCase().includes(searchText.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchText.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return booking.status === activeTab && matchesSearch;
  });

  const handleOK = (booking) => {
    // calculateRefund(booking);
    if (returnAmount > 0) {
      setIsCancelModalVisible(true);
      // cancelBookingConfirmed(booking, returnAmount);
      console.log("returnAmount", returnAmount);
      console.log("booking", booking);
    }
  };

  const handleCancelBooking = (booking) => {
    setSelectedCancelBooking(booking);
    if (booking.status === "pending") {
      cancelBookingPending(booking);
    } else if (booking.status === "confirmed") {
      // Show refund policy and confirmation modal
      // calculateRefund(booking);
      showRefundPolicyModal(booking);
    }
  };

  const showRefundPolicyModal = (booking) => {
    Modal.confirm({
      title: "Chính sách hoàn tiền",
      content: (
        <div>
          <p>Hủy trước 48 giờ: Hoàn lại 100% tiền đặt cọc</p>
          <p>Hủy trong 24-48 giờ: Hoàn lại 50% tiền đặt cọc</p>
          <p>Hủy trong vòng 24h trước ngày checkin: Không hoàn tiền</p>
          <p>Bạn có chắc chắn muốn hủy đặt phòng này không?</p>
        </div>
      ),
      onOk: () => {
        calculateRefund(booking);
        // handleOK(booking); // Đảm bảo refund đã được tính toán xong trước khi mở ModalNotification
      },
    });
  };

  const calculateRefund = (booking) => {
    console.log("checkIn booking", booking.checkIn);
    console.log("checkOut booking", booking.checkOut);
    const now = new Date();
    const checkInDate = new Date(booking.checkIn);
    const hoursBeforeCheckIn = (checkInDate - now) / (1000 * 60 * 60);

    console.log("hoursBeforeCheckIn", hoursBeforeCheckIn);
    let refundAmount = 0;

    if (hoursBeforeCheckIn > 48) {
      refundAmount = booking.totalAmount;
    } else if (hoursBeforeCheckIn >= 24) {
      refundAmount = booking.totalAmount * 0.5;
    }

    setReturnAmount(refundAmount);
    if (refundAmount > 0) {
      cancelBookingConfirmed(booking, refundAmount);
      setIsCancelModalVisible(true);
    } else {
      console.log("refundAmount is not greater than 0", refundAmount);
    }
    // // Proceed with cancellation and refund
  };

  const cancelBookingPending = async (booking) => {
    try {
      const response = await BookingService.updateBookingStatus(
        booking.id,
        "cancelled"
      );

      if (response.status === 200) {
        showMessage("success", "Hủy đặt phòng thành công", messageApi);
        fetchBookingByUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBookingConfirmed = async (booking, refundAmount) => {
    try {
      const response = await BookingService.cancelBooking({
        booking,
        refundAmount,
      });
      if (response.status === 200) {
        showMessage(
          "success",
          `Hủy đặt phòng mã ${booking.code} với số tiền hoàn trả ${refundAmount}`,
          messageApi
        );
        fetchBookingByUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusTag = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Đã thanh toán
          </Tag>
        );
      case "pending":
        return (
          <Tag icon={<ClockCircleOutlined />} color="processing">
            Chưa thanh toán
          </Tag>
        );
      case "cancelled":
        return (
          <Tag icon={<CloseCircleOutlined />} color="red">
            Đã hủy
          </Tag>
        );
      case "refunded":
        return (
          <Tag icon={<CheckCircleOutlined />} color="blue">
            Đã hoàn tiền
          </Tag>
        );
      default:
        return null;
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
      {contextHolder}
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
                  count={bookings.filter((b) => b.status === "pending").length}
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
                  Đã thanh toán
                </span>
              }
              key="confirmed"
            />
            <TabPane
              tab={
                <span>
                  <ClockCircleOutlined />
                  Chưa thanh toán
                </span>
              }
              key="pending"
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
          <ModalDetailBooking
            selectedBooking={selectedBooking}
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
            handleCancelBooking={handleCancelBooking}
          />
        )}

        {selectedCancelBooking && (
          <ModalNotification
            isCancelModalVisible={isCancelModalVisible}
            setSelectedCancelBooking={setSelectedCancelBooking}
            selectedCancelBooking={selectedCancelBooking}
          />
        )}
      </Content>
    </Layout>
  );
};

export default BookingHistory;
