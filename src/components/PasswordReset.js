import React, { useState,useCallback } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { passwordRestAPI } from '../utils/ApiRequest';
import { Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PasswordReset = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const verificationToken = query.get('token');
      console.log(verificationToken); // Debugging line
      const response = await axios.post(passwordRestAPI, { token: verificationToken, newPassword: password });
      setMessage(response.data.message);
      setError('');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred');
      setMessage('');
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  return (
    <div>
              <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#000",
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ffcc00",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: 3,
              random: { enable: true, minimumValue: 1 },
            },
            links: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 2,
            },
            life: {
              duration: {
                sync: false,
                value: 3,
              },
              count: 0,
              delay: {
                random: {
                  enable: true,
                  minimumValue: 0.5,
                },
                value: 1,
              },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
            <div style={{display:'flex',flexDirection:'column', alignItems:"center", marginLeft:'35%',position: "absolute",zIndex: 0}}>
      <h2 style={{color:'white'}}>Reset Password</h2> 
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{color:'white'}}>New Password:</label>
          <input
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{marginLeft:'76px'}}
          />
        </div>
        <div style={{marginTop:'10px'}}>
          <label style={{color:'white'}}>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{marginLeft:'10px'}}
          />
        </div>
        <Button type="submit" style={{marginLeft:'120px', marginTop:'20px'}}>Reset Password</Button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>

  );
};

export default PasswordReset;
