import { StoreSchema } from "@/components/store/store";
import { DeepPartial } from "@reduxjs/toolkit";

export const getUserRole = (state: DeepPartial<StoreSchema>) =>
  state?.user?.authData?.role;
