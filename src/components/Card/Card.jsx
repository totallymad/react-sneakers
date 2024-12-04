import { useState } from "react";
import styles from "./Card.module.scss";

// eslint-disable-next-line react/prop-types
export default function Card({ name, price, imgUrl, onClick }) {
  const [isAdded, setIsAdded] = useState(false);

  function handleClickPlus() {
    onClick({ name, price, imgUrl });
    setIsAdded((prevState) => !prevState);
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="/img/heart-unliked.svg" alt="unliked" />
      </div>
      <img width={133} height={112} src={imgUrl} alt="sneakers" />
      <h5>{name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={handleClickPlus}
          src={!isAdded ? "/img/btn-plus.svg" : "/img/btn-checked.svg"}
          alt="plus"
        />
      </div>
    </div>
  );
}
