import * as React from "react";
import { useFormik } from "formik";
import Joi from "joi";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import { useNavigate } from "react-router-dom";
import {
  notifySuccess,
  notifyError,
  notifyInfo,
} from "../components/notification/ToastNotification.jsx";

// Reuse các components/styled từ Login
const Card = styled("div")(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.9)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: "450px",
  maxHeight: "600px", // Chiều cao tối đa
  overflowY: "auto", // Thêm scroll chỉ bên trong card
  animation: `${keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  `} 0.5s ease-in-out`,
  zIndex: 10, // Đảm bảo card nằm trên background
}));

const BlurBackground = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "url(https://wallpapers.com/images/hd/hotel-background-bppf56oip6k5puj0.jpg) center/cover no-repeat",
  filter: "blur(5px)", // Thêm blur cho background
  opacity: 0.6, // Giảm opacity
  zIndex: 1,
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  // Custom messages cho Joi validation
  const joiMessages = {
    "string.empty": "Trường này không được để trống",
    "string.min": "Phải có ít nhất {#limit} ký tự",
    "string.email": "Email không hợp lệ",
    "any.only": "Mật khẩu xác nhận không khớp",
  };

  // Validation Schema
  const validationSchema = Joi.object({
    username: Joi.string().min(3).required().messages(joiMessages),
    email: Joi.string().email({ tlds: false }).required().messages(joiMessages),
    password: Joi.string().min(6).required().messages(joiMessages),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages(joiMessages),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const { error } = validationSchema.validate(values, {
        abortEarly: false,
      });
      return error?.details.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.path[0]]: curr.message,
        }),
        {}
      );
    },
    onSubmit: async (values) => {
      // Xử lý đăng ký
      notifySuccess("Test tạm UI đã xong");
    },
  });

  // Các styles chung cho TextField
  const textFieldSx = {
    "& .MuiFormHelperText-root": {
      minHeight: "1.2rem", // Dự trữ không gian cho thông báo lỗi
      transition: "all 0.2s",
    },
  };

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        padding: 2,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background làm mờ */}
      <BlurBackground />

      <Card>
        {/* Tiêu đề */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#2988BC",
            textAlign: "center",
            mb: 2,
          }}
        >
          Đăng ký tài khoản
        </Typography>

        {/* Mô tả */}
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 3,
            color: "#666",
          }}
        >
          Tạo tài khoản để bắt đầu trải nghiệm dịch vụ của chúng tôi
        </Typography>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "grid", gap: 2 }}>
            {/* Tên đăng nhập */}
            <TextField
              fullWidth
              label="Tên đăng nhập"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={!!formik.errors.username}
              helperText={formik.errors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">👤</InputAdornment>
                ),
                sx: { borderRadius: "8px" },
              }}
              sx={textFieldSx}
            />

            {/* Email */}
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={!!formik.errors.email}
              helperText={formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">✉️</InputAdornment>
                ),
                sx: { borderRadius: "8px" },
              }}
              sx={textFieldSx}
            />

            {/* Mật khẩu */}
            <TextField
              fullWidth
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={!!formik.errors.password}
              helperText={formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">🔒</InputAdornment>
                ),
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "👁️" : "🔍"}
                  </IconButton>
                ),
                sx: { borderRadius: "8px" },
              }}
              sx={textFieldSx}
            />

            {/* Xác nhận mật khẩu */}
            <TextField
              fullWidth
              label="Xác nhận mật khẩu"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={!!formik.errors.confirmPassword}
              helperText={formik.errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">🔒</InputAdornment>
                ),
                endAdornment: (
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "👁️" : "🔍"}
                  </IconButton>
                ),
                sx: { borderRadius: "8px" },
              }}
              sx={textFieldSx}
            />

            {/* Nút Đăng ký */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#2988BC",
                "&:hover": { bgcolor: "#1e5f8d" },
                borderRadius: "8px",
                py: 1.5,
                textTransform: "none",
                fontSize: "1.1rem",
                mt: 1,
              }}
              type="submit"
            >
              Đăng ký
            </Button>

            {/* Liên kết đăng nhập */}
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 1,
                color: "#666",
              }}
            >
              Đã có tài khoản?{" "}
              <Link
                href="/"
                sx={{
                  color: "#2988BC",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Đăng nhập ngay
              </Link>
            </Typography>
          </Box>
        </form>
      </Card>

      {/* Footer */}
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          bottom: 20,
          color: "white",
          opacity: 0.8,
          zIndex: 10,
        }}
      >
        © 2024 LuxStay. Tất cả các quyền được bảo lưu.
      </Typography>
    </Stack>
  );
};

export default Register;
