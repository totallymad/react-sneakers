import { useContext } from "react";
import AppContext from "../context";
import { useNavigate } from "react-router";

/* eslint-disable react/prop-types */
export default function Info({ title, img, alt, descr, type }) {
  const { setCartOpened } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="info d-flex flex-column align-center justify-center flex">
      <img className="mb-20" width="120px" height="120px" src={img} alt={alt} />
      <h2>{title}</h2>
      <p className="opacity-6">{descr}</p>
      <button
        onClick={
          type === "drawen" ? () => setCartOpened(false) : () => navigate(-1)
        }
        className="button"
      >
        <img src="/img/arrow-left.svg" alt="arrow-left" />
        <p>Вернуться назад</p>
      </button>
    </div>
  );
}
