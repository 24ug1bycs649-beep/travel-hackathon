import { useState, useMemo } from "react";
import { products, artists, productCategories } from "../data/products";
import "./Marketplace.css";

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState("product"); // product | artist | ar

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.artist.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  function openProduct(product) {
    setSelectedProduct(product);
    setView("product");
  }

  function closeDetail() {
    setSelectedProduct(null);
  }

  return (
    <div className="marketplace">
      <div className="marketplace__controls">
        <input
          type="text"
          placeholder="Search paintings, metalcraft, artisans..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="marketplace__search"
        />
        <div className="marketplace__filters">
          {productCategories.map((c) => (
            <button
              key={c}
              className={`marketplace__filter ${category === c ? "marketplace__filter--active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      </div>

      <div className="marketplace__grid">
        {filtered.map((product) => (
          <button key={product.id} className="product-card" onClick={() => openProduct(product)}>
            <img src={product.photo} alt={product.name} />
            <div className="product-card__info">
              <h4>{product.name}</h4>
              <p>{product.artist}</p>
              <span className="product-card__price">₹{product.price.toLocaleString()}</span>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="marketplace__empty">No products match your search.</p>
        )}
      </div>

      {selectedProduct && (
        <div className="product-overlay" onClick={closeDetail}>
          <div className="product-modal sohrai-border" onClick={(e) => e.stopPropagation()}>
            <button className="product-modal__close" onClick={closeDetail}>✕</button>

            {view === "product" && (
              <>
                <img src={selectedProduct.photo} alt={selectedProduct.name} className="product-modal__img" />
                <div className="product-modal__body">
                  <span className="eyebrow">{selectedProduct.category}</span>
                  <h2>{selectedProduct.name}</h2>
                  <p className="product-modal__price">₹{selectedProduct.price.toLocaleString()}</p>
                  <p className="product-modal__desc">{selectedProduct.description}</p>

                  <div className="product-modal__actions">
                    <button className="btn-secondary" onClick={() => setView("ar")}>
                      📱 View in AR
                    </button>
                    <button className="btn-primary">Add to Cart</button>
                  </div>

                  <button
                    className="product-modal__artist-link"
                    onClick={() => setView("artist")}
                  >
                    About the artist: <strong>{selectedProduct.artist}</strong> →
                  </button>
                </div>
              </>
            )}

            {view === "ar" && (
              <div className="ar-view">
                <button className="ar-view__back" onClick={() => setView("product")}>← Back</button>
                <div className="ar-view__stub">
                  <span className="eyebrow">AR Preview</span>
                  <div className="ar-view__camera-frame">
                    <p>📱 Point your camera to place<br/>{selectedProduct.name} in 3D</p>
                  </div>
                  <p className="ar-view__note">
                    Full AR rendering requires a mobile device with camera access.
                  </p>
                </div>
              </div>
            )}

            {view === "artist" && artists[selectedProduct.artist] && (
              <div className="artist-view">
                <button className="ar-view__back" onClick={() => setView("product")}>← Back</button>
                <div className="artist-view__header">
                  <img src={artists[selectedProduct.artist].photo} alt={selectedProduct.artist} />
                  <div>
                    <span className="eyebrow">Artist</span>
                    <h3>{selectedProduct.artist}</h3>
                  </div>
                </div>
                <p className="artist-view__bio">{artists[selectedProduct.artist].bio}</p>

                <span className="eyebrow">More by this artist</span>
                <div className="artist-view__works">
                  {products
                    .filter((p) => p.artist === selectedProduct.artist)
                    .map((p) => (
                      <button key={p.id} className="artist-view__work" onClick={() => openProduct(p)}>
                        <img src={p.photo} alt={p.name} />
                        <span>{p.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
