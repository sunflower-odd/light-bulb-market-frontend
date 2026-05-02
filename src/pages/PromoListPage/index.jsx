import { Link } from "react-router-dom";
import "./style.css";

const promos = [
  {
    id: 1,
    title: "Скидка 20% на LED лампы",
    description: "Экономьте на освещении — LED лампы со скидкой весь месяц.",
    discount: "−20%",
    image: "https://via.placeholder.com/400",
  },
  {
    id: 2,
    title: "2 по цене 1 на умные лампы",
    description: "Умные лампы с WiFi управлением — выгодный комплект.",
    discount: "2=1",
    image: "https://via.placeholder.com/400",
  },
  {
    id: 3,
    title: "Распродажа галогенных ламп",
    description: "Остатки склада по сниженной цене.",
    discount: "−30%",
    image: "https://via.placeholder.com/400",
  },
];

function PromoListPage() {
  return (
    <div className="promo">

      <h1 className="promo__title">Акции и скидки</h1>

      <div className="promo__grid">
        {promos.map((promo) => (
          <div key={promo.id} className="promo__card">

            <img
              src={promo.image}
              alt={promo.title}
              className="promo__image"
            />

            <div className="promo__content">
              <span className="promo__badge">
                {promo.discount}
              </span>

              <h3 className="promo__card-title">
                {promo.title}
              </h3>

              <p className="promo__text">
                {promo.description}
              </p>

              <Link to="/catalog" className="promo__button">
                Перейти в каталог
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default PromoListPage;