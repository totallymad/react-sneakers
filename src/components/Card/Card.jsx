// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import styles from "./Card.module.scss";

// export default function Card({
//   id,
//   name,
//   price,
//   imgUrl,
//   onFavorite,
//   onClick,
//   favorited,
//   isOnCart,
// }) {
//   const [isAdded, setIsAdded] = useState(isOnCart);
//   const [isFavorite, setIsFavorite] = useState(favorited);

//   useEffect(() => {
//     // Обновляем локальное состояние, если пропсы изменились
//     setIsAdded(isOnCart);
//     setIsFavorite(favorited);
//   }, [isOnCart, favorited]);

//   async function handleClickPlus() {
//     // Передаем объект для обработки
//     await onClick({ id, name, price, imgUrl, isOnCart: isAdded });
//     // Локальное переключение состояния
//     setIsAdded((prev) => !prev);
//   }

//   async function handleFavorite() {
//     // Передаем объект для обработки
//     await onFavorite({ id, name, price, imgUrl, isFavorite });
//     // Локальное переключение состояния
//     setIsFavorite((prev) => !prev);
//   }

//   return (
//     <div className={styles.card}>
//       <div className={styles.favorite}>
//         <img
//           onClick={handleFavorite}
//           src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
//           alt={isFavorite ? "liked" : "unliked"}
//         />
//       </div>
//       <img width={133} height={112} src={imgUrl} alt="sneakers" />
//       <h5>{name}</h5>
//       <div className="d-flex justify-between align-center">
//         <div className="d-flex flex-column">
//           <span>Цена:</span>
//           <b>{price} руб.</b>
//         </div>
//         <img
//           className={styles.plus}
//           onClick={handleClickPlus}
//           src={!isAdded ? "/img/btn-plus.svg" : "/img/btn-checked.svg"}
//           alt="plus"
//         />
//       </div>
//     </div>
//   );
// }

/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Card.module.scss";

export default function Card({
  id,
  name,
  price,
  imgUrl,
  onFavorite,
  onClick,
  favorited,
  isOnCart,
}) {
  const [isFavorite, setIsFavorite] = useState(favorited);

  async function handleClickPlus() {
    // Передаем объект для обработки
    await onClick({ id, name, price, imgUrl, isOnCart });
  }

  async function handleFavorite() {
    // Передаем объект для обработки
    await onFavorite({ id, name, price, imgUrl, isFavorite });
    // Локальное переключение состояния
    setIsFavorite((prev) => !prev);
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          onClick={handleFavorite}
          src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
          alt={isFavorite ? "liked" : "unliked"}
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
          src={!isOnCart ? "/img/btn-plus.svg" : "/img/btn-checked.svg"}
          alt="plus"
        />
      </div>
    </div>
  );
}
