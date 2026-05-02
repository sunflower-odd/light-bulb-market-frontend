import "./style.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          Магазин современных лампочек
        </div>

        <div className="footer__info">
          Интернет-магазин Сияй!
        </div>
      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} Сияй! Все права защищены.
      </div>
    </footer>
  );
}

export default Footer;