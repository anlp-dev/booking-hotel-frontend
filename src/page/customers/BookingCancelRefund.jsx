import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Steps,
  Button,
  Form,
  Input,
  Radio,
  Checkbox,
  Alert,
  Divider,
  Space,
  Row,
  Col,
  Descriptions,
  Spin,
  Modal,
  Result,
  Tag,
  Timeline,
  Image,
  Statistic,
  Table,
  message,
} from "antd";
import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  DollarOutlined,
  CalendarOutlined,
  HomeOutlined,
  BankOutlined,
  CreditCardOutlined,
  WalletOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../static/css/BookingCancelRefund.module.css";
import BookingService from "../../services/BookingService";

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;
const { Step } = Steps;

const BookingCancelRefund = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);
  const [refundMethod, setRefundMethod] = useState("original");
  const [reason, setReason] = useState("");
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [refundAmount, setRefundAmount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Mock cancellation policy
  const cancellationPolicy = [
    {
      timeframe: "Hơn 7 ngày trước ngày check-in",
      refundPercentage: 80,
      description: "Hoàn trả 80% tổng số tiền đã thanh toán",
    },
    {
      timeframe: "3-7 ngày trước ngày check-in",
      refundPercentage: 50,
      description: "Hoàn trả 50% tổng số tiền đã thanh toán",
    },
    {
      timeframe: "Dưới 3 ngày trước ngày check-in",
      refundPercentage: 0,
      description: "Không được hoàn trả",
    },
  ];

  // Fetch booking data with real API integration
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch booking details
        const bookingDetails = await BookingService.getBookingById(bookingId);
        
        if (!bookingDetails.success) {
          throw new Error(bookingDetails.message || "Không thể tải thông tin đặt phòng");
        }
        
        const booking = bookingDetails.data;
        setBookingData(booking);
        
        // Calculate refund amount based on cancellation policy
        const today = new Date();
        const checkInDate = new Date(booking.check_in);
        const daysUntilCheckin = Math.ceil(
          (checkInDate - today) / (1000 * 60 * 60 * 24)
        );

        let refundPercentage = 0;
        if (daysUntilCheckin > 7) {
          refundPercentage = 80;
        } else if (daysUntilCheckin >= 3) {
          refundPercentage = 50;
        }

        setRefundAmount((booking.total_price * refundPercentage) / 100);
      } catch (error) {
        console.error("Error fetching booking data:", error);
        setError("Không thể tải thông tin đặt phòng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBookingDetails();
    } else {
      setError("Mã đặt phòng không hợp lệ");
      setLoading(false);
    }
  }, [bookingId]);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const showConfirmModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirmCancellation = async () => {
    setLoading(true);
    try {
      // Cancel booking
      const cancelResult = await BookingService.cancelBooking({
        booking_id: bookingData.id,
        reason: reason
      });
      
      if (!cancelResult.success) {
        throw new Error(cancelResult.message || "Không thể hủy đặt phòng");
      }
      
      // If refund is available, submit refund info
      if (refundAmount > 0) {
        let paymentDetails = {};
        
        if (refundMethod === "bank") {
          // In a real app, you would collect this information from the user
          paymentDetails = {
            bank_name: "Ngân hàng của người dùng",
            account_number: "Số tài khoản người dùng",
            account_holder: bookingData.customerName,
          };
        } else if (refundMethod === "wallet") {
          paymentDetails = {
            e_wallet_id: "Wallet ID của người dùng",
          };
        }
        
        const refundResult = await BookingService.submitRefundInfo({
          refund_id: cancelResult.data.refund.id,
          refund_method: refundMethod === "original" ? "credit_card" : 
                          refundMethod === "wallet" ? "e_wallet" : "bank_transfer",
          payment_details: paymentDetails
        });
        
        if (!refundResult.success) {
          console.warn("Đã hủy đặt phòng nhưng có lỗi khi xử lý hoàn tiền:", refundResult.message);
        }
      }
      
      setIsModalVisible(false);
      setIsSuccess(true);
      setCurrentStep(3); // Move to success step
      message.success("Đã gửi yêu cầu hủy đặt phòng thành công!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      message.error(error.message || "Đã xảy ra lỗi khi hủy đặt phòng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToBookings = () => {
    navigate("/booking-history");
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

  // Calculate cancellation status and applicable policy
  const getCancellationStatus = () => {
    if (!bookingData) return null;

    const today = new Date();
    const checkInDate = new Date(bookingData.check_in);
    const daysUntilCheckin = Math.ceil(
      (checkInDate - today) / (1000 * 60 * 60 * 24)
    );

    let status = {
      canCancel: true,
      refundPercentage: 0,
      message: "",
      type: "success",
    };

    if (daysUntilCheckin > 7) {
      status.refundPercentage = 80;
      status.message = "Bạn sẽ được hoàn trả 80% tổng số tiền";
      status.type = "success";
    } else if (daysUntilCheckin >= 3) {
      status.refundPercentage = 50;
      status.message = "Bạn sẽ được hoàn trả 50% tổng số tiền";
      status.type = "warning";
    } else {
      status.refundPercentage = 0;
      status.message = "Không được hoàn trả tiền";
      status.type = "error";
      // Can still cancel but with no refund
    }

    return status;
  };

  const cancellationStatus = getCancellationStatus();

  const renderBookingInfo = () => {
    if (!bookingData) return null;

    return (
      <Card className={styles["booking-cancel-card"]}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Image
              src={bookingData.hotel_image}
              alt={bookingData.hotel_name}
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} md={16}>
            <Title level={4}>{bookingData.hotel_name}</Title>
            <Space direction="vertical" size="small">
              <Text type="secondary">
                <HomeOutlined /> {bookingData.hotel_address}
              </Text>
              <Text strong>
                <CalendarOutlined /> Check-in: {formatDate(bookingData.check_in)}
              </Text>
              <Text strong>
                <CalendarOutlined /> Check-out:{" "}
                {formatDate(bookingData.check_out)}
              </Text>
              <Text>
                <UserOutlined /> {bookingData.guests} khách • {bookingData.room_type}
              </Text>
              <Tag color="blue">Mã đặt phòng: {bookingData.id}</Tag>
              <Divider style={{ margin: "12px 0" }} />
              <Title level={5}>
                Tổng tiền đã thanh toán:{" "}
                <Text type="success">{formatCurrency(bookingData.total_price)}</Text>
              </Title>
              <Text type="secondary">
                Phương thức thanh toán: {bookingData.payment_method}
              </Text>
            </Space>
          </Col>
        </Row>
      </Card>
    );
  };

  const renderCancellationPolicy = () => {
    return (
      <Card
        title={
          <Space>
            <InfoCircleOutlined />
            Chính sách hủy đặt phòng
          </Space>
        }
        className={styles["booking-cancel-card"]}
      >
        <table className={styles["policy-table"]}>
          <thead>
            <tr>
              <th>Thời gian hủy</th>
              <th>Tỷ lệ hoàn tiền</th>
              <th>Mô tả</th>
            </tr>
          </thead>
          <tbody>
            {cancellationPolicy.map((policy, index) => (
              <tr key={index}>
                <td>{policy.timeframe}</td>
                <td>{policy.refundPercentage}%</td>
                <td>{policy.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {cancellationStatus && (
          <Alert
            message={
              <Text strong>
                Trường hợp của bạn: Hủy{" "}
                {Math.ceil(
                  (new Date(bookingData?.check_in) - new Date()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                ngày trước check-in
              </Text>
            }
            description={cancellationStatus.message}
            type={cancellationStatus.type}
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {refundAmount > 0 ? (
          <Statistic
            title="Số tiền sẽ được hoàn trả:"
            value={refundAmount}
            precision={0}
            formatter={(value) =>
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(value)
            }
            valueStyle={{ color: "#3f8600" }}
            prefix={<DollarOutlined />}
          />
        ) : (
          <Alert
            message="Không được hoàn tiền"
            description="Theo chính sách hủy đặt phòng, bạn không được hoàn tiền khi hủy vào thời điểm này."
            type="error"
            showIcon
          />
        )}
      </Card>
    );
  };

  const renderCancellationForm = () => {
    return (
      <>
        <Card
          title={
            <Space>
              <InfoCircleOutlined />
              Xác nhận hủy đặt phòng
            </Space>
          }
          className={styles["booking-cancel-card"]}
        >
          <Form layout="vertical">
            <Form.Item
              label="Lý do hủy đặt phòng"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lý do hủy đặt phòng",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Vui lòng chia sẻ lý do hủy đặt phòng để chúng tôi cải thiện dịch vụ"
              />
            </Form.Item>

            <Form.Item>
              <Checkbox
                checked={agreePolicy}
                onChange={(e) => setAgreePolicy(e.target.checked)}
              >
                Tôi đã đọc và đồng ý với{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  chính sách hủy đặt phòng
                </a>
              </Checkbox>
            </Form.Item>
          </Form>
        </Card>

        {refundAmount > 0 && (
          <Card
            title={
              <Space>
                <BankOutlined />
                Phương thức nhận hoàn tiền
              </Space>
            }
            className={styles["refund-method-card"]}
          >
            <Radio.Group
              onChange={(e) => setRefundMethod(e.target.value)}
              value={refundMethod}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Card
                    hoverable
                    className={styles["refund-method-option"]}
                    style={{
                      borderColor:
                        refundMethod === "original" ? "#1890ff" : undefined,
                    }}
                    onClick={() => setRefundMethod("original")}
                  >
                    <Space direction="vertical" align="center">
                      <CreditCardOutlined
                        style={{ fontSize: 24, color: "#1890ff" }}
                      />
                      <Radio value="original">
                        Hoàn tiền về phương thức thanh toán ban đầu
                      </Radio>
                      <Text type="secondary">
                        Hoàn tiền về thẻ/tài khoản đã dùng để thanh toán
                      </Text>
                    </Space>
                  </Card>
                </Col>

                <Col xs={24} md={8}>
                  <Card
                    hoverable
                    className={styles["refund-method-option"]}
                    style={{
                      borderColor:
                        refundMethod === "wallet" ? "#1890ff" : undefined,
                    }}
                    onClick={() => setRefundMethod("wallet")}
                  >
                    <Space direction="vertical" align="center">
                      <WalletOutlined
                        style={{ fontSize: 24, color: "#52c41a" }}
                      />
                      <Radio value="wallet">Hoàn tiền vào ví điện tử</Radio>
                      <Text type="secondary">
                        Nhanh chóng, thời gian xử lý 1-2 ngày
                      </Text>
                    </Space>
                  </Card>
                </Col>

                <Col xs={24} md={8}>
                  <Card
                    hoverable
                    className={styles["refund-method-option"]}
                    style={{
                      borderColor:
                        refundMethod === "bank" ? "#1890ff" : undefined,
                    }}
                    onClick={() => setRefundMethod("bank")}
                  >
                    <Space direction="vertical" align="center">
                      <BankOutlined
                        style={{ fontSize: 24, color: "#722ed1" }}
                      />
                      <Radio value="bank">Hoàn tiền vào tài khoản ngân hàng</Radio>
                      <Text type="secondary">
                        Thời gian xử lý 3-5 ngày làm việc
                      </Text>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </Radio.Group>
          </Card>
        )}
      </>
    );
  };

  const renderConfirmation = () => {
    return (
      <Card
        title={
          <Space>
            <InfoCircleOutlined />
            Xác nhận thông tin
          </Space>
        }
        className={styles["refund-confirmation-card"]}
      >
        <Descriptions bordered column={{ xs: 1, sm: 2 }}>
          <Descriptions.Item label="Mã đặt phòng">
            {bookingData?.id}
          </Descriptions.Item>
          <Descriptions.Item label="Khách sạn">
            {bookingData?.hotel_name}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày check-in">
            {formatDate(bookingData?.check_in)}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày check-out">
            {formatDate(bookingData?.check_out)}
          </Descriptions.Item>
          <Descriptions.Item label="Loại phòng">
            {bookingData?.room_type}
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền đã thanh toán">
            {formatCurrency(bookingData?.total_price)}
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền hoàn trả" span={2}>
            <Text strong style={{ color: "#52c41a" }}>
              {formatCurrency(refundAmount)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="Phương thức hoàn tiền" span={2}>
            {refundMethod === "original"
              ? "Hoàn tiền về phương thức thanh toán ban đầu"
              : refundMethod === "wallet"
              ? "Hoàn tiền vào ví điện tử"
              : "Hoàn tiền vào tài khoản ngân hàng"}
          </Descriptions.Item>
          <Descriptions.Item label="Lý do hủy" span={2}>
            {reason || "Không có lý do được cung cấp"}
          </Descriptions.Item>
        </Descriptions>

        <Alert
          message="Xác nhận hủy đặt phòng"
          description="Sau khi xác nhận, quá trình hủy đặt phòng không thể đảo ngược. Tiền hoàn trả sẽ được xử lý theo chính sách."
          type="warning"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>
    );
  };

  const renderSuccess = () => {
    return (
      <Result
        status="success"
        title="Hủy đặt phòng thành công!"
        subTitle={
          <>
            <p>
              Mã đặt phòng: {bookingData?.id} đã được hủy thành công.
              {refundAmount > 0
                ? ` Số tiền ${formatCurrency(refundAmount)} sẽ được hoàn trả trong vòng 5-7 ngày làm việc.`
                : " Không có khoản tiền nào được hoàn trả."}
            </p>
            <p>
              Email xác nhận hủy đặt phòng đã được gửi tới{" "}
              {bookingData?.email}.
            </p>
          </>
        }
        extra={[
          <Button
            type="primary"
            key="booking-history"
            onClick={handleBackToBookings}
          >
            Quay lại lịch sử đặt phòng
          </Button>,
          refundAmount > 0 && (
            <Button
              key="refund-status"
              onClick={() => navigate(`/refund-status/RF-${bookingData?.id.substring(3)}`)}
            >
              Theo dõi trạng thái hoàn tiền
            </Button>
          ),
        ]}
      />
    );
  };

  // Steps for the cancellation process
  const steps = [
    {
      title: "Thông tin đặt phòng",
      content: (
        <>
          {renderBookingInfo()}
          {renderCancellationPolicy()}
        </>
      ),
    },
    {
      title: "Hủy đặt phòng",
      content: renderCancellationForm(),
    },
    {
      title: "Xác nhận",
      content: renderConfirmation(),
    },
    {
      title: "Hoàn tất",
      content: renderSuccess(),
    },
  ];

  if (loading && !isSuccess) {
    return (
      <Layout>
        <Content className={styles["site-layout-content"]}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
              flexDirection: "column",
            }}
          >
            <Spin size="large" />
            <Text style={{ marginTop: 16 }}>
              Đang tải thông tin đặt phòng...
            </Text>
          </div>
        </Content>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Content className={styles["site-layout-content"]}>
          <Result
            status="error"
            title="Không thể tải thông tin"
            subTitle={error}
            extra={[
              <Button type="primary" key="back" onClick={() => navigate("/booking-history")}>
                Quay lại lịch sử đặt phòng
              </Button>,
            ]}
          />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Content className={styles["site-layout-content"]}>
        <div className={styles.pageHeader}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/booking-history")}
            style={{ marginBottom: 16 }}
          >
            Quay lại lịch sử đặt phòng
          </Button>
          <Title level={2}>Hủy đặt phòng & Hoàn tiền</Title>
        </div>

        <Steps current={currentStep} style={{ marginBottom: 24 }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <div>{steps[currentStep].content}</div>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent:
              currentStep === 0 ? "flex-end" : "space-between",
          }}
        >
          {currentStep > 0 && currentStep < 3 && (
            <Button onClick={handlePrev}>Quay lại</Button>
          )}

          {currentStep < steps.length - 2 && (
            <Button 
              type="primary" 
              onClick={handleNext}
              disabled={
                currentStep === 1 && (reason === "" || !agreePolicy)
              }
            >
              Tiếp tục
            </Button>
          )}

          {currentStep === 2 && (
            <Button type="primary" danger onClick={showConfirmModal}>
              Xác nhận hủy đặt phòng
            </Button>
          )}
        </div>

        {/* Confirmation Modal */}
        <Modal
          title={
            <Space>
              <WarningOutlined style={{ color: "#ff4d4f" }} />
              Xác nhận hủy đặt phòng
            </Space>
          }
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Huỷ bỏ
            </Button>,
            <Button
              key="submit"
              type="primary"
              danger
              loading={loading}
              onClick={handleConfirmCancellation}
            >
              Xác nhận hủy
            </Button>,
          ]}
        >
          <p>
            Bạn có chắc chắn muốn hủy đặt phòng{" "}
            <Text strong>{bookingData?.id}</Text> tại{" "}
            <Text strong>{bookingData?.hotel_name}</Text>?
          </p>
          {refundAmount > 0 ? (
            <p>
              Số tiền hoàn trả:{" "}
              <Text strong style={{ color: "#52c41a" }}>
                {formatCurrency(refundAmount)}
              </Text>{" "}
              ({cancellationStatus?.refundPercentage}% tổng số tiền đã thanh
              toán)
            </p>
          ) : (
            <Alert
              message="Không được hoàn tiền"
              description="Theo chính sách hủy phòng, đặt phòng này không được hoàn tiền nếu hủy vào thời điểm này."
              type="error"
              showIcon
              style={{ marginTop: 16, marginBottom: 16 }}
            />
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default BookingCancelRefund; 
