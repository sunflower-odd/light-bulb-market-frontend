import { Link } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";

function PromoListPage() {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    const loadPromos = async () => {
      try {
        const res = await fetch("http://localhost:8000/promos");
        const data = await res.json();

        

      const now = new Date();

      const activePromos = data.filter((promo) => {
        return (
          new Date(promo.start_date) <= now &&
          new Date(promo.end_date) >= now
        );
      });

      setPromos(activePromos);
        
      } catch (e) {
        console.error("Failed to load promos", e);
      }
    };

    loadPromos();
  }, []);

  return (
    <div className="promo">

      <h1 className="promo__title">Акции и скидки</h1>

      <div className="promo__grid">
        {promos.map((promo) => (
          <div key={promo.promo_id} className="promo__card">

            <img
              src={promo.image || "https://via.placeholder.com/400"}
              alt={promo.title}
              className="promo__image"
            />

            <div className="promo__content">
              <span className="promo__badge">
                -{promo.discount_percent}%
              </span>

              <h3 className="promo__card-title">
                {promo.title}
              </h3>

              <p className="promo__text">
                {promo.description}
              </p>

              <p className="promo__dates">
                {new Date(promo.start_date).toLocaleDateString()} —{" "}
                {new Date(promo.end_date).toLocaleDateString()}
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