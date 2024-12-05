import Card from "../components/Card/Card";

/* eslint-disable react/prop-types */
export default function Favorites({ items, onAddFavorite }) {
  console.log(items);
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
                id={card.id}
                key={card.id}
                name={card.name}
                price={card.price}
                imgUrl={card.imgUrl}
                favorited={card.isFavorite}
                onFavorite={onAddFavorite}
              />
            ))}
        </div>
      </div>
    </>
  );
}
