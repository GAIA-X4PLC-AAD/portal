import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContextProvider";
import {Avatar} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import "./UserInfo.css"
import * as S from "../header/style";

const UserInfo = () => {
  const authContext = useContext(AuthContext);
  return (
    <div className="userInfo">
      <div className="userInfo2">
        <Avatar sx={{bgcolor: deepPurple[500]}}>{authContext.username.charAt(0)}</Avatar>
        {authContext.hasRole("portal-user") && <p>User</p>}
        {authContext.hasRole("portal-admin") && <p>Admin</p>}
      </div>
      <S.HeaderButton border={true} onClick={authContext.logout} id="top-menu-signin">
        Logout
      </S.HeaderButton>
    </div>
  );
};

export default UserInfo;
