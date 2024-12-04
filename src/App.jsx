import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    axios("https://6750184969dc1669ec19a427.mockapi.io/Items").then((res) => {
      setItems(res.data);
    });
    axios("https://6750184969dc1669ec19a427.mockapi.io/cart").then((res) => {
      setCartItems(res.data);
    });
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    console.log(storedFavorites);
  }, []);

  function handleOpenDrawen() {
    setCartOpened(true);
  }

  function handleCloseDrawen() {
    setCartOpened(false);
  }

  function handleAddOnCart(obj) {
    axios.post("https://6750184969dc1669ec19a427.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  }

  function handleFavorite(obj) {
    console.log(obj);
    setFavorites((prev) => {
      const updatedFavorites = [...prev, obj];

      // Сохранение обновленного массива в LocalStorage
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return updatedFavorites; // Возвращаем обновленный массив
    });
  }

  function handleDeleteFromCart(id) {
    axios.delete(`https://6750184969dc1669ec19a427.mockapi.io/cart/${id}`);
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((item) => item.id !== id);
    });
  }

  function onChangeSearch(e) {
    setSearchValue(e.target.value);
  }

  return (
    <Router>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            onClose={handleCloseDrawen}
            items={cartItems}
            onDelete={handleDeleteFromCart}
          />
        )}
        <Header onClickCart={handleOpenDrawen} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearch}
                onAddFavorite={handleFavorite}
                onAddToCart={handleAddOnCart}
              />
            }
            exact
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
