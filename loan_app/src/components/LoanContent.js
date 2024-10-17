import React, { useState } from "react";
import "../Stylings/LoansDashboard.css";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { loanSubmissionFailure,loanSubmissionSuccess,loanSubmissionStart } from "../redux/user/userSlice";
import { ReactComponent as LoanIcon1 } from "../Icons/LoanIcon1.svg";
import { ReactComponent as LoanInside } from "../Icons/LoanInside.svg";
import { ReactComponent as SearchIcon } from "../Icons/SearchIcon.svg";

const LoanContent = () => {
  const [showForm, setShowForm] = useState(false);
  const { currentUser, loading, error,currentUserLoans,verifierId} = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    Name: "",
    Money: "",
    LoanTenure: "",
    EmploymentStatus: "",
    Reason: "",
    EmploymentAddress: "",
    userId:currentUser?._id,
    verifierId:verifierId
  });
  console.log(currentUserLoans);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleForm();
    dispatch(loanSubmissionStart());
    try {
      const res = await fetch("http://localhost:5000/api/loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        dispatch(loanSubmissionFailure(errorData));
        return;
      }
      const data = await res.json();
      dispatch(loanSubmissionSuccess(data));
    } 
    catch (error) {
      console.log(error.message);
      dispatch(loanSubmissionFailure(error.message));
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="app-container">
      <div className="top-section">
        <div className="deficit">
          <LoanIcon1 style={{ marginRight: "3px" }}>
            <LoanInside style={{ zIndex: "90" }} />
          </LoanIcon1>

          <div className="amount-details">
            <span className="deficit-text">DEFICIT</span>
            <h2 className="amount">₦ 0.0</h2>
          </div>
        </div>
        <button className="loan-button" onClick={toggleForm}>
          Get A Loan
        </button>
      </div>

      <div className="tabs-section">
        <button className="tab active-tab">Borrow Cash</button>
        <button className="tab">Transact</button>
        <button className="tab">Deposit Cash</button>
      </div>

      <div className="search-bar">
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search for loans"
            className="search-input"
          />
        </div>
      </div>

      {showForm && (
        <div className="loan-form-overlay">
          <div className="loan-form">
            <h2>Apply For a Loan</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="Name">
                Full name as it appears on bank account:
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                required
                onChange={handleChange}
              />

              <label htmlFor="Money">How much do you need?</label>
              <input
                type="number"
                id="Money"
                name="Money"
                required
                onChange={handleChange}
              />

              <label htmlFor="LoanTenure">Loan tenure in months:</label>
              <input
                type="number"
                id="LoanTenure"
                name="LoanTenure"
                required
                onChange={handleChange}
              />

              <label htmlFor="EmploymentStatus">Employment Status</label>
              <input
                type="string"
                id="EmploymentStatus"
                name="EmploymentStatus"
                required
                onChange={handleChange}
              />

              <label htmlFor="Reason">Reason For Loan</label>
              <input
                type="string"
                id="Reason"
                name="Reason"
                required
                onChange={handleChange}
              />

              <label htmlFor="EmploymentAddress">Employment Address</label>
              <input
                type="string"
                id="EmploymentAddress"
                name="EmploymentAddress"
                required
                onChange={handleChange}
              />

              <button
                className="close-form-button"
                style={{ backgroundColor: "#4CAF50" }}
                type="submit"
              >
                Submit
              </button>
            </form>
            <button onClick={toggleForm} className="close-form-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanContent;
