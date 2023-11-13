import React, { useState, Image } from "react";
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
      {!image && (
        <div>
          <div style={{ height: `${viewportHeight}px` }}>
            <Camera
              isFullscreen
              isMaxResolution
              idealFacingMode="environment"
              onTakePhoto={(dataUri) => {
                setImage(dataUri);
              }}
            />
          </div>

          <div {...getRootProps()} className="absolute bottom-6 left-6">
            <input {...getInputProps()} />
            <img
              className="bg-[hsla(0,0%,100%,.4)] w-14 h-14 p-2.5 rounded-full"
              src="photo-library-icon.svg"
              alt="Photo library"
            />
          </div>
        </div>
      )}

      {image && (
        <div>
          <img
            style={{ height: `${viewportHeight}px` }}
            className="w-screen"
            src={image}
            alt="Taken image"
          />

          <button className="absolute bottom-6 right-6">
            <img
              className="bg-[hsla(0,0%,100%,.4)] w-14 h-14 p-2.5 rounded-full"
              src="tick.svg"
              alt="Submit image"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
