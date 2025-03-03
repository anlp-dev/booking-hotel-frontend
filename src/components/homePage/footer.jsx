import * as React from "react";
import "../../static/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";



function Footer() {
    return ( 
        <div className="footer-home">
        <img src="https://vi.hotels.com/_dms/header/logo.svg?locale=vi_VN&siteid=3213&2&6f9ec7db"></img>
        <Row>
            <Col md={3}>
            <span>Hỗ trợ & Câu hỏi thường gặp</span>
            <ul>
                <li><a href="#">Đặt chỗ của bạn</a></li>
                <li><a href="#">Câu hỏi thường gặp</a></li>
                <li><a href="#">Liên hệ với chúng tôi</a></li>
                <li><a href="#">Nhận xét nơi lưu trú</a></li>
            </ul>
            </Col>
            <Col md={3}>
            <span>Thông tin cho nhà cung cấp, đơn vị liên kết và truyền thông</span>
            <ul>
                <li><a href="#">Liên kết với chúng tôi</a></li>
                <li><a href="#">Tin tức & báo chí</a></li>
                <li><a href="#">Quảng bá cùng chúng tôi</a></li>
                <li><a href="#">Nhân viên du lịch</a></li>
            </ul>
            </Col>
            <Col md={3}>
            <span>Chính sách</span>
            <ul>
                <li><a href="#">Điều khoản & Điều kiện</a></li>
                <li><a href="#">Bảo mật</a></li>
                <li><a href="#">Cookie</a></li>
                <li><a href="#">Nguyên tắc về nội dung và báo cáo nội dung</a></li>
            </ul>
            </Col>
            <Col md={3}>
            <span>Thông tin khác</span>
            <ul>
                <li><a href="#">Về chúng tôi</a></li>
                <li><a href="#">Nghề nghiệp</a></li>
            </ul>
            </Col>
        </Row>
        </div>
            
     );
}

export default Footer;