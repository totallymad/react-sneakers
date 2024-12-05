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
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // setIsLoading(true);
      const resp = await axios(
        "https://6750184969dc1669ec19a427.mockapi.io/Items"
      );
      setIsLoading(false);
      setItems(resp.data);
    }

    fetchData();
    // axios("https://6750184969dc1669ec19a427.mockapi.io/Items").then((res) => {
    //   setItems(res.data);
    // });
  }, []);

  function handleOpenDrawen() {
    setCartOpened(true);
  }

  function handleCloseDrawen() {
    setCartOpened(false);
  }

  // Добавление в корзину
  async function handleAddOnCart(obj) {
    console.log("Объект для изменения:", obj);

    // Локальное обновление состояния items
    setItems((prev) =>
      prev.map((item) =>
        item.id === obj.id ? { ...item, isOnCart: !item.isOnCart } : item
      )
    );

    // Синхронизация с MockAPI
    try {
      const response = await axios.put(
        `https://6750184969dc1669ec19a427.mockapi.io/Items/${obj.id}`,
        { isOnCart: !obj.isOnCart } // Переключение статуса
      );
      console.log("Обновление на сервере успешно:", response.data);
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
  async function handleDeleteFromCart(obj) {
    console.log("Объект для удаления из корзины:", obj);

    // Локальное обновление состояния items
    setItems((prev) =>
      prev.map((item) =>
        item.id === obj.id ? { ...item, isOnCart: false } : item
      )
    );

    // Синхронизация с MockAPI
    try {
      const response = await axios.put(
        `https://6750184969dc1669ec19a427.mockapi.io/Items/${obj.id}`,
        { isOnCart: !obj.isOnCart } // Переключение статуса
      );
      console.log("Обновление на сервере успешно:", response.data);
    } catch (error) {
      console.error("Ошибка синхронизации с сервером:", error);
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
            items={items}
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
                isLoading={isLoading}
              />
            }
            exact
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                items={items}
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
