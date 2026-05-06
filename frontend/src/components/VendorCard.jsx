// A card that displays a single vendor's basic info on the vendor list page.

function VendorCard({ vendor, onView }) {
  // Defensive default — if no vendor is passed, render nothing.
  // Prevents crashes during loading states.
  if (!vendor) return null;

  // Pull out the fields we need with safe fallbacks
  const {
    name = "Unnamed Vendor",
    category = "General",
    location = "Location not set",
    price = 0,
    rating = 0,
    image,
  } = vendor;

  const cardStyle = {
    border: "1px solid #e5e4e7",
    borderRadius: "10px",
    padding: "16px",
    background: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    width: "260px",
    fontFamily: "system-ui, sans-serif",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const imageStyle = {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    background: "#f4f3ec",
  };

  const nameStyle = {
    fontSize: "18px",
    fontWeight: 600,
    margin: "12px 0 4px",
    color: "#08060d",
  };

  const metaStyle = {
    fontSize: "14px",
    color: "#6b6375",
    margin: "2px 0",
  };

  const priceStyle = {
    fontSize: "16px",
    fontWeight: 600,
    color: "#aa3bff",
    marginTop: "8px",
  };

  // Format price with commas (e.g. 15000 -> 15,000)
  const formattedPrice = Number(price).toLocaleString();

  return (
    <div style={cardStyle} onClick={() => onView && onView(vendor)}>
      <img
        src={image || "https://via.placeholder.com/260x150?text=No+Image"}
        alt={name}
        style={imageStyle}
      />
      <h3 style={nameStyle}>{name}</h3>
      <p style={metaStyle}> {location}</p>
      <p style={metaStyle}> {category}</p>
      <p style={metaStyle}> {rating} / 5</p>
      <p style={priceStyle}>KES {formattedPrice}</p>
    </div>
  );
}

export default VendorCard;