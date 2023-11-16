import React, { useEffect, useState } from "react";
import Select from "./Select";
import InputText from "./InputText";
import InputFile from "./InputFile";

const PlaneForm = ({
  handleSubmit,
  formData,
  setFormData,
  emptyImage,
  setEmptyImage,
}) => {
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [wrongImage, setWrongImage] = useState(false);

  const onDrop = (e) => {
    const file = e.target.files[0];
    setLoader(true);

    if (file && file.type.startsWith("image/")) {
      setWrongImage(false);
      setEmptyImage(false);

      const reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setWrongImage(true);
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://192.168.178.248:3001/plane/number", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: image }),
        }).then((res) => res.json());

        setFormData((prevData) => ({
          ...prevData,
          serialNumber: data.serialNumber.toUpperCase(),
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    image !== null && fetchData();
  }, [image]);

  useEffect(() => {
    setLoader(false);
  }, [formData.serialNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      className="[&>div]:flex [&>div:not(:last-of-type)]:flex-col [&>div]:my-4 [&>div>input]:border-[1.5px] [&>div>input]:border-[#00A1DE] [&>div>input]:border-solid [&>div>input]:rounded [&>div>select]:border-[1.5px] [&>div>select]:border-[#00A1DE] [&>div>select]:border-solid [&>div>select]:rounded"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      method="POST"
    >
      <Select formData={formData} handleChange={handleChange} />

      <InputText
        label="Airline"
        value={formData.airline}
        handleChange={handleChange}
      />
      <InputText
        label="Origin"
        value={formData.origin}
        handleChange={handleChange}
      />

      <InputFile
        onDrop={onDrop}
        emptyImage={emptyImage}
        wrongImage={wrongImage}
        loader={loader}
        serialNumber={formData.serialNumber}
      />

      <button
        type="submit"
        className="!bg-[#00A1DE] text-white rounded-2xl p-2.5 mt-2"
      >
        Search Aircraft
      </button>
    </form>
  );
};

export default PlaneForm;
