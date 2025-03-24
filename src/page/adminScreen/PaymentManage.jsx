import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  Divider,
  Tooltip,
  alpha,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import PaymentService from "../../services/PaymentService";
import Loading from "../../components/loading/Loading.jsx";
import { notifyError } from "../../components/notification/ToastNotification.jsx";
import { message } from "antd";

const PaymentDetailsModal = ({ open, onClose, payment }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Chi tiết thanh toán
        </Typography>
        {payment && (
          <>
            <Typography><strong>Tên:</strong> {payment.user}</Typography>
            <Typography><strong>Số tiền:</strong> {payment.amount.toLocaleString('vi-VN')} VND</Typography>
            <Typography><strong>Ngày thanh toán:</strong> {new Date(payment.payment_date).toLocaleString()}</Typography>
            <Typography><strong>Phương thức:</strong> {payment.method}</Typography>
            <Typography><strong>Trạng thái:</strong> {payment.status}</Typography>
          </>
        )}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>Đóng</Button>
        </Box>
      </Box>
    </Modal>
  );
};

const EditPaymentModal = ({ open, onClose, payment, onSave }) => {
  const [formData, setFormData] = useState(payment || {});

  useEffect(() => {
    setFormData(payment || {});
  }, [payment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Chỉnh sửa thanh toán
        </Typography>
        <TextField
          fullWidth
          label="Tên người dùng"
          name="user"
          value={formData.user || ""}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Số tiền"
          name="amount"
          type="number"
          value={formData.amount || ""}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Ngày thanh toán"
          name="payment_date"
          type="datetime-local"
          value={formData.payment_date ? new Date(formData.payment_date).toISOString().slice(0, 16) : ""}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Phương thức</InputLabel>
          <Select
            name="method"
            value={formData.method || ""}
            onChange={handleChange}
            label="Phương thức"
          >
            <MenuItem value="ncb">NCB</MenuItem>
            <MenuItem value="paypal">PayPal</MenuItem>
            <MenuItem value="bank_transfer">Chuyển khoản</MenuItem>
            <MenuItem value="vnpayqr">VNPay QR</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
            label="Trạng thái"
          >
            <MenuItem value="paid">Đã thanh toán</MenuItem>
            <MenuItem value="unpaid">Chưa thanh toán</MenuItem>
            <MenuItem value="failed">Thất bại</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose}>Hủy</Button>
          <Button variant="contained" onClick={handleSubmit}>Lưu</Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  overflow: "hidden",
  borderRadius: theme.spacing(2),
  width: "100%",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(3),
    backgroundColor: alpha(theme.palette.common.white, 0.9),
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    transition: "all 0.3s",
    "&:hover": {
      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    },
    "&.Mui-focused": {
      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
    },
  },
}));

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        setIsLoading(true);
        const response = await PaymentService.getAllPayments();
        console.log("response", response);
        setPayments(response.data);
      } catch (error) {
        console.log(error);
        message.error("Không thể lấy thông tin payment");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayment();
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      payment.user.toLowerCase().includes(searchLower) ||
      payment.amount.toString().includes(searchLower) ||
      new Date(payment.payment_date).toLocaleString().toLowerCase().includes(searchLower) ||
      payment.method.toLowerCase().includes(searchLower) ||
      payment.status.toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod = methodFilter === "all" || payment.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPayment(null);
  };

  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedPayment(null);
  };

  const handleSaveEdit = async (updatedPayment) => {
    try {
      const response = await PaymentService.updatePayment(updatedPayment._id, updatedPayment);
      setPayments((prev) =>
        prev.map((p) => (p._id === updatedPayment._id ? response.data : p))
      );
      message.success("Cập nhật thanh toán thành công");
    } catch (error) {
      console.log(error);
      message.error("Không thể cập nhật thanh toán");
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (!paymentId) {
      console.error("Lỗi: paymentId bị undefined!");
      alert("Lỗi: Không tìm thấy paymentId để xóa.");
      return;
    }
  
    try {
      console.log("Xóa payment với ID:", paymentId);
      const response = await PaymentService.deletePayment(paymentId);
      console.log("Xóa payment thành công:", response);
      alert("Xóa payment thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa payment:", error.message);
      alert("Lỗi khi xóa payment: " + error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return '#4caf50';
      case 'unpaid':
        return '#ff9800';
      case 'failed':
        return '#f44336';
      default:
        return '#000';
    }
  };

  return (
    <Container maxWidth={false}>
      <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
        {isLoading && <Loading />}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Quản lý thanh toán
        </Typography>
      </Box>

      <StyledCard>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Danh sách thanh toán
            </Typography>
          }
        />
        <Divider />
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", mb: 4, gap: 2 }}>
            <SearchField
              size="small"
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
              sx={{ maxWidth: 400 }}
            />
            
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Trạng thái"
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="paid">Đã thanh toán</MenuItem>
                <MenuItem value="unpaid">Chưa thanh toán</MenuItem>
                <MenuItem value="failed">Thất bại</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Phương thức</InputLabel>
              <Select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                label="Phương thức"
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="ncb">NCB</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
                <MenuItem value="bank_transfer">Chuyển khoản</MenuItem>
                <MenuItem value="vnpayqr">VNPay QR</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid rgba(0,0,0,0.08)",
              mb: 2,
            }}
          >
            <Table size="medium">
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(0,0,0,0.02)" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Tên</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Số tiền</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Ngày thanh toán</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Phương thức</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Trạng thái</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPayments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((payment) => (
                    <TableRow
                      key={payment._id}
                      hover
                      sx={{
                        "&:hover": {
                          backgroundColor: alpha("#3f51b5", 0.04),
                        },
                      }}
                    >
                      <TableCell>{payment.user}</TableCell>
                      <TableCell>{payment.amount.toLocaleString('vi-VN')} VND</TableCell>
                      <TableCell>{new Date(payment.payment_date).toLocaleString()}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            backgroundColor: alpha(getStatusColor(payment.status), 0.1),
                            color: getStatusColor(payment.status),
                            py: 0.5,
                            px: 1.5,
                            borderRadius: 1,
                            display: 'inline-block',
                            fontSize: '0.875rem',
                          }}
                        >
                          {payment.status}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Xem chi tiết">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(payment)}
                            sx={{
                              color: "primary.main",
                              bgcolor: alpha("#3f51b5", 0.1),
                              "&:hover": { bgcolor: alpha("#3f51b5", 0.2) },
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Xóa">
                          <IconButton
                            size="small"
                            onClick={() => handleDeletePayment(payment.id)}
                            sx={{
                              color: "error.main",
                              bgcolor: alpha("#f44336", 0.1),
                              "&:hover": { bgcolor: alpha("#f44336", 0.2) },
                              ml: 1,
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredPayments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        Không tìm thấy thanh toán nào
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredPayments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số hàng mỗi trang:"
          />
        </CardContent>
      </StyledCard>

      <PaymentDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        payment={selectedPayment}
      />
      <EditPaymentModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        payment={selectedPayment}
        onSave={handleSaveEdit}
      />
    </Container>
  );
};

export default PaymentManagement;