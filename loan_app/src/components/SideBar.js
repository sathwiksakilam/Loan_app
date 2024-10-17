import React from "react";
import { ReactComponent as SideUserIcon } from "../Icons/SideUserIcon.svg";
import { ReactComponent as DashBoardIcon } from "../Icons/DashBoardIcon.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice';

const SideBar = () => {
  const { currentUser, adminId, verifierId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('http://localhost:5000/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <>
      <div className="UserSideBar">
        <SideUserIcon
          style={{ display: "inline", marginRight: "4px" }}
        ></SideUserIcon>
        {currentUser?.username.toUpperCase()}
      </div>
      <div style={{ marginTop: "10px" }}>
        <div className="SideBarComponents">
          <DashBoardIcon
            style={{ display: "inline", marginRight: "4px" }}
          ></DashBoardIcon>
          DashBoard
        </div>
        {currentUser?._id !== adminId && currentUser?._id !== verifierId && (
          <Link to="/loans" className="no-underline">
            <div className="SideBarComponents">
              <DashBoardIcon style={{ display: "inline", marginRight: "4px" }} />
              Loans
            </div>
          </Link>
        )}

        <div onClick={handleSignOut} className="SideBarComponents" style={{ cursor: "pointer" }}>
          <DashBoardIcon style={{ display: "inline", marginRight: "4px" }}></DashBoardIcon>
          SignOut
        </div>
      </div>
    </>
  );
};

export default SideBar;
