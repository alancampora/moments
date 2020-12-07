import React, { useState } from "react";

export type User = {
  displayName?: string;
  photoURL?: string;
};

export type UserContextT = {
  user: User;
  setUser: (user: any) => void;
};

const initialState: UserContextT = {
  user: { displayName: "", photoURL: "" },
  setUser: () => null,
};

const UserContext = React.createContext(initialState);

function UserProvider(props) {
  const [user, setUser] = useState({ user: { displayName: "" } });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
export { UserContext, UserProvider };
