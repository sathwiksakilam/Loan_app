import React from "react";
import "../Stylings/TableContent.css";

const AppliedLoans = ({allLoans,error}) => {
  
  const handleSort = (column) => {
    // Implement sort logic here
  };

  const handleFilter = () => {
    // Implement filter logic here
  };

  return (
    <div className="applied-loans">
      <div className="header">
        <h2>Recent Loans</h2>
        <div className="filter-sort">
          <button onClick={handleSort}>Sort</button>
          <button onClick={handleFilter}>Filter</button>
        </div>
      </div>
      {error && <div className="error">{error}</div>} {/* Display error if any */}
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allLoans.map((loan) => {
            const createdAtDate = new Date(loan.createdAt);
            const formattedDate = createdAtDate.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            });
            return (
              <tr key={loan._id}>
                <td>{loan.Name || "N/A"}</td>
                <td>{formattedDate}</td>
                <td>{loan.Reason}</td>
                <td>{loan.status || "Pending"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedLoans;
