import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

export interface UserEntity {
  id: string;
  nombre: string;
  rol: string;
  pedidos: Pedido[];
}

export interface Pedido {
  id: string;
  cantidad: number;
  estado: string;
  producto: {
    id: string;
    precio: number;
    nombre: string;
  };
}

export interface GlobalStateInterface {
  authenticated?: boolean;
  user: UserEntity;
}

const GlobalStateContext = createContext({
  state: {} as GlobalStateInterface,
  setState: {} as Dispatch<SetStateAction<GlobalStateInterface>>,
});

const initialState: GlobalStateInterface = {
  user: { id: "0", nombre: "", pedidos: [], rol: "" },
};

const GlobalStateProvider = ({
  children,
  value = initialState as GlobalStateInterface,
}: {
  children: React.ReactNode;
  value?: GlobalStateInterface;
}) => {
  const [state, setState] = useState(value);
  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };
