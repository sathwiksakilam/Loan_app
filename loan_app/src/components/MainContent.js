import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import VerifierContent from "./VerifierContent";
import "../Stylings/VerifierDashBoard.css";
import VerifierTable from "./VerifierTable";
import { useSelector } from "react-redux";


const MainLayout = ({ sidebarOpen }) => {
  const { verifierId } = useSelector((state) => state.user);
  const [verifierLoans, setVerifierLoans] = useState([]);
  const [error, setError] = useState(null);

  console.log(verifierLoans);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/loan/verifyloanRouter/${verifierId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.message || "Failed to fetch loans");
          return;
        }

        const data = await res.json();
        setVerifierLoans(data.allLoans || []);
      } catch (err) {
        setError("An error occurred while fetching loans.");
      }
    };
    if (verifierId) {
      fetchLoans();
    }
  }, [verifierId]);

  return (
    <div style={{ display: "flex" }}>
      {sidebarOpen && (
        <div className="sidebar">
          <Sidebar />
        </div>
      )}
      <div style={{ flexGrow: 1, padding: "20px", backgroundColor: "#FFFFFF" }}>
        <VerifierContent verifierLoans={verifierLoans} error={error} />
        <VerifierTable verifierLoans={verifierLoans} error={error} />
      </div>
    </div>
  );
};

export default MainLayout;
