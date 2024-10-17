import React,{ useEffect, useState } from 'react';
import Sidebar from './SideBar'; 
import '../Stylings/VerifierDashBoard.css'
import AdminContent from './AdminContent';
import AdminTable from './AdminTable';
import { useSelector } from "react-redux";

const MainLayout = ({ sidebarOpen }) => {
    const { adminId } = useSelector((state) => state.user);
    const [allLoans, setAllLoans] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLoans = async () => {
          try {
            const res = await fetch(`http://localhost:5000/api/loan/getAllLoans`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            
            if (!res.ok) {
              const errorData = await res.json();
              setError(errorData.message || "Failed to fetch loans");
              return;
            }
    
            const data = await res.json();
            setAllLoans(data.allLoans || []);
          } catch (err) {
            setError("An error occurred while fetching loans.");
          }
        };
        if (adminId) {
          fetchLoans();
        }
      }, [adminId]);
  return (
    <div style={{ display: 'flex'}}>
      {sidebarOpen && (
        <div className='sidebar'>
          <Sidebar />
        </div>
      )}
      <div style={{ flexGrow: 1, padding: '20px', backgroundColor: '#FFFFFF' }}>
        <AdminContent allLoans={allLoans} error={error} />
        <AdminTable allLoans={allLoans} error={error}/>
      </div>
    </div>
  );
};

export default MainLayout;
