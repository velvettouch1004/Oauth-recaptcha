import React, { useState } from "react";
import {
  Box,
  Card,
  Button,
  TextField,
  Typography,
  Grid,
  Avatar,
  CardContent,
  CardActions,
} from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined"; // New icon for registration
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLogin";
import { registerUser } from "../api/apiService";

const RegisterComponent: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username || !email || !password) {
      setErrorMessage("All fields are required");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }
    // Clear error and handle form submission logic here
    setErrorMessage("");
    console.log("Form submitted:", { username, email, password });
    try {
      const response = await registerUser(username, email, password);
      if (response.data.success) {
        console.log("Registration successful:", response.data);
        navigate("/login");         
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      
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
            <PersonAddOutlinedIcon />
          </Avatar>
        </Grid>
        <Typography variant="h5" gutterBottom align="center">
          Register
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
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            variant="outlined"
          />
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ my: 2 }}
          >
            Register
          </Button>
          <GoogleLoginButton />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button component={Link} to="/login" color="secondary" size="small">
          Do you have already account?
        </Button>
      </CardActions>
    </Card>
  );
};

export default RegisterComponent;
