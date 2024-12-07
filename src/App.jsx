import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Drawer from "./components/Drawen/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Slider from "./components/Slider";

import AppContext from "./context";

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
    // Локальное обновление состояния items
    setItems((prev) =>
      prev.map((item) =>
        item.id === obj.id ? { ...item, isOnCart: !item.isOnCart } : item
      )
    );

    // Синхронизация с MockAPI
    try {
      await axios.put(
        `https://6750184969dc1669ec19a427.mockapi.io/Items/${obj.id}`,
        { isOnCart: !obj.isOnCart } // Переключение статуса
      );
    } catch (error) {
      console.error("Ошибка синхронизации с сервером:", error);
    }
  }

  //Добавление в избранное
  async function handleFavorite(obj) {

    // Локальное обновление состояния items
    setItems((prev) =>
      prev.map((item) =>
        item.id === obj.id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );

    // Синхронизация с MockAPI
    try {
      await axios.put(
        `https://6750184969dc1669ec19a427.mockapi.io/Items/${obj.id}`,
        { isFavorite: !obj.isFavorite } // Переключение статуса
      );
    } catch (error) {
      console.error("Ошибка синхронизации с сервером:", error);
    }
  }

  // удаление из корзины
  async function handleDeleteFromCart(obj) {
    // Локальное обновление состояния items
    setItems((prev) =>
      prev.map((item) =>
        item.id === obj.id ? { ...item, isOnCart: false } : item
      )
    );

    // Синхронизация с MockAPI
    try {
      await axios.put(
        `https://6750184969dc1669ec19a427.mockapi.io/Items/${obj.id}`,
        { isOnCart: !obj.isOnCart } // Переключение статуса
      );
    } catch (error) {
      console.error("Ошибка синхронизации с сервером:", error);
    }
  }

  function onChangeSearch(e) {
    setSearchValue(e.target.value);
  }

  const slides = [
    {
      title: "Шагай уверенно — будь в тренде!",
      descr: "Открой для себя стильные кроссовки для повседневности и спорта.",
      imgUrl: "/img/slider-1.jpeg",
    },
    {
      title: "Каждый шаг — шаг к комфорту!",
      descr: "Кроссовки, которые дарят свободу движения и стиль каждый день.",
      imgUrl: "/img/slider-2.jpeg",
    },
    {
      title: "Быстрее. Легче. Ярче.",
      descr: "Твой идеальный выбор кроссовок для активной жизни и новых побед.",
      imgUrl: "/img/slider-3.jpeg",
    },
  ];

  return (
    <Router>
      <AppContext.Provider value={{ items, setCartOpened, setItems }}>
        <div className="wrapper clear">
          <Drawer
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
