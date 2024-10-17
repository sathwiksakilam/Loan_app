import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import Navbar from "../components/Navbar";
import MainLayout from "../components/MainContent";

const VerifierDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const { currentUser, loading, error,adminId,verifierId} = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
    else if (!currentUser || currentUser._id!==verifierId) 
    {
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
  }, [currentUser, error, loading, navigate,verifierId,adminId]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <MainLayout sidebarOpen={sidebarOpen} />
    </>
  );
};

export default VerifierDashBoard;
