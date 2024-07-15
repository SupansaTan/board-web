import React, { createContext, useReducer, ReactNode, Dispatch } from "react";
import {
  RootAction,
  RootState,
  initialState,
  rootReducer,
} from "../reducer/rootReducer";

const RootStateContext = createContext<
  { state: RootState; dispatch: Dispatch<RootAction> } | undefined
>(undefined);

type RootStateProviderProps = {
  children: ReactNode;
};

const RootStateProvider = ({ children }: RootStateProviderProps) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <RootStateContext.Provider value={{ state, dispatch }}>
      {children}
    </RootStateContext.Provider>
  );
};

const useRootState = () => {
  const context = React.useContext(RootStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export { RootStateProvider, useRootState };
