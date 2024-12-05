import { useContext } from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";

/* eslint-disable react/prop-types */
export default function Favorites({ onAddFavorite, onAddToCart }) {
  const { items } = useContext(AppContext);

  return (
    <>
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Мои закладки</h1>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) => item.isFavorite)
            .map((card) => (
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
            ))}
        </div>
      </div>
    </>
  );
}
