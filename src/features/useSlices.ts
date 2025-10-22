// features/userSlice.ts
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string | null;
  email?: string | null;
};

const initialState: UserState = {
  name: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.name = action.payload.name;
      state.email = action.payload.email ?? null;
    },
    clearUser(state) {
      state.name = null;
      state.email = null;
    },
  },
});

const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

export function useUser() {
  const user = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();

  const dispatchClearUser = () => dispatch(clearUser());
  const dispatchSetUser = (name: string, email: string) =>
    dispatch(setUser({ name, email }));
  return { user, dispatchClearUser, dispatchSetUser };
}
