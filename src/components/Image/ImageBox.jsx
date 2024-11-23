import React, { useRef } from "react";
import swal from "sweetalert"; // Ensure you have sweetalert installed: npm install sweetalert
import "./ImageBox.css"; // Import the CSS file for styles

const ImageBox = ({ image }) => {
  const imageRef = useRef(null);

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = imageRef.current.src;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    swal({
      text: "Image Address copied to Clipboard!",
      icon: "success",
      closeOnClickOutside: false,
    });
  };

  return (
    <div className="image-box">
      <img
        src={image.url}
        alt={image.name}
        className="img-fluid my-image"
        ref={imageRef}
      />
      <div className="middle">
        <button className="btn btn-info" onClick={copyToClipboard}>
          Copy Address
        </button>
      </div>
    </div>
  );
};

export default ImageBox;
