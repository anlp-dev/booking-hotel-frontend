import {
  CreditCardOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Descriptions, Modal, Typography } from "antd";
import styles from "../../static/css/BookingHistory.module.css";

const { Text } = Typography;
const ModalNotification = ({
  isCancelModalVisible,
  setSelectedCancelBooking,
  selectedCancelBooking,
}) => {
  return (
    <Modal
      title="Thông tin hoàn tiền"
      open={isCancelModalVisible}
      // onOk={() => setSelectedCancelBooking(false)}
      footer={[
        <Button key="submit" onClick={() => setSelectedCancelBooking(false)}>
          Tôi hiểu rồi
        </Button>,
      ]}
      style={{ width: "800px", margin: "0 auto" }}
    >
      <div>
        <p>Bạn đã hủy đặt phòng thành công.</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <Card
            title="Thông tin khách hàng"
            bordered={false}
            className={styles.detailCard}
          >
            <Descriptions column={1}>
              <Descriptions.Item label="Họ tên">
                <UserOutlined /> {selectedCancelBooking.customerName}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <MailOutlined /> {selectedCancelBooking.email}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                <PhoneOutlined /> {selectedCancelBooking.phone}
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
                <CreditCardOutlined /> {selectedCancelBooking.paymentMethod}
              </Descriptions.Item>
              <Descriptions.Item label="Mã thanh toán">
                {selectedCancelBooking.paymentId}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày đặt phòng">
                {formatDate(selectedCancelBooking.bookingDate)}
              </Descriptions.Item>
            </Descriptions>

            <div className={styles.totalAmount}>
              <Text>Tổng tiền:</Text>
              <Text strong className={styles.amountValue}>
                {formatCurrency(selectedCancelBooking.totalAmount)}
              </Text>
            </div>
          </Card>
        </div>

        <br />
        <div>
          <p>
            Tiền bạn đặt cọc sẽ được hoàn vào tài khoản bạn dùng để thanh toán
            khi cọc.
          </p>

          <p>
            {" "}
            Chúng tôi đã gửi mail xác nhận hủy phòng và thông tin hủy phòng đến
            email của bạn. Vui lòng kiểm tra mail để biết thêm chi tiết.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalNotification;
