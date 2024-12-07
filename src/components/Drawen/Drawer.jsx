import { useContext, useState } from "react";
import AppContext from "../../context";
import Info from "../Info";
import axios from "axios";

import styles from "./Drawer.module.scss";

// eslint-disable-next-line react/prop-types
export default function Drawer({ onClose, onDelete, opened }) {
  const { items, setItems } = useContext(AppContext);

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleOrderSet() {
    const orderedItems = items.filter((item) => item.isOnCart === true);
    setOrderComplete(true);
    setIsLoading(true);

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    try {
      const response = await axios.post(
        "https://6750184969dc1669ec19a427.mockapi.io/orders",
        { items: orderedItems }
      );
      setOrderId(response.data.id);

      for (const item of orderedItems) {
        await axios.put(
          `https://6750184969dc1669ec19a427.mockapi.io/Items/${item.id}`,
          { isOnCart: false }
        );
        await delay(200);
      }

      const res = await axios.get(
        "https://6750184969dc1669ec19a427.mockapi.io/Items"
      );
      setItems(res.data);
    } catch (error) {
      console.error("Ошибка при отправке заказа или очистке корзины", error);
    } finally {
      setIsLoading(false);
    }
  }

  const orderPrice = items
    .filter((item) => item.isOnCart)
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      className={`${styles.overlay} ${opened ? styles.overlayVisible : ""} `}
    >
      <div className={styles.drawer}>
        {items.filter((item) => item.isOnCart).length > 0 ? (
          <>
            <h2 className="d-flex justify-between mb-30">
              Корзина
              <img
                onClick={onClose}
                className="removeBtn cu-p"
                src="/img/btn-remove.svg"
                alt="remove"
              />
            </h2>

            <div className="items flex">
              {items
                .filter((item) => item.isOnCart)
                .map((item) => (
                  <div
                    key={item.id}
                    className="cartItem d-flex align-center mb-20"
                  >
                    <div
                      style={{ backgroundImage: `url(${item.imgUrl})` }}
                      className="cartItemImg"
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{item.name}</p>
                      <b>{item.price} руб.</b>
                    </div>
                    <img
                      onClick={() => onDelete(item)}
                      className="removeBtn"
                      src="/img/btn-remove.svg"
                      alt="remove"
                    />
                  </div>
                ))}
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{orderPrice} руб.</b>
                </li>
                <li>
                  <span>Чаевые 5%</span>
                  <div></div>
                  <b>{Math.round(orderPrice * 0.05)} руб.</b>
                </li>
              </ul>
              <button
                onClick={handleOrderSet}
                className="button button-full"
                disabled={isLoading}
              >
                {isLoading ? "Оформляем заказ..." : "Оформить заказ"}
                <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={orderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            descr={
              orderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            img={orderComplete ? "/img/order.png" : "/img/cart.png"}
            alt={orderComplete ? "order" : "empty cart"}
            type="drawen"
          />
        )}
      </div>
    </div>
  );
}
