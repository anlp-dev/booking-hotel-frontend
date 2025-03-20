import React, { useEffect, useState } from 'react';
import { 
  Layout, 
  Typography, 
  Card, 
  Row, 
  Col, 
  Button, 
  Divider, 
  Space, 
  Result,
  Steps,
  Descriptions,
  Timeline,
  Statistic,
  Tag,
  Image,
  Badge,
  ConfigProvider,
  theme,
  Alert,
  Spin,
  Modal
} from 'antd';
import { 
  CheckCircleOutlined, 
  HomeOutlined, 
  PrinterOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  SafetyOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  StarOutlined,
  GiftOutlined,
  WhatsAppOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import styles from '../../static/css/BookingSuccess.module.css';
import confetti from 'canvas-confetti';
import axios from 'axios';
import apiConfig from '../../configs/apiConfig';

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;
const { useToken } = theme;

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useToken();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  
  // Get payment data from URL params
  const orderId = searchParams.get('orderId');
  const status = searchParams.get('status');
  const message = searchParams.get('message');
  const responseCode = searchParams.get('code');
  
  // In a real application, you would get this data from the location state
  // or from an API call using a booking ID
  const bookingData = location.state?.bookingData || {
    bookingId: orderId || 'BK-' + Math.floor(100000 + Math.random() * 900000),
    customerName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0912345678',
    roomType: 'Deluxe Room',
    checkIn: '2023-07-15',
    checkOut: '2023-07-18',
    guests: 2,
    totalAmount: 3500000,
    paymentMethod: 'VNPAY QR',
    paymentId: 'PAY-' + Math.floor(100000 + Math.random() * 900000),
    paymentStatus: status || 'success',
    paymentMessage: message || null
  };

  // Fetch booking details by orderId if available
  useEffect(() => {
    if (orderId) {
      setLoading(true);
      // In a real app, you'd fetch booking and payment details from API
      // Example:
      // axios.get(`${apiConfig.baseUrl}/payment/by-booking/${orderId}`)
      //   .then(response => {
      //     if (response.data.success) {
      //       setBookingData(response.data.data);
      //       setPaymentStatus(response.data.data.status);
      //     } else {
      //       setPaymentError("Không thể tải thông tin thanh toán");
      //     }
      //   })
      //   .catch(error => {
      //     setPaymentError(error.message || "Đã xảy ra lỗi khi tải thông tin thanh toán");
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
      
      // For demonstration, use URL params
      setPaymentStatus(status);
      if (status === 'failed') {
        setPaymentError(message || "Thanh toán thất bại");
      }
      setLoading(false);
    }
  }, [orderId]);

  // Calculate number of nights
  const checkInDate = new Date(bookingData.checkIn);
  const checkOutDate = new Date(bookingData.checkOut);
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

  // Sample hotel data (in a real app, this would come from the API)
  const hotelData = {
    name: "Luxury Palace Hotel & Spa",
    address: "123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    roomImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Wifi miễn phí", "Điều hòa", "Minibar", "Bể bơi", "Bữa sáng miễn phí", "Spa", "Phòng gym"]
  };

  // Confetti effect on page load - only trigger if payment was successful
  useEffect(() => {
    if (paymentStatus === 'success' || bookingData.paymentStatus === 'success') {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0, 0.2) }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0, 0.2) }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [paymentStatus, bookingData.paymentStatus]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  // Generate QR code URL (in a real app, this would be generated server-side)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    JSON.stringify({
      bookingId: bookingData.bookingId,
      customerName: bookingData.customerName,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut
    })
  )}`;

  // Get payment status indicator
  const getPaymentStatus = () => {
    const statusValue = paymentStatus || bookingData.paymentStatus;
    if (statusValue === 'success' || statusValue === 'paid') {
      return {
        status: 'success',
        title: 'Đặt phòng thành công!',
        icon: <CheckCircleOutlined className={styles.successIcon} />,
        color: '#52c41a'
      };
    } else if (statusValue === 'failed') {
      return {
        status: 'error',
        title: 'Thanh toán thất bại!',
        icon: <CloseCircleOutlined className={styles.errorIcon} />,
        color: '#f5222d'
      };
    } else {
      return {
        status: 'info',
        title: 'Đặt phòng đang xử lý',
        icon: <ExclamationCircleOutlined className={styles.infoIcon} />,
        color: '#1890ff'
      };
    }
  };

  const renderPaymentStatusAlert = () => {
    const errorMsg = paymentError || bookingData.paymentMessage;
    if (errorMsg && (paymentStatus === 'failed' || bookingData.paymentStatus === 'failed')) {
      return (
        <Alert
          message="Thông báo thanh toán"
          description={`${errorMsg}${responseCode ? ` (Mã lỗi: ${responseCode})` : ''}`}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
        <p>Đang tải thông tin thanh toán...</p>
      </div>
    );
  }

  const paymentStatusInfo = getPaymentStatus();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
        components: {
          Card: {
            headerBg: token.colorBgContainer,
            headerFontSize: 16,
            headerFontSizeSM: 14,
          }
        }
      }}
    >
      <Layout className={styles.layout}>
        <Content className={styles.content}>
          <Row justify="center">
            <Col xs={24} sm={22} md={20} lg={18} xl={16}>
              <div className={styles.successAnimation}>
                <Result
                  status={paymentStatusInfo.status}
                  icon={paymentStatusInfo.icon}
                  title={<span className={styles.successTitle}>{paymentStatusInfo.title}</span>}
                  subTitle={
                    <div className={styles.successSubtitle}>
                      <p>Mã đặt phòng: <span className={styles.bookingId}>{bookingData.bookingId}</span></p>
                      <p>Cảm ơn bạn đã đặt phòng tại {hotelData.name}!</p>
                    </div>
                  }
                  extra={[
                    <Button 
                      type="primary" 
                      key="home" 
                      size="large"
                      icon={<HomeOutlined />}
                      onClick={() => navigate('/')}
                      className={styles.primaryButton}
                    >
                      Về trang chủ
                    </Button>,
                    paymentStatus === 'failed' ? (
                      <Button 
                        key="retry" 
                        size="large"
                        type="default"
                        onClick={() => navigate('/checkout')}
                        className={styles.secondaryButton}
                      >
                        Thử lại thanh toán
                      </Button>
                    ) : (
                      <Button 
                        key="print" 
                        size="large"
                        icon={<PrinterOutlined />}
                        onClick={() => window.print()}
                        className={styles.secondaryButton}
                      >
                        In hóa đơn
                      </Button>
                    ),
                  ]}
                />
              </div>
              
              {renderPaymentStatusAlert()}
              
              <Card className={`${styles.card} ${styles.hotelCard}`}>
                <Row gutter={[24, 24]} align="middle">
                  <Col xs={24} md={8}>
                    <Image
                      src={hotelData.image}
                      alt={hotelData.name}
                      className={styles.hotelImage}
                      preview={false}
                    />
                  </Col>
                  <Col xs={24} md={16}>
                    <div className={styles.hotelInfo}>
                      <Title level={3}>{hotelData.name}</Title>
                      <Space>
                        <EnvironmentOutlined />
                        <Text>{hotelData.address}</Text>
                      </Space>
                      <div className={styles.ratingContainer}>
                        <StarOutlined className={styles.starIcon} />
                        <Text strong>{hotelData.rating}</Text>
                        <Text type="secondary">(Tuyệt vời)</Text>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
              
              <Row gutter={[24, 24]} className={styles.infoSection}>
                <Col xs={24} md={12}>
                  <Card 
                    title={<><CalendarOutlined /> Thông tin đặt phòng</>} 
                    bordered={false}
                    className={styles.card}
                  >
                    <div className={styles.roomImageContainer}>
                      <Image
                        src={hotelData.roomImage}
                        alt={bookingData.roomType}
                        className={styles.roomImage}
                        preview={false}
                      />
                      <Badge.Ribbon text={bookingData.roomType} color="blue" className={styles.roomTypeBadge} />
                    </div>
                    
                    <Divider />
                    
                    <Timeline
                      mode="left"
                      items={[
                        {
                          label: 'Nhận phòng',
                          children: formatDate(bookingData.checkIn),
                          color: 'green',
                          dot: <CalendarOutlined />
                        },
                        {
                          label: 'Trả phòng',
                          children: formatDate(bookingData.checkOut),
                          color: 'red',
                          dot: <CalendarOutlined />
                        },
                      ]}
                    />
                    
                    <Divider />
                    
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Statistic 
                          title="Số đêm" 
                          value={nights} 
                          suffix="đêm"
                          valueStyle={{ color: token.colorPrimary }}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic 
                          title="Số khách" 
                          value={bookingData.guests} 
                          suffix="người"
                          valueStyle={{ color: token.colorPrimary }}
                        />
                      </Col>
                    </Row>
                    
                    <Divider />
                    
                    <div className={styles.amenitiesContainer}>
                      <Text strong>Tiện nghi phòng:</Text>
                      <div className={styles.amenitiesTags}>
                        {hotelData.amenities.map((amenity, index) => (
                          <Tag key={index} color="blue" className={styles.amenityTag}>
                            {amenity}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Col>
                
                <Col xs={24} md={12}>
                  <Card 
                    title={<><UserOutlined /> Thông tin khách hàng</>} 
                    bordered={false}
                    className={styles.card}
                  >
                    <Descriptions column={1} labelStyle={{ fontWeight: 'bold' }}>
                      <Descriptions.Item label="Họ tên">
                        <UserOutlined className={styles.infoIcon} /> {bookingData.customerName}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email">
                        <MailOutlined className={styles.infoIcon} /> {bookingData.email}
                      </Descriptions.Item>
                      <Descriptions.Item label="Số điện thoại">
                        <PhoneOutlined className={styles.infoIcon} /> {bookingData.phone}
                      </Descriptions.Item>
                    </Descriptions>
                    
                    <Divider />
                    
                    <div className={styles.qrCodeContainer}>
                      <div className={styles.qrCode}>
                        <Image
                          src={qrCodeUrl}
                          alt="QR Code"
                          preview={false}
                          width={150}
                        />
                      </div>
                      <div className={styles.qrCodeInfo}>
                        <Text strong>Mã QR đặt phòng</Text>
                        <Text type="secondary">Quét mã này khi nhận phòng để check-in nhanh chóng</Text>
                      </div>
                    </div>
                  </Card>
                  
                  <Card 
                    title={<><CreditCardOutlined /> Thông tin thanh toán</>} 
                    bordered={false}
                    className={`${styles.card} ${styles.paymentCard}`}
                  >
                    <Descriptions column={1} labelStyle={{ fontWeight: 'bold' }}>
                      <Descriptions.Item label="Phương thức thanh toán">
                        <CreditCardOutlined className={styles.infoIcon} /> {bookingData.paymentMethod}
                      </Descriptions.Item>
                      <Descriptions.Item label="Mã thanh toán">
                        <SafetyOutlined className={styles.infoIcon} /> {bookingData.paymentId}
                      </Descriptions.Item>
                      <Descriptions.Item label="Trạng thái">
                        <Badge status="success" text="Đã thanh toán" />
                      </Descriptions.Item>
                    </Descriptions>
                    
                    <Divider />
                    
                    <div className={styles.totalAmount}>
                      <Text>Tổng tiền:</Text>
                      <Text strong className={styles.amount}>
                        {formatCurrency(bookingData.totalAmount)}
                      </Text>
                    </div>
                  </Card>
                </Col>
              </Row>
              
              <Card className={`${styles.card} ${styles.stepsCard}`}>
                <Steps
                  current={3}
                  items={[
                    {
                      title: 'Chọn phòng',
                      description: 'Hoàn thành',
                      icon: <HomeOutlined />
                    },
                    {
                      title: 'Điền thông tin',
                      description: 'Hoàn thành',
                      icon: <UserOutlined />
                    },
                    {
                      title: 'Thanh toán',
                      description: 'Hoàn thành',
                      icon: <CreditCardOutlined />
                    },
                    {
                      title: 'Xác nhận',
                      description: 'Hoàn thành',
                      icon: <CheckCircleOutlined />
                    },
                  ]}
                />
              </Card>
              
              <Card className={`${styles.card} ${styles.noteCard}`}>
                <div className={styles.noteContent}>
                  <Title level={4}>
                    <GiftOutlined /> Thông tin hữu ích
                  </Title>
                  <Paragraph className={styles.note}>
                    <Text strong>Lưu ý khi nhận phòng:</Text> Vui lòng mang theo CMND/CCCD và mã đặt phòng khi nhận phòng. 
                    Quý khách có thể hủy đặt phòng miễn phí trước 24 giờ so với thời gian nhận phòng.
                  </Paragraph>
                  
                  <Paragraph className={styles.note}>
                    <Text strong>Giờ nhận phòng:</Text> Từ 14:00
                    <br />
                    <Text strong>Giờ trả phòng:</Text> Trước 12:00
                  </Paragraph>
                  
                  <Paragraph className={styles.note}>
                    <Text strong>Dịch vụ đưa đón:</Text> Khách sạn có dịch vụ đưa đón sân bay với phụ phí. Vui lòng liên hệ trước ít nhất 24 giờ để sắp xếp.
                  </Paragraph>
                </div>
              </Card>
              
              <div className={styles.shareContainer}>
                <Text strong>Chia sẻ trải nghiệm của bạn:</Text>
                <div className={styles.socialIcons}>
                  <Button type="text" icon={<FacebookOutlined />} className={styles.socialButton} />
                  <Button type="text" icon={<InstagramOutlined />} className={styles.socialButton} />
                  <Button type="text" icon={<TwitterOutlined />} className={styles.socialButton} />
                  <Button type="text" icon={<WhatsAppOutlined />} className={styles.socialButton} />
                </div>
              </div>
              
              <Paragraph className={styles.thankYou}>
                <Text strong>Cảm ơn quý khách đã lựa chọn dịch vụ của chúng tôi!</Text>
                <br />
                <Text type="secondary">Chúc quý khách có một kỳ nghỉ tuyệt vời.</Text>
              </Paragraph>
              
              <div className={styles.supportInfo}>
                <Text type="secondary">Cần hỗ trợ? Liên hệ với chúng tôi qua email: support@luxurypalace.com hoặc hotline: 1900 1234</Text>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default BookingSuccess; 
