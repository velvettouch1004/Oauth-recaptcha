import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  CardActions,
  Avatar,
  Grid,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/apiService"; // Import the API service
import { toast } from "react-toastify"; // Import toast
import GoogleLoginButton from "../components/GoogleLogin";

const SITEKEY = "6LefEnkqAAAAAJ8RtPDkPPuDtPCiK_FPOLqObl7O";

const LoginWithNotifications: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);

  const handleRecaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    console.log("Captcha value:", value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Please complete the CAPTCHA.");
      return;
    }
    try {
      const response = await loginUser(email, password);
      toast.success("Login successful!");
      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
      // Handle success (e.g., redirect, store token)
    } catch (error) {
      setErrorMessage("Invalid email or password");
      toast.error("Login failed. Please check your credentials.");
    }
  };
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 6,
        p: 2,
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Grid container justifyContent="center" mb={2}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          {errorMessage && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              gutterBottom
            >
              {errorMessage}
            </Typography>
          )}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
          />
          <ReCAPTCHA
            sitekey={SITEKEY} // Replace with your site key
            onChange={handleRecaptchaChange}
            style={{ margin: "auto" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ my: 2 }}
          >
            Login
          </Button>
          <GoogleLoginButton />
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          component={Link}
          to="/forgot-password"
          color="secondary"
          size="small"
        >
          Forgot Password?
        </Button>
        <Button component={Link} to="/register" color="secondary" size="small">
          Create an Account
        </Button>
      </CardActions>
    </Card>
  );
};

export default LoginWithNotifications;
