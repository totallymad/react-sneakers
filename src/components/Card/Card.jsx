/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Card.module.scss";

export default function Card({
  id,
  name,
  price,
  imgUrl,
  onClick,
  onFavorite,
  favorited = false,
}) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setisFavorite] = useState(favorited);

  function handleClickPlus() {
    onClick({ name, price, imgUrl });
    setIsAdded((prevState) => !prevState);
  }

  function handleFavorite() {
    onFavorite({ id, name, price, imgUrl });
    setisFavorite((prev) => !prev);
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          onClick={handleFavorite}
          src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
          alt="unliked"
        />
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
