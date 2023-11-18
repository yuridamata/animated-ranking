import React, { createContext, useState, ReactNode } from "react";

interface AppContextProps {
  globalLoading: boolean;
  setGlobalLoading: (value: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
  globalLoading: false,
  setGlobalLoading: () => {},
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [globalLoading, setGlobalLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{ globalLoading: globalLoading, setGlobalLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};
