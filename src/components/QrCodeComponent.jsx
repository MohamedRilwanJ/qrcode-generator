import { useState } from "react";

export const QrCodeComponent = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [size, setSize] = useState();

  function generateqr() {
    if (!qrData.trim() || !size) {
      alert("Both fields are required! Please enter data for the QR code and specify the size.");
      return;
    }
  
    setLoading(true);
    console.log("Loading started:", loading); // Debugging
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      console.log("Loading ended:", loading); // Debugging
    }
  }

  function downloadqr() {
    if (!img) {
      alert("Please generate a QR code first!");
      return;
    }

    fetch(img)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "qrcode.png";
        a.click();
        URL.revokeObjectURL(url); // Clean up the object URL
      })
      .catch((err) => {
        console.error("Error downloading the QR code:", err);
      });
  }

  return (
    <>
       <div className="container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait .......</p>} {/* This will render when loading is true */}
      {img && <img src={img} alt="qrcode" className="image" />}
      <div>
        <label htmlFor="dataInput" className="label">
          Data for QR code:
        </label>
        <input
          type="text"
          value={qrData}
          id="dataInput"
          placeholder="Enter data for Qr Code"
          className="input-field"
          onChange={(e) => setQrData(e.target.value)}
        />

        <label htmlFor="sizeInput" className="label">
          Image size (eq., 150 - 300 ):
        </label>
        <input
          type="number"
          value={size}
          id="sizeInput"
          placeholder="Enter image size"
          className="input-field"
          onChange={(e) => setSize(e.target.value)}
        />

        <button onClick={generateqr} disabled={loading} className="generatebutton">
          Generate QR Code
        </button>
        <button onClick={downloadqr} className="downloadbutton">
          Download QR Code
        </button>
      </div>
      <p>Designed by Mohamed Rilwan</p>
    </div>
    </>
  );
};
