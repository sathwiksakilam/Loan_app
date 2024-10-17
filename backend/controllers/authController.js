import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Loan from "../models/loanmodel.js"; 

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials!"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userLoans = await Loan.find({ userId: validUser._id }).populate({
      path: 'verifierId', 
      select: 'username email', 
    });

    const { password: pass, ...rest } = validUser._doc;
    
    res
      .cookie("access_token", token, {
        httpOnly: true, 
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
      })
      .status(200)
      .json({ 
        user: rest, 
        loans: userLoans,
        token:token,
      });
  } catch (err) {
    next(err);
  }
};

export const getUser = async(req,res,next) =>{
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const loans = await Loan.find({ userId: user._id });
    
    res.json({ success: true, user, loans });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};