/* eslint-disable react/prop-types */
import { useContext } from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";

export default function Home({
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddFavorite,
  onAddToCart,
  isLoading,
}) {
  const { items } = useContext(AppContext);

  function renderItems() {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return isLoading
      ? [...Array(12)].map((_, index) => <Card key={index} isLoading={true} />)
      : filteredItems.map((card) => (
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
            isLoading={isLoading}
          />
        ));
  }
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

        <div className="card-wrapper d-flex flex-wrap">{renderItems()}</div>
      </div>
    </>
  );
}
