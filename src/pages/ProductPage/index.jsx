import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/actions/productActions";
import "./style.css";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.list);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const product = products?.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="product">Загрузка или товар не найден...</div>;
  }

  return (
    <div className="product">
      <div className="product__left">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product__right">
        <h1>{product.title}</h1>
        <p>{product.price} ₽</p>
      </div>
    </div>
  );
}

export default ProductPage;