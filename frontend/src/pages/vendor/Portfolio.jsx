import { useState } from "react";

function Portfolio() {
  const [images, setImages] = useState([]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImages([...images, imageUrl]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Vendor Portfolio</h2>

      <input type="file" onChange={handleUpload} />

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        {images.map((img, index) => (
          <img key={index} src={img} alt="portfolio" width="100" />
        ))}
      </div>
    </div>
  );
}

export default Portfolio;