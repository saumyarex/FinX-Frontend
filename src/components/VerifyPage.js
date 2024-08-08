// import { dividerClasses } from "@mui/material";
import React from "react";
import { Container, Row, Col } from 'react-bootstrap';


const VerifyPage = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center">Verify Your Email</h2>
          <p className="text-center">Thank you for registering! Please check your email and click on the verification link to activate your account.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyPage;
