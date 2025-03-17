import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Card,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ReceiptIcon from "@mui/icons-material/Receipt";
import moment from "moment";
import Header from "./header";
import RoomService from "../../service/RoomService";
import { toast } from "react-toastify";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
}));

const PaymentHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPaymentHistory();
  }, []);

  const loadPaymentHistory = async () => {
    try {
      const response = await RoomService.getPaymentHistory();
      setPayments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading payment history:", error);
      toast.error("Failed to load payment history. Please try again later.");
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <div>
      <Header />    
      <Card sx={{ p: 3, m: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <ReceiptIcon color="primary" />
            Payment History
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Payment ID</StyledTableCell>
                <StyledTableCell>Booking ID</StyledTableCell>
                <StyledTableCell>Amount ($)</StyledTableCell>
                <StyledTableCell>Payment Date</StyledTableCell>
                <StyledTableCell>Method</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    No payment history found
                  </TableCell>
                </TableRow>
              ) : (
                payments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((payment) => (
                    <TableRow key={payment._id} hover>
                      <TableCell>{payment._id}</TableCell>
                      <TableCell>{payment.booking_id}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>
                        {moment(payment.payment_date).format(
                          "MMM DD, YYYY HH:mm"
                        )}
                      </TableCell>
                      <TableCell sx={{ textTransform: "capitalize" }}>
                        {payment.method.replace("_", " ")}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={payment.status}
                          color={getStatusColor(payment.status)}
                          size="small"
                          sx={{ textTransform: "capitalize" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={payments.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </div>
  );
};

export default PaymentHistory;
