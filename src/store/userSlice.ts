import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/types/interfaces"; 

const initialState: IUser = {
  username: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
