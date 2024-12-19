"use client";
// hooks/useAuth.js
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { CurrentUser } from "@/redux/Auth/apis";
import { GetToken } from "@/components/Server/Cookies";

// customer hook view
const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const GetCurrentUser = async () => {
    let getAuth = await GetToken();
    console.log("this is token---", getAuth);
    if (getAuth) {
      if (getAuth?.value) {
        await dispatch(CurrentUser({ token: getAuth?.value }));
      }
    }
  };

  return {
    GetCurrentUser,
  };
};

export default useAuth;
