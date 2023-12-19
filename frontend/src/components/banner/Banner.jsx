import "./Banner.css";

export const Banner = () => {
  return (
    <section className="banner-container">
      <div className="healty-plants-container">
        <img src="./healthy-plants-icon.png" alt="Guarantee icon" />
        <p>healthy plants</p>
      </div>
      <div className="packed-with-love-container">
        <img
          src="./packed-with-love-icon.png"
          alt="Hand holding a heart icon"
        />
        <span>packed with love</span>
      </div>
      <div className="climate-shipping-container">
        <img src="./climate-shipping-icon.png" alt="Shipping icon" />
        <span>
          <span>climate compensated </span>
          <br />
          <span>shipping</span>
        </span>
      </div>
      <div className="care-advice-container">
        <img src="./care-advice-icon.png" alt="Envelope icon" />
        <span>care advice</span>
      </div>
    </section>
  );
};
