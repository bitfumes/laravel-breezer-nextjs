import React, { useContext } from "react";
import reducer from "store/app/reducer";
import states from "store/app/states";

const AppContext = React.createContext(states);
export const useAppStore = () => useContext(AppContext);

export default function AppStoreProvider({ children }: any) {
  const [state, dispatch] = React.useReducer(reducer, { ...states });

  //   function copyIt(text: string) {
  //     navigator.clipboard.writeText(text).then((_) => {
  //       flash("success", "Link Copied to clipboard.");
  //     });
  //   }

  //   function can(user: any): boolean {
  //     const authUser = state.user;
  //     if (authUser.email === process.env.NEXT_PUBLIC_SUPER_ADMIN) {
  //       return true;
  //     }
  //     if (authUser) {
  //       return authUser.id === user.id;
  //     }

  //     return false;
  //   }

  function setLogin(payload: Object) {
    dispatch({ type: "SET_LOGIN", payload });
  }

  const value = { ...state, setLogin };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
