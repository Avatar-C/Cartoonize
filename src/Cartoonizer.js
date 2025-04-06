/*
import { useState } from "react";

export default function Cartoonizer() {
  const [image, setImage] = useState(null);
  const [cartoon, setCartoon] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the file directly
    }
  };

  const handleCartoonize = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image); // Append image as a file

    const response = await fetch("http://44.211.24.229:2000/cartoonize", {
      method: "POST",
      body: formData, // Send the form data
    });

    if (!response.ok) {
      console.error("Error:", await response.text());
      setLoading(false);
      return;
    }

    const blob = await response.blob();
    const cartoonUrl = URL.createObjectURL(blob);
    setCartoon(cartoonUrl); // Display the cartoon image
    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleCartoonize} disabled={loading}>
        {loading ? "Cartoonizing..." : "Cartoonize"}
      </button>
      {cartoon && <img src={cartoon} alt="Cartoonized" />}
    </div>
  );
}
*/
import { useState } from "react";

export default function Cartoonizer() {
  const [image, setImage] = useState(null);
  const [cartoon, setCartoon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State to store the image preview URL

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the file directly
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file); // Convert to base64 URL for preview
    }
  };

  const handleCartoonize = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image); // Append image as a file

    const response = await fetch("http://44.211.24.229:2000/cartoonize", {
      method: "POST",
      body: formData, // Send the form data
    });

    if (!response.ok) {
      console.error("Error:", await response.text());
      setLoading(false);
      return;
    }

    const blob = await response.blob();
    const cartoonUrl = URL.createObjectURL(blob);
    setCartoon(cartoonUrl); // Display the cartoon image
    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {imagePreview && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imagePreview} alt="Uploaded Preview" style={{ width: '200px', height: 'auto' }} />
        </div>
      )}
      <button onClick={handleCartoonize} disabled={loading}>
        {loading ? "Cartoonizing..." : "Cartoonize"}
      </button>
      {cartoon && <img src={cartoon} alt="Cartoonized" />}
    </div>
  );
}

