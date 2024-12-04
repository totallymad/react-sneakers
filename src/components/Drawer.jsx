// eslint-disable-next-line react/prop-types
export default function Drawer({ onClose, onDelete, items = [] }) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30 ">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="remove"
          />
        </h2>

        <div className="items flex">
          {items.map((item, index) => {
            return (
              <div key={index} className="cartItem d-flex align-center mb-20">
                <div
                  style={{ backgroundImage: `url(${item.imgUrl})` }}
                  className="cartItemImg"
                ></div>
                <div className="mr-20 flex">
                  <p className="mb-5">{item.name}</p>
                  <b>{item.price} руб.</b>
                </div>
                <img
                  onClick={() => onDelete(item)}
                  className="removeBtn"
                  src="/img/btn-remove.svg"
                  alt="remove"
                />
              </div>
            );
          })}
        </div>

        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб.</b>
            </li>
            <li>
              <span>Налог 5%%</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
