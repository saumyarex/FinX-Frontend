import React, { useEffect, useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";
import { profileAPI } from "../utils/ApiRequest";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Profile = () => {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                navigate("/login");
            }

            try {
                const { data } = await axios.get(`${profileAPI}/${user._id}`);
                setUserData(data.user);
            } catch (error) {
                toast.error("Failed to fetch user data", {
                    position: "bottom-right",
                    autoClose: 2000,
                });
            }
        };

        fetchUserData();
    }, [navigate]);

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
      }, []);
    
      const particlesLoaded = useCallback(async (container) => {}, []);

    return (
        <div style={{width:"100vw"}}>
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
      <h1 style={{position:"absolute", zIndex:0, marginTop:"30px", marginLeft:"45%", color:"white"}}>User Profile</h1>
        <div className="profile-container" style={{position:"absolute", zIndex:0, width:"100%", height:"100vh", marginTop:"100px"}}>
            {userData ? (
                <div className="profile-details">
                    <div >
                    <img src={userData.avatarImage} alt="Avatar" className="profile-avatar" />
                    </div>
                    <div className="profile-info">
                    <div>
                    <p style={{paddingLeft:"0px"}}><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Email Verified:</strong> {userData.isVerified ? "Yes" : "No"}</p>
                    </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <ToastContainer />
        </div>
        </div>

    );
};

export default Profile;
