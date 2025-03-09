import { Layout, Button, Menu, Space, Dropdown } from 'antd';
import { DownOutlined, QuestionCircleOutlined, CompassOutlined, HomeOutlined } from '@ant-design/icons';
import '../../static/css/styles.css';

const { Header: AntHeader } = Layout;

function Header() {
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
        <AntHeader className="header-container" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#fff',
            padding: '0 152px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
        }}>
            {/* Left section with logo and dropdown */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src="https://vi.hotels.com/_dms/header/logo.svg?locale=vi_VN&siteid=3213&2&6f9ec7db"
                    alt="logo"
                    style={{ height: '32px', marginRight: '16px' }}
                />
                <Dropdown overlay={tripMenu} placement="bottomLeft" >
                    <Button type="primary" style={{backgroundColor: '#e61e43', border: 'none', color: 'white'}}>
                        <Space >
                            Đặt chuyến đi
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </div>

            {/* Middle section with links */}
            <div className="header-links" style={{ display: 'flex', gap: '24px' }}>
                <Button style={{color: 'black'}} type="link" icon={<HomeOutlined />}>
                    Đăng thông tin nơi lưu trú
                </Button>
                <Button style={{color: 'black'}} type="link" icon={<QuestionCircleOutlined />}>
                    Hỗ trợ
                </Button>
                <Button style={{color: 'black'}} type="link" icon={<CompassOutlined />}>
                    Chuyến đi
                </Button>
            </div>

            {/* Right section with user actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Button style={{ border: 'none'}} >Đăng nhập</Button>
                <Button style={{backgroundColor: '#e61e43', border: 'none', color: 'white'}} >Tạo tài khoản</Button>
            </div>
        </AntHeader>
    );
}

export default Header;