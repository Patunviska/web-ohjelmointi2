import { useContext } from "react";
import { UrheiluContext } from "../context/UrheiluContext";

export default function useUrheilijat() {
  return useContext(UrheiluContext);
}
