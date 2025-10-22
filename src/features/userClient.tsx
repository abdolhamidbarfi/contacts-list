"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useUser } from "./useSlices";

export default function UserClient() {
  const { user, dispatchClearUser, dispatchSetUser } = useUser();

  console.log(user);
  return (
    <div>
      <p>نام: {user.name ?? "مهمان"}</p>
      <p>ایمیل: {user.email ?? "-"}</p>
      <button onClick={dispatchClearUser}>خروج</button>
      <button
        onClick={() => dispatchSetUser("Hamid", "barfibadolhamid@gmail.com")}
      >
        ورود
      </button>
    </div>
  );
}
