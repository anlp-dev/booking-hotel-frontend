import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CreditCardOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  HistoryOutlined,
  MailOutlined,
  PhoneOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Image,
  Modal,
  Rate,
  Row,
  Statistic,
  Tag,
  Timeline,
} from "antd";
import { Typography } from "antd";
import styles from "../../static/css/BookingHistory.module.css";
import {
  calculateNights,
  formatCurrency,
  formatDate,
} from "../function/format";
const { Title, Text, Paragraph } = Typography;

const ModalDetailBooking = ({
  isModalVisible,
  handleCancel,
  selectedBooking,
  handleCancelBooking,
}) => {
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
  return (
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
          <Button
            key="cancel"
            danger
            onClick={() => handleCancelBooking(selectedBooking.id)}
          >
            Hủy đặt phòng
          </Button>
        ),
        selectedBooking.status === "completed" && !selectedBooking.review && (
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
              <Badge.Ribbon text={selectedBooking.roomType} color="blue" />
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
              <Rate disabled defaultValue={selectedBooking.rating} allowHalf />
              <Paragraph className={styles.reviewText}>
                {selectedBooking.review}
              </Paragraph>
            </Card>
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalDetailBooking;
