import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

const ImageUploader = ({ viewportHeight }) => {
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div>
      <div style={{ height: `${viewportHeight}px` }}>
        <Camera
          isFullscreen
          idealFacingMode="environment"
          onTakePhoto={(dataUri) => {
            setImage(dataUri);
          }}
        />
      </div>

      {/* <div
        {...getRootProps()}
        className="border-2 border-dashed border-['#ccc'] rounded-['4px'] p-5 text-center pointer"
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select one</p>
      </div> */}

      {/* <div className="mt-5">
        {image && (
          <img
            src={image}
            alt="Uploaded"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        )}
      </div> */}
    </div>
  );
};

export default ImageUploader;
