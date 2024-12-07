import { useEffect, useState } from "react";

import Card from "../components/Card/Card";
import Info from "../components/Info";

import axios from "axios";
import { useNavigate } from "react-router";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios(
          "https://6750184969dc1669ec19a427.mockapi.io/orders"
        );

        setOrders(data);
      } catch (error) {
        console.error("Ошибка при запросе заказов", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="content p-40">
        <div className="d-flex align-center mb-40">
          <img
            onClick={() => navigate(-1)}
            className="cu-p mr-20"
            src="/img/back-btn.png"
            alt="back button"
          />
          <h1>Мои заказы</h1>
        </div>
        <div>
          {isLoading ? (
            <p>Загрузка</p>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id}>
                <h3>Заказ №{order.id}</h3>
                <div className="d-flex card-wrapper flex-wrap">
                  {order.items.map((card) => (
                    <Card
                      key={card.id}
                      name={card.name}
                      price={card.price}
                      imgUrl={card.imgUrl}
                      type="orders"
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <Info
              title="У вас нет заказов"
              descr="Оформите хотя бы один заказ."
              img="/img/no-orders-smile.png"
              alt="no ordrs"
            />
          )}
        </div>
      </div>
    </>
  );
}
