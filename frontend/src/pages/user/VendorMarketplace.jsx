function VendorMarketplace() {
  const vendors =
    JSON.parse(localStorage.getItem("vendors")) || [];

  return (
    <div style={styles.container}>
      <h1>Available Vendors</h1>

      <div style={styles.grid}>
        {vendors.map((vendor, index) => (
          <div key={index} style={styles.card}>
            <img
              src={vendor.image}
              alt={vendor.name}
              style={styles.image}
            />

            <h2>{vendor.name}</h2>

            <p>
              <strong>Service:</strong> {vendor.service}
            </p>

            <p>
              <strong>Location:</strong> {vendor.location}
            </p>

            <p>
              <strong>Price:</strong> KSh {vendor.price}
            </p>

            <p>{vendor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    color: "white",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "12px",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  },
};

export default VendorMarketplace;