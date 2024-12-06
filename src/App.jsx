import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Drawer from "./components/Drawen/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import AppContext from "./context";
import Slider from "./components/Slider";

import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const resp = await axios(
        "https://6750184969dc1669ec19a427.mockapi.io/Items"
      );
      setIsLoading(false);
      setItems(resp.data);
    }

    fetchData();
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

  async function handleClearCartStatus() {
    // Локально обновляем состояние items
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        isOnCart: false, // Сбрасываем параметр
      }))
    );

    try {
      // Обновляем данные на сервере для всех объектов
      const promises = items.map((item) =>
        axios.put(
          `https://6750184969dc1669ec19a427.mockapi.io/Items/${item.id}`,
          {
            isOnCart: false, // Сбрасываем параметр
          }
        )
      );

      // Ждем завершения всех запросов
      await Promise.all(promises);
      console.log("Все объекты обновлены успешно!");
    } catch (error) {
      console.error("Ошибка при обновлении данных на сервере:", error);
    }
  }

  function onChangeSearch(e) {
    setSearchValue(e.target.value);
  }

  const slides = [
    { title: "Stan Smith", descr: "Описание для Stan Smith" },
    { title: "Kermit", descr: "Описание для Kermit" },
    { title: "Huina", descr: "Описание для Huina" },
  ];

  return (
    <Router>
      <AppContext.Provider value={{ items, setCartOpened }}>
        <div className="wrapper clear">
          <Drawer
            handleOrder={handleClearCartStatus}
            onClose={handleCloseDrawen}
            items={items}
            onDelete={handleDeleteFromCart}
            opened={cartOpened}
          />
          <Header onClickCart={handleOpenDrawen} />
          <Slider slides={slides} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
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
                  onAddFavorite={handleFavorite}
                  onAddToCart={handleAddOnCart}
                />
              }
              exact
            />
            <Route
              path="/orders"
              element={
                <Orders
                  onAddFavorite={handleFavorite}
                  onAddToCart={handleAddOnCart}
                />
              }
              exact
            />
          </Routes>
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
