import React, { useState } from 'react';
import { 
  Layout, 
  Typography, 
  Steps, 
  Card, 
  Row, 
  Col, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Button, 
  Divider, 
  List, 
  Avatar, 
  Tag, 
  Space, 
  Checkbox,
  Alert,
  message,
  Menu,
  Dropdown,
  Badge
} from 'antd';
import { 
  UserOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  CreditCardOutlined, 
  HomeOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  LockOutlined,
  SafetyOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  QuestionCircleOutlined,
  CompassOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from '../../static/css/Checkout.module.css';

const { Title, Text, Paragraph } = Typography;
const { Header, Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Checkout = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Mock data for the hotel booking
  const bookingDetails = {
    hotelName: "Khách sạn Luxury Palace",
    roomType: "Phòng Deluxe",
    checkIn: "2023-06-15",
    checkOut: "2023-06-18",
    nights: 3,
    guests: 2,
    roomImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Wifi miễn phí", "Điều hòa", "Minibar", "Bể bơi", "Bữa sáng miễn phí"],
    pricePerNight: 1200000,
    totalPrice: 3600000,
    tax: 360000,
    serviceFee: 180000,
    grandTotal: 4140000
  };

  const onFinish = (values) => {
    setLoading(true);
    console.log('Form values:', values);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success('Đặt phòng thành công! Chuyển đến trang thanh toán...');
      // Navigate to payment page
      // navigate('/payment');
    }, 1500);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const tripMenu = (
    <Menu items={[
      {
        key: '1',
        label: 'Khách sạn',
      },
      {
        key: '2',
        label: 'Vé máy bay',
      },
      {
        key: '3',
        label: 'Tour du lịch',
      },
    ]} />
  );

  return (
    <Layout className={styles.checkoutLayout}>
      <Header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Left section with logo and dropdown */}
          <div className={styles.headerLeft}>
            <img
              src="https://vi.hotels.com/_dms/header/logo.svg?locale=vi_VN&siteid=3213&2&6f9ec7db"
              alt="logo"
              className={styles.logo}
              onClick={() => navigate('/')}
            />
            <Dropdown overlay={tripMenu} placement="bottomLeft">
              <Button type="primary">
                <Space>
                  Đặt chuyến đi
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>

          {/* Middle section with checkout steps */}
          <div className={styles.headerMiddle}>
            <Steps
              size="small"
              current={0}
              items={[
                { title: 'Thông tin đặt phòng' },
                { title: 'Thanh toán' },
                { title: 'Xác nhận' },
              ]}
            />
          </div>

          {/* Right section with user actions */}
          <div className={styles.headerRight}>
            <Button type="link" icon={<QuestionCircleOutlined />}>
              Hỗ trợ
            </Button>
            <Button type="link" icon={<CompassOutlined />}>
              Chuyến đi
            </Button>
            <Badge count={1}>
              <Button type="text" icon={<ShoppingCartOutlined style={{ fontSize: '18px' }} />} />
            </Badge>
          </div>
        </div>
      </Header>

      <Content className={styles.content}>
        <Title level={2} className={styles.pageTitle}>Xác nhận thông tin đặt phòng</Title>
        <Text type="secondary" className={styles.pageSubtitle}>
          Vui lòng kiểm tra thông tin đặt phòng và điền thông tin cá nhân để hoàn tất quá trình đặt phòng
        </Text>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={16}>
            <Card title="Thông tin khách hàng" bordered={false} className={styles.card}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  country: 'Vietnam',
                  paymentMethod: 'credit-card'
                }}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="firstName"
                      label="Họ"
                      rules={[{ required: true, message: 'Vui lòng nhập họ của bạn' }]}
                    >
                      <Input prefix={<UserOutlined />} placeholder="Nhập họ" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="lastName"
                      label="Tên"
                      rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}
                    >
                      <Input prefix={<UserOutlined />} placeholder="Nhập tên" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Vui lòng nhập email' },
                        { type: 'email', message: 'Email không hợp lệ' }
                      ]}
                    >
                      <Input prefix={<MailOutlined />} placeholder="example@email.com" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="phone"
                      label="Số điện thoại"
                      rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                    >
                      <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                >
                  <Input prefix={<HomeOutlined />} placeholder="Nhập địa chỉ" />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="city"
                      label="Thành phố"
                      rules={[{ required: true, message: 'Vui lòng nhập thành phố' }]}
                    >
                      <Input placeholder="Nhập thành phố" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="country"
                      label="Quốc gia"
                      rules={[{ required: true, message: 'Vui lòng chọn quốc gia' }]}
                    >
                      <Select placeholder="Chọn quốc gia">
                        <Option value="Vietnam">Việt Nam</Option>
                        <Option value="USA">Hoa Kỳ</Option>
                        <Option value="Japan">Nhật Bản</Option>
                        <Option value="Korea">Hàn Quốc</Option>
                        <Option value="Singapore">Singapore</Option>
                        <Option value="Thailand">Thái Lan</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="specialRequests"
                  label="Yêu cầu đặc biệt"
                >
                  <Input.TextArea rows={4} placeholder="Nhập yêu cầu đặc biệt (nếu có)" />
                </Form.Item>

                <Divider className={styles.divider} />

                <Form.Item
                  name="paymentMethod"
                  label="Phương thức thanh toán"
                  rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
                >
                  <Select placeholder="Chọn phương thức thanh toán">
                    <Option value="credit-card">Thẻ tín dụng/ghi nợ</Option>
                    <Option value="bank-transfer">Chuyển khoản ngân hàng</Option>
                    <Option value="paypal">PayPal</Option>
                    <Option value="momo">Ví MoMo</Option>
                    <Option value="zalopay">ZaloPay</Option>
                  </Select>
                </Form.Item>

                <Alert
                  message="Thông tin bảo mật"
                  description="Thông tin thanh toán của bạn được bảo mật và mã hóa. Chúng tôi không lưu trữ thông tin thẻ của bạn."
                  type="info"
                  showIcon
                  icon={<LockOutlined />}
                  className={styles.alert}
                />

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý với điều khoản và điều kiện')),
                    },
                  ]}
                >
                  <Checkbox>
                    Tôi đã đọc và đồng ý với <a href="#">điều khoản và điều kiện</a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading} block className={styles.submitButton}>
                    Tiếp tục đến thanh toán
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card title="Chi tiết đặt phòng" bordered={false} className={styles.card}>
              <div>
                <img 
                  src={bookingDetails.roomImage} 
                  alt={bookingDetails.roomType} 
                  className={styles.roomImage}
                />
              </div>

              <Title level={4} className={styles.hotelName}>{bookingDetails.hotelName}</Title>
              <Paragraph>
                <Tag color="blue">{bookingDetails.roomType}</Tag>
                <Tag icon={<UserOutlined />}>{bookingDetails.guests} khách</Tag>
              </Paragraph>

              <Divider className={styles.divider} />

              <Space direction="vertical" style={{ width: '100%' }}>
                <div className={styles.dateInfo}>
                  <Text><ClockCircleOutlined className={styles.dateIcon} /> Nhận phòng:</Text>
                  <Text strong>{bookingDetails.checkIn}</Text>
                </div>
                <div className={styles.dateInfo}>
                  <Text><ClockCircleOutlined className={styles.dateIcon} /> Trả phòng:</Text>
                  <Text strong>{bookingDetails.checkOut}</Text>
                </div>
                <div className={styles.dateInfo}>
                  <Text>Số đêm:</Text>
                  <Text strong>{bookingDetails.nights} đêm</Text>
                </div>
              </Space>

              <Divider className={styles.divider} />

              <Title level={5}>Tiện nghi phòng</Title>
              <List
                size="small"
                dataSource={bookingDetails.amenities}
                renderItem={(item) => (
                  <List.Item className={styles.amenityItem}>
                    <CheckCircleOutlined className={styles.amenityIcon} />
                    {item}
                  </List.Item>
                )}
                style={{ marginBottom: '16px' }}
              />

              <Divider className={styles.divider} />

              <Title level={5}>Chi tiết giá</Title>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div className={styles.priceLine}>
                  <Text>{formatCurrency(bookingDetails.pricePerNight)} x {bookingDetails.nights} đêm</Text>
                  <Text>{formatCurrency(bookingDetails.totalPrice)}</Text>
                </div>
                <div className={styles.priceLine}>
                  <Text>Thuế</Text>
                  <Text>{formatCurrency(bookingDetails.tax)}</Text>
                </div>
                <div className={styles.priceLine}>
                  <Text>Phí dịch vụ</Text>
                  <Text>{formatCurrency(bookingDetails.serviceFee)}</Text>
                </div>
              </Space>

              <Divider className={styles.divider} />

              <div className={styles.priceLine}>
                <Title level={4} className={styles.totalPrice}>Tổng cộng</Title>
                <Title level={4} className={styles.totalPrice}>{formatCurrency(bookingDetails.grandTotal)}</Title>
              </div>

              <Alert
                message="Chính sách hủy phòng"
                description="Miễn phí hủy phòng trước 48 giờ. Hủy phòng sau thời gian này sẽ bị tính phí một đêm."
                type="warning"
                showIcon
                style={{ marginTop: '16px' }}
              />
            </Card>

            <Card bordered={false} className={styles.card}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div className={styles.securityInfo}>
                  <SafetyOutlined className={styles.securityIcon} style={{ color: '#52c41a' }} />
                  <div className={styles.securityText}>
                    <Text strong>Đảm bảo giá tốt nhất</Text>
                    <br />
                    <Text type="secondary">Chúng tôi đảm bảo bạn sẽ nhận được giá tốt nhất</Text>
                  </div>
                </div>
                <div className={styles.securityInfo}>
                  <LockOutlined className={styles.securityIcon} style={{ color: '#1890ff' }} />
                  <div className={styles.securityText}>
                    <Text strong>Thanh toán an toàn</Text>
                    <br />
                    <Text type="secondary">Thông tin thanh toán của bạn được bảo mật 100%</Text>
                  </div>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Checkout; 
