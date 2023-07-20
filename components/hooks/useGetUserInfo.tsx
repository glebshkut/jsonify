import { useAppDispatch } from "@/components/store/hooks";
import { userActions } from "@/components/store/userSlice";
import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function useGetUserInfo() {
  const dispatch = useAppDispatch();
  const { setAuthData } = userActions;
  const { data: session } = useSession();

  useEffect(() => {
    const getUserInfo = async (email: User["email"]) => {
      const res = await axios.post("/api/getUser", {
        email: email,
      });
      dispatch(setAuthData(res.data.user));
    };

    if (session?.user?.email) {
      getUserInfo(session?.user?.email);
    }
  }, [dispatch, session, setAuthData]);
}