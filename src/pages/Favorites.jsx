import { useContext } from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";
import Info from "../components/Info";
import { useNavigate } from "react-router";

/* eslint-disable react/prop-types */
export default function Favorites({ onAddFavorite, onAddToCart }) {
  const { items } = useContext(AppContext);

  const favoriteItems = items.filter((item) => item.isFavorite);

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
          <h1>Мои закладки</h1>
        </div>

        <div className="d-flex flex-wrap card-wrapper">
          {favoriteItems.length > 0 ? (
            items
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
              ))
          ) : (
            <Info
              title="Закладок нет :("
              descr="Вы ничего не добавляли в закладки"
              img="/img/no-favorites-smile.png"
              alt="no favorites"
            />
          )}
        </div>
      </div>
    </>
  );
}
