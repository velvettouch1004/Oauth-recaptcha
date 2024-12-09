import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Grid,
  CardActions,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/apiService";
import { toast } from "react-toastify";

const ForgotPasswordWithLinks: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email);
      toast.success(response.data.message);
    } catch (error) {
      if (error instanceof Error && (error as any).response) {
        toast.error(((error as any).response as any).data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
    alert("If an account with that email exists, a reset link has been sent.");
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
            <MailOutlineIcon />
          </Avatar>
        </Grid>
        <Typography variant="h5" gutterBottom align="center">
          Forgot Password
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" mb={2}>
          Enter your email address and we'll send you a link to reset your
          password.
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Send Reset Link
          </Button>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button component={Link} to="/login" color="secondary" size="small">
          Back to Login
        </Button>
        <Button component={Link} to="/register" color="secondary" size="small">
          Create an Account
        </Button>
      </CardActions>
    </Card>
  );
};

export default ForgotPasswordWithLinks;
