import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Money: {
      type: Number,
      required: true,
    },
    LoanTenure: {
      type: Number,
      required: true,
    },
    EmploymentStatus: {
      type: String,
      required: true,
    },
    Reason: {
      type: String,
      required: true,
    },
    EmploymentAddress: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verifierId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

const Loan = mongoose.model("loan", loanSchema);
export default Loan;
