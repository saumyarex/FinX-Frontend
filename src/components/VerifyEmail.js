import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyEmailAPI } from "../utils/ApiRequest";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const verificationToken = searchParams.get('token'); // Extract token from URL
      console.log(verificationToken)

      if (verificationToken) {
        try {
          // const response = await axios.get(`/api/auth/verify-email?token=${verificationToken}`);
          const response = await axios.get(verifyEmailAPI, {
            params: { token: verificationToken }
          });
          if (response.data.success) {
            setMessage("Your email has been verified successfully!");
          } else {
            setMessage(response.data.message || "An error occurred while verifying your email.");
          }
        } catch (error) {
          setMessage("An error occurred while verifying your email.");
          console.error("Verification error:", error);
          toast.error("Verification failed. Please try again.");
        }
      } else {
        setMessage("Invalid verification link.");
      }
      setLoading(false);
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center">Verify Your Email</h2>
          {loading ? (
            <p className="text-center">Verifying...</p>
          ) : (
            <p className="text-center">{message}</p>
          )}
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default VerifyEmail;
