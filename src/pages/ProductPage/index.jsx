import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/actions/productActions";
import "./style.css";
import { addToCart } from "../../store/actions/cartActions";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.list);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const product = products?.find(
    (p) => p.product_id === Number(id)
  );

  // 👇 ВОТ ЭТО САМОЕ ВАЖНОЕ
  if (!product) {
    return <div className="product">Загрузка...</div>;
  }

return (
  <div className="product">

    {/* КАРТИНКА */}
    <div className="product__image-wrapper">
      <img
        className="product__image"
        src={product.image_url || "https://via.placeholder.com/800x500?text=No+Image"}
        alt={product.title}
      />
    </div>

    {/* ИНФО */}
    <div className="product__info">

      <h1 className="product__title">
        {product.title}
      </h1>

      <p className="product__price">
        {product.price} ₽
      </p>

      <p className="product__description">
        {product.description}
      </p>

    </div>


    <button
      className="product__button"
      onClick={() => dispatch(addToCart(product))}
    >
      В корзину
    </button>


  </div>
);
}

export default ProductPage;