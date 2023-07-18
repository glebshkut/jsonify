import { User } from "@/lib/types";
import { DeepPartial, PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserStateSchema {
  authData: User;
}

const initialState: DeepPartial<UserStateSchema> = {
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    setSignOut: (state) => {
      state.authData = {};
    },
    updateUserRole: (state, action: PayloadAction<User>) => {
      if (state.authData) {
        state.authData.role = action.payload.role;
      }
    }
  }
})


export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;