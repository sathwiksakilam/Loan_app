import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../Stylings/UserStylings.css";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // import useSelector

const UserDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const { currentUser, loading, error,adminId,verifierId} = useSelector((state) => state.user);
  const navigate = useNavigate();
  


  useEffect(() => {
    if (error) {
      setShowError(true);
    }
    else if (!currentUser) {
      navigate("/login");
    }
    else if(currentUser._id === adminId)
    {
      navigate("/admindashboard")
    }
    else if(currentUser._id=== verifierId)
    {
      navigate("/verifierdashboard")
    }
    else{
      navigate("/");
    }
  }, [currentUser, error, loading, navigate,adminId,verifierId]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div style={{ display: "flex", marginTop: "8px" }}>
        {sidebarOpen && (
          <div className="sidebarUser">
            <SideBar />
          </div>
        )}
        <div className="Content_User">
          <h1>Welcome {currentUser?.username || "User"}</h1>
        </div>
      </div>
      {showError && <p className="error-message">An error occurred: {error}</p>}
    </>
  );
};

export default UserDashBoard;
