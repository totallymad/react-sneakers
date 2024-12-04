import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Header({ onClickCart }) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кросовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/shopping-cart.svg" />
          <span>1205 руб.</span>
        </li>
        <li className="mr-30 cu-p">
          <Link to="/favorites">
            <img src="/img/favorites.svg" alt="favorites" />
            <span>Закладки</span>
          </Link>
        </li>
        <li>
          <img width={18} height={18} src="/img/profile.svg" alt="user" />
          <span>Профиль</span>
        </li>
      </ul>
    </header>
  );
}
