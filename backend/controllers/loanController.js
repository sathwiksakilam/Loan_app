import Loan from "../models/loanmodel.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";

export const loan = async (req, res, next) => {
  const { Name, Money, LoanTenure, EmploymentStatus, Reason, EmploymentAddress, userId, verifierId } = req.body;

  const newLoan = new Loan({
    Name,
    Money,
    LoanTenure,
    EmploymentStatus,
    Reason,
    EmploymentAddress,
    userId,
    verifierId,
  });

  try {
    const savedLoan = await newLoan.save();
    const populatedLoan = await Loan.findById(savedLoan._id).populate({
      path: 'verifierId',
      select: 'username email'
    });

    if (!populatedLoan) {
      return next(errorHandler(404, "Loan not found after saving!"));
    }

    res.status(201).json({
      message: "Loan Process Started Successfully",
      loan: populatedLoan,
    });
  } 
  catch (err) {
    next(err);
  }
};

export const verifierLoan = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return next(errorHandler(400, "Invalid verifier ID!"));
  }

  try {
    const loans = await Loan.find({ verifierId: id });
    if (loans.length === 0) {
      return res.status(404).json({
        message: "No loans found for this verifier.",
      });
    }

    res.status(200).json({
      allLoans: loans,
    });
  } catch (err) {
    next(err);
  }
};

export const getLoans = async (req, res, next) => {
  try {
    const loans = await Loan.find({});
    if (loans.length === 0) {
      return res.status(404).json({
        message: "No loans found in the database.",
      });
    }
    res.status(200).json({
      allLoans: loans,
    });
  } catch (err) {
    next(err);
  }
};