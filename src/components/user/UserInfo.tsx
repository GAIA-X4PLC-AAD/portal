import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContextProvider";
import {Avatar} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import "./UserInfo.css"
import {HeaderButton} from "../header/style";

const UserInfo = () => {
  const authContext = useContext(AuthContext);
  return (
    <div className="userInfo">
      <div className="userInfo2">
        {/*<Avatar sx={{bgcolor: deepPurple[500]}}>{authContext.username.charAt(0)}</Avatar>*/}
        <Avatar sx={{bgcolor: deepPurple[500]}}>U</Avatar>
        {authContext.hasRole("portal-user") && <p>User</p>}
        {authContext.hasRole("portal-admin") && <p>Admin</p>}
      </div>
      <HeaderButton border={true} onClick={authContext.logout} id="top-menu-signin">
        Logout
      </HeaderButton>
    </div>
  );
};

export default UserInfo;
