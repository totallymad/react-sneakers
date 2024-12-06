import { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";
import axios from "axios";

/* eslint-disable react/prop-types */
export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios(
          "https://6750184969dc1669ec19a427.mockapi.io/orders"
        );

        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        console.log("Ошибка при запросе заказов", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Мои заказы</h1>
        </div>

        <div className="d-flex flex-wrap">
          {/* {orders.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              price={card.price}
              imgUrl={card.imgUrl}
              isFavorite={card.isFavorite}
              isOnCart={card.isOnCart}
              onFavorite={(obj) => onAddFavorite(obj)}
              onClick={(obj) => onAddToCart(obj)}
            />
          ))} */}
        </div>
      </div>
    </>
  );
}
