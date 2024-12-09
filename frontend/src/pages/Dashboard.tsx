import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const Dashboard: React.FC = () => {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  
  const onLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Hi, {decodedToken && (decodedToken as any).username}
      </Typography>
      <Button variant="contained" color="secondary" onClick={onLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
