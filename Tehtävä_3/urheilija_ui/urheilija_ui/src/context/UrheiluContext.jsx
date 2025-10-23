import { createContext, useEffect, useReducer } from "react";
import {
  haeUrheilijat,
  lisaaUrheilija,
  paivitaUrheilija,
  poistaUrheilija,
} from "../api/urheiluService";

// eslint-disable-next-line react-refresh/only-export-components
export const UrheiluContext = createContext();

const alkutila = { urheilijat: [] };

function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return { urheilijat: action.items };
    case "ADD":
      return { urheilijat: [action.item, ...state.urheilijat] };
    case "UPDATE":
      return {
        urheilijat: state.urheilijat.map((u) =>
          u.id === action.item.id ? action.item : u
        ),
      };
    case "DELETE":
      return { urheilijat: state.urheilijat.filter((u) => u.id !== action.id) };
    default:
      return state;
  }
}

export function UrheiluProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, alkutila);

  useEffect(() => {
    (async () => {
      const lista = await haeUrheilijat();
      dispatch({ type: "SET", items: lista });
    })();
  }, []);

  const lisaa = async (data) => {
    const created = await lisaaUrheilija(data);
    dispatch({ type: "ADD", item: created });
    return created;
  };

  const paivita = async (id, data) => {
    const updated = await paivitaUrheilija(id, data);
    dispatch({ type: "UPDATE", item: updated });
    return updated;
  };

  const poista = async (id) => {
    await poistaUrheilija(id);
    dispatch({ type: "DELETE", id });
  };

  const arvo = {
    urheilijat: state.urheilijat,
    lisaa,
    paivita,
    poista,
  };

  return (
    <UrheiluContext.Provider value={arvo}>{children}</UrheiluContext.Provider>
  );
}
