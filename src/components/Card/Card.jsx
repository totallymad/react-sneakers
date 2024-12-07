/* eslint-disable react/prop-types */
// import { useState } from "react";
import ContentLoader from "react-content-loader";

import styles from "./Card.module.scss";

export default function Card({
  id,
  name,
  price,
  imgUrl,
  onFavorite,
  onClick,
  isFavorite,
  isOnCart,
  isLoading,
  type,
}) {
  async function handleClickPlus() {
    await onClick({ id, name, price, imgUrl, isOnCart });
  }

  async function handleFavorite() {
    await onFavorite({ id, name, price, imgUrl, isFavorite });
  }

  return (
    <div className={styles.card}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={175}
          height={245}
          viewBox="0 0 150 187"
          backgroundColor="#f2f2f2"
          foregroundColor="#d1d1d1"
        >
          <rect x="0" y="0" rx="3" ry="3" width="150" height="90" />
          <rect x="0" y="100" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="123" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="155" rx="8" ry="8" width="80" height="24" />
          <rect x="117" y="149" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            {type ? null : (
              <img
                onClick={handleFavorite}
                src={
                  isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
                }
                alt={isFavorite ? "liked" : "unliked"}
              />
            )}
          </div>
          <img width={133} height={112} src={imgUrl} alt="sneakers" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {type ? null : (
              <img
                className={styles.plus}
                onClick={handleClickPlus}
                src={!isOnCart ? "/img/btn-plus.svg" : "/img/btn-checked.svg"}
                alt={isOnCart ? "checked" : "plus"}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
