import React from "react";
import { Button, Container, Typography } from "@mui/material";

const Homepage: React.FC = () => {
  const onLogin = () => {
    window.location.href = "/login";
  };
  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Homepage
      </Typography>
      <Button variant="contained" color="primary" onClick={onLogin}>
        Get Started
      </Button>
    </Container>
  );
};

export default Homepage;
