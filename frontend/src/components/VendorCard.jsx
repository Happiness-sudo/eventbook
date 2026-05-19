function VendorCard({ vendor, onView }) {
  if (!vendor) return null;

  const {
    name = "Unnamed Vendor",
    category = "General",
    location = "Location not set",
    price = 0,
    rating = 0,
    image_url,
  } = vendor;

  const formattedPrice = Number(price).toLocaleString();

  return (
    <div style={S.card} onClick={() => onView && onView(vendor)}>
      <img
        src={image_url || "https://via.placeholder.com/260x150?text=No+Image"}
        alt={name}
        style={S.image}
      />
      <div style={S.body}>
        <span style={S.category}>{category}</span>
        <h3 style={S.name}>{name}</h3>
        <p style={S.meta}>{location}</p>
        <div style={S.bottom}>
          <span style={S.rating}>★ {rating}</span>
          <span style={S.price}>KES {formattedPrice}</span>
        </div>
      </div>
    </div>
  );
}

const S = {
  card: {
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: "20px",
    overflow: "hidden",
    width: "260px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "var(--shadow)",
    fontFamily: "system-ui, sans-serif",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    background: "var(--input-bg)",
  },
  body: {
    padding: "16px",
  },
  category: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#3b82f6",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  name: {
    fontFamily: "var(--font-head)",
    fontSize: "16px",
    fontWeight: 700,
    color: "var(--text)",
    margin: "8px 0 4px",
  },
  meta: {
    fontSize: "13px",
    color: "var(--muted)",
    margin: "2px 0",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "12px",
    paddingTop: "12px",
    borderTop: "1px solid var(--border)",
  },
  rating: {
    fontSize: "13px",
    color: "var(--muted)",
    fontWeight: 600,
  },
  price: {
    fontSize: "15px",
    fontWeight: 800,
    background: "linear-gradient(135deg,#3b82f6,#FF6B35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
};

export default VendorCard;