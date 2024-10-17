import React, { useState } from "react";
import "../Stylings/TableContent.css";
import { useSelector } from "react-redux";

const AppliedLoans = () => {

  const { currentUser, loading, error, currentUserLoans } = useSelector(
    (state) => state.user
  );

  const handleSort = (column) => {
  };

  const handleFilter = () => {
    // Implement filter logic here
  };

  return (
    <div className="applied-loans">
      <div className="header">
        <h2>Applied Loans</h2>
        <div className="filter-sort">
          <button onClick={handleSort}>Sort</button>
          <button onClick={handleFilter}>Filter</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Loan Officer</th>
            <th>Amount</th>
            <th>Date Applied</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentUserLoans.map((loan) => {
            const createdAtDate = new Date(loan.createdAt);

            // Format the date and time
            const formattedDate = createdAtDate.toLocaleString("en-US", {
              year: "numeric",
              month: "long", // e.g., 'October'
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            });

            return (
              <tr key={loan.id}>
                <td>{loan.verifierId.username}</td>
                <td>{loan.Money}</td>
                <td>{formattedDate}</td>
                <td>Pending</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedLoans;
