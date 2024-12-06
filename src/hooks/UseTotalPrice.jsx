import { useContext } from "react";
import AppContext from "../context";

export default function useTotalPrice() {
  const { items } = useContext(AppContext);

  const orderPrice = items
    .filter((item) => item.isOnCart)
    .reduce((sum, item) => sum + item.price, 0);

  return { orderPrice };
}
