import { useEffect } from "react";
import { useAppDispatch } from "@/components/store/hooks";
import { userActions } from "@/components/store/userSlice";
import axios from "axios";
import { User } from "@prisma/client";

export function useGetUserInfo(session: any, callback: () => void) {
  const dispatch = useAppDispatch();
  const { setAuthData } = userActions;

  useEffect(() => {
    const getUserInfo = async (email: User["email"]) => {
      const res = await axios.post("/api/getUser", {
        email: email,
      });
      dispatch(setAuthData(res.data.user));
      callback();
    };

    if (session?.user?.email) {
      getUserInfo(session?.user?.email);
    }
  }, [dispatch, session, setAuthData, callback]);
}