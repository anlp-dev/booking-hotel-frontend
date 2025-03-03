import * as React from "react";
import "../../static/css/styles.css";
import { Button } from "react-bootstrap";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
    return ( 
        <div className="header-home">
            <div>
                <img 
                    src="https://vi.hotels.com/_dms/header/logo.svg?locale=vi_VN&siteid=3213&2&6f9ec7db"
                    alt="logo"
                    />
                <Button>Đặt chuyến đi <path d="M16.44 9.146a.5.5 0 0 1 .706 0l.708.708a.5.5 0 0 1 0 .707l-5.147 5.146a1 1 0 0 1-1.414 0l-5.147-5.146a.5.5 0 0 1 0-.707l.708-.708a.5.5 0 0 1 .703-.003L12 13.586l4.44-4.44z"></path></Button>

            </div>
                 
            <div className="header-home-a"> 
                <a href="">Đăng thông tin nơi lưu trú</a>
                <a href="#">Hỗ trợ</a>
                <a href="#">Chuyến đi</a>
            </div>
            <div >
                <Button className="header-home-button1">Đăng nhập</Button>
                <Button>Tạo tài khoản</Button>
                <FontAwesomeIcon icon={faCartShopping} style={{ marginLeft: "10px" }} />
            </div>
      </div>
     );
}

export default Header;