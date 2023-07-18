import { configureStore } from "@reduxjs/toolkit";
import { UserStateSchema, userSlice } from "./userSlice";

export interface StoreSchema {
  user: UserStateSchema;
}

const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch