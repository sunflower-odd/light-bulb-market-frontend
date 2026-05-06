import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseQty } from "../../store/actions/cartActions";

function CartPage() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="cart">

      <h1>Корзина</h1>

      {items.length === 0 && <p>Корзина пустая</p>}

      {items.map((item) => (
        <div key={item.product.product_id} className="cart-item">

          <h3>{item.product.title}</h3>

          <p>{item.product.price} ₽</p>

          <p>Количество: {item.qty}</p>

          <button onClick={() => dispatch(decreaseQty(item.product.product_id))}>
            -
          </button>

          <button onClick={() => dispatch(removeFromCart(item.product.product_id))}>
            удалить
          </button>

        </div>
      ))}

    </div>
  );
}

export default CartPage;