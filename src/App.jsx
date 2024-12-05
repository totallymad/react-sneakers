import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import axios from "axios";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
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
  }, []);

  function handleOpenDrawen() {
    setCartOpened(true);
  }

  function handleCloseDrawen() {
    setCartOpened(false);
  }

  // Добавление в корзину
  async function handleAddOnCart(obj) {
    try {
      // Проверка, есть ли объект в корзине
      const itemInCart = cartItems.find((item) => item.id === obj.id);

      if (itemInCart) {
        // Удаление из корзины
        await axios.delete(
          `https://6750184969dc1669ec19a427.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prev) => prev.filter((item) => item.id !== obj.id));

        // Обновление состояния в items
        setItems((prev) =>
          prev.map((item) =>
            item.id === obj.id ? { ...item, isOnCart: false } : item
          )
        );

        // Синхронизация с сервером (Items)
        await axios.put(
          `https://6750184969dc1669ec19a427.mockapi.io/Items/${obj.id}`,
          { isOnCart: false }
        );
      } else {
        // Добавление в корзину
        const response = await axios.post(
          "https://6750184969dc1669ec19a427.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, response.data]);

        // Обновление состояния в items
        setItems((prev) =>
          prev.map((item) =>
            item.id === obj.id ? { ...item, isOnCart: true } : item
          )
        );

        // Синхронизация с сервером (Items)
        await axios.put(
          `https://6750184969dc1669ec19a427.mockapi.io/Items/${obj.id}`,
          { isOnCart: true }
        );
      }
    } catch (error) {
      console.error("Ошибка синхронизации с сервером:", error);
    }
  }

  //Добавление в избранное
  async function handleFavorite(obj) {
    console.log("Объект для изменения:", obj);

    // Локальное обновление состояния items
    setItems((prev) =>
      prev.map((item) =>
        item.id === obj.id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );

    // Синхронизация с MockAPI
    try {
      const response = await axios.put(
        `https://6750184969dc1669ec19a427.mockapi.io/Items/${obj.id}`,
        { isFavorite: !obj.isFavorite } // Переключение статуса
      );
      console.log("Обновление на сервере успешно:", response.data);
    } catch (error) {
      console.error("Ошибка синхронизации с сервером:", error);
    }
  }

  // удаление из корзины
  async function handleDeleteFromCart(id) {
    try {
      // Удаление из корзины
      await axios.delete(
        `https://6750184969dc1669ec19a427.mockapi.io/cart/${id}`
      );

      // Удаление из локального состояния корзины
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== id)
      );

      // Обновление состояния в items
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, isOnCart: false } : item
        )
      );

      // Синхронизация с MockAPI (обновление isOnCart)
      await axios.put(
        `https://6750184969dc1669ec19a427.mockapi.io/Items/${id}`,
        { isOnCart: false }
      );
    } catch (error) {
      console.error("Ошибка при удалении из корзины:", error);
    }
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
          <Route
            path="/favorites"
            element={<Favorites items={items} onAddFavorite={handleFavorite} />}
            exact
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
