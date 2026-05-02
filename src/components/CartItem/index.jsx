import "./style.css";

function CartItem({ item }) {
  return (
    <div className="cart-item">
      <img
        className="cart-item__image"
        src={item.image}
        alt={item.title}
      />

      <div className="cart-item__info">
        <h3 className="cart-item__title">
          {item.title}
        </h3>

        <p className="cart-item__price">
          {item.price} €
        </p>
      </div>

      <div className="cart-item__actions">
        <button className="cart-item__btn">−</button>

        <span className="cart-item__quantity">
          {item.quantity}
        </span>

        <button className="cart-item__btn">+</button>
      </div>
    </div>
  );
}

export default CartItem;