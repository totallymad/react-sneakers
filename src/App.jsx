import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch("https://6750184969dc1669ec19a427.mockapi.io/Items")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  function handleOpenDrawen() {
    setCartOpened(true);
  }

  function handleCloseDrawen() {
    setCartOpened(false);
  }

  function handleAddOnCart(obj) {
    setCartItems((prevCartItems) => {
      const itemExists = prevCartItems.some((item) => item.name === obj.name);

      if (itemExists) {
        return prevCartItems.filter((item) => item.name !== obj.name);
      } else {
        return [...prevCartItems, obj];
      }
    });
  }

  function handleDeleteFromCart(obj) {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((item) => item.name !== obj.name);
    });
  }

  function onChangeSearch(e) {
    setSearchValue(e.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          onClose={handleCloseDrawen}
          items={cartItems}
          onDelete={handleDeleteFromCart}
        />
      )}
      <Header onClickCart={handleOpenDrawen} />

      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            {searchValue ? `Поиск по запросу "${searchValue}"` : "Все кросовки"}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="search" />
            <input
              onChange={onChangeSearch}
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((card, index) => (
            <Card
              key={index}
              name={card.name}
              price={card.price}
              imgUrl={card.imgUrl}
              onClick={(obj) => handleAddOnCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
