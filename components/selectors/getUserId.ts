import { StoreSchema } from "@/components/store/store";
import { DeepPartial } from "@reduxjs/toolkit";

export const getUserId = (state: DeepPartial<StoreSchema>) =>
  state?.user?.authData?.id;
