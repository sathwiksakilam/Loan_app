import React from "react";
import Card from '../utilities/Card'; // Updated import to use the correct Card component
import '../Stylings/VerifierDashBoard.css'

const VerifierContent = ({allLoans,error}) => {
 
  return (
    <>
      <div className="content">
          <Card name={"ACTIVE USERS"} ></Card>
          <Card name={"BORROWERS"}></Card>
          <Card name={"CASH DISBURSED"}></Card>
          <Card name={"CASH RECIEVED"}></Card>
          <Card name={"SAVINGS"}></Card>
          <Card name={"REPAID LOANS"}></Card>
          <Card name={"OTHER ACCOUNTS"}></Card>
          <Card name={"LOANS"} Value={allLoans.length}></Card>
      </div>
    </>
  );
};

export default VerifierContent;

