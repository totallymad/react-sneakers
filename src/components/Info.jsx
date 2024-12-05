import { useContext } from "react";
import AppContext from "../context";

/* eslint-disable react/prop-types */
export default function Info({ title, img, alt, descr }) {
  const { setCartOpened } = useContext(AppContext);

  return (
    <div className="d-flex flex-column align-center justify-center flex">
      <img className="mb-20" width="120px" height="120px" src={img} alt={alt} />
      <h2>{title}</h2>
      <p className="opacity-6">{descr}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src="/img/arrow-left.svg" alt="arrow-left" />
        Вернуться назад
      </button>
    </div>
  );
}
