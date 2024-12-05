import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import axios from "axios";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  console.log(favorites);
  console.log(items);

  useEffect(() => {
    axios("https://6750184969dc1669ec19a427.mockapi.io/Items").then((res) => {
      setItems(res.data);
    });
    axios("https://6750184969dc1669ec19a427.mockapi.io/cart").then((res) => {
      setCartItems(res.data);
    });
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
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

  // function handleFavorite(obj) {
  //   console.log(obj);
  //   setFavorites((prev) => {
  //     // Проверяем, существует ли объект с таким же id
  //     const exists = prev.some((item) => item.id === obj.id);

  //     // Если объект уже есть, удаляем его, иначе добавляем
  //     const updatedFavorites = exists
  //       ? prev.filter((item) => item.id !== obj.id) // Удаляем объект
  //       : [...prev, obj]; // Добавляем новый объект

  //     // Сохранение обновленного массива в LocalStorage
  //     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

  //     return updatedFavorites; // Возвращаем обновленный массив
  //   });
  // }

  async function handleFavorite(obj) {
    console.log("Объект для изменения:", obj);

    // Локальное обновление состояния
    setItems((prev) => {
      // Обновляем параметр isFavorite
      const updatedItems = prev.map((item) =>
        item.id === obj.id ? { ...item, isFavorite: !item.isFavorite } : item
      );

      console.log("Обновленный массив items:", updatedItems);

      // Возвращаем обновленный массив для состояния
      return updatedItems;
    });

    // Синхронизация с MockAPI
    try {
      const response = await fetch(
        `https://6750184969dc1669ec19a427.mockapi.io/Items/${obj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isFavorite: !obj.isFavorite }), // Обновляем только isFavorite
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка обновления: ${response.statusText}`);
      }

      const updatedItem = await response.json();
      console.log("Обновление на сервере успешно:", updatedItem);
    } catch (error) {
      console.error("Ошибка синхронизации с сервером:", error);
    }
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
          <Route
            path="/favorites"
            element={
              <Favorites items={favorites} onAddFavorite={handleFavorite} />
            }
            exact
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
