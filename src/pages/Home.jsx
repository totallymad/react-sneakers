/* eslint-disable react/prop-types */
import Card from "../components/Card/Card";

export default function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddFavorite,
  onAddToCart,
}) {
  return (
    <>
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            {searchValue ? `Поиск по запросу "${searchValue}"` : "Все кросовки"}
          </h1>
          <div className="search-block d-flex">
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className="clear-input cu-p"
                src="/img/btn-remove.svg"
                alt="remove"
              />
            )}
            <img src="/img/search.svg" alt="search" />
            <input
              value={searchValue}
              onChange={onChangeSearchInput}
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((card) => (
              <Card
                key={card.id}
                id={card.id}
                name={card.name}
                price={card.price}
                imgUrl={card.imgUrl}
                favorited={card.isFavorite}
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
