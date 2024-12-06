import { Link } from "react-router-dom";
import useTotalPrice from "../hooks/useTotalPrice";

// eslint-disable-next-line react/prop-types
export default function Header({ onClickCart }) {
  const { orderPrice } = useTotalPrice();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img className="logo" width={60} height={60} src="/img/logo.png" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кросовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/shopping-cart.svg" />
          <span>{orderPrice} руб.</span>
        </li>
        <li className="mr-30 cu-p">
          <Link to="/favorites">
            <img src="/img/favorites.svg" alt="favorites" />
            <span>Закладки</span>
          </Link>
        </li>
        <li className="cu-p">
          <Link to="/orders">
            <img width={18} height={18} src="/img/profile.svg" alt="user" />
            <span>Заказы</span>
          </Link>
        </li>
      </ul>
    </header>
  );
}
