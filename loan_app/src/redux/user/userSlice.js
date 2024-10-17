import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  adminId: "6710860864c83774b7990f3c",
  verifierId: "6710278a4e6c330b836508d4",
  currentUserLoans: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.currentUserLoans = action.payload.loans;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.currentUserLoans = [];
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    loanSubmissionStart:(state) =>{
      state.loading = true;
      state.error = null;
    },
    loanSubmissionSuccess:(state,action) =>{
      state.loading = false;
      state.error = null;
      state.currentUserLoans = [...state.currentUserLoans,action.payload.loan];
    },
    loanSubmissionFailure:(state,action) =>{
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
  loanSubmissionStart,
  loanSubmissionSuccess,
  loanSubmissionFailure,
} = userSlice.actions;

export default userSlice.reducer;
