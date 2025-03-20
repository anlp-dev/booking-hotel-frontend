import apiConfig from "../configs/apiConfig.jsx";
import {jwtDecode} from "jwt-decode";

const PaymentService = {
  async getUrlVnPay(dataReq) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Đã hết hạn đăng nhập !!!");
      }
      console.log(dataReq, 123);
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      console.log(currentTime.exp < currentTime, 123);
      if (decodedToken.exp < currentTime) {
        window.location.href = "/403";
        return;
      }

      const res = await fetch(`${apiConfig.baseUrl}/payment/create-url-vnpay`, {
        method: "POST",
        headers: apiConfig.getAuthHeaders(token),
        body: JSON.stringify(dataReq),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  
  async getPaymentByBookingId(bookingId) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Đã hết hạn đăng nhập !!!");
      }
      
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        window.location.href = "/403";
        return;
      }

      const res = await fetch(`${apiConfig.baseUrl}/payment/by-booking/${bookingId}`, {
        method: "GET",
        headers: apiConfig.getAuthHeaders(token),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  
  // Get human-readable message for VNPAY response codes
  getResponseMessage(responseCode) {
    const responseMessages = {
      '00': 'Giao dịch thành công',
      '01': 'Giao dịch đã tồn tại',
      '02': 'Merchant không hợp lệ',
      '03': 'Dữ liệu gửi sang không đúng định dạng',
      '04': 'Khởi tạo GD không thành công do Website đang bị tạm khóa',
      '05': 'Giao dịch không thành công do: Quý khách nhập sai mật khẩu quá số lần quy định',
      '06': 'Giao dịch không thành công do Quý khách nhập sai mật khẩu',
      '07': 'Giao dịch bị nghi ngờ gian lận',
      '08': 'Giao dịch không thành công do: Hệ thống Ngân hàng đang bảo trì',
      '09': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ Internet Banking',
      '10': 'Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
      '11': 'Đã hết hạn chờ thanh toán',
      '12': 'Thẻ/Tài khoản của khách hàng bị khóa',
      '13': 'Quý khách nhập sai mật khẩu xác thực giao dịch',
      '24': 'Giao dịch bị hủy',
      '51': 'Tài khoản không đủ số dư để thực hiện giao dịch',
      '65': 'Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày',
      '75': 'Ngân hàng thanh toán đang bảo trì',
      '79': 'KH nhập sai mật khẩu thanh toán quá số lần quy định',
      '99': 'Lỗi không xác định'
    };
    
    return responseMessages[responseCode] || 'Lỗi không xác định';
  }
};

export default PaymentService;
