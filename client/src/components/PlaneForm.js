import React, { useEffect, useState } from "react";

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
      <div>
        <label htmlFor="model">Aircraft Model:</label>
        <select
          className="w-fit"
          id="aircraftModel"
          name="aircraftModel"
          value={formData.aircraftModel}
          onChange={handleChange}
          required
        >
          <option value="A319">A319</option>
          <option value="A320">A320</option>
          <option value="A321">A321</option>
          <option value="A332">A332</option>
          <option value="A333">A333</option>
          <option value="B77W">B77W</option>
          <option value="B737">B737</option>
          <option value="B738">B738</option>
        </select>
      </div>

      <div>
        <label htmlFor="airline">Airline:</label>
        <input
          className="w-3/4"
          type="text"
          id="airline"
          name="airline"
          value={formData.airline}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="origin">Origin:</label>
        <input
          className="w-3/4"
          type="text"
          id="origin"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex-row items-center">
        <label
          htmlFor="serialNumber"
          className="border-[1.5px] border-[#00A1DE] border-dashed p-1.5 rounded w-fit mt-1 cursor-pointer"
        >
          Serial Number Image
        </label>
        <input
          className="hidden"
          type="file"
          onInput={onDrop}
          id="serialNumber"
          name="serialNumber"
          accept="image/*"
        />
        {emptyImage && <p className="text-red-600 ml-2">Please add image</p>}
        {wrongImage && <p className="text-red-600 ml-2">Not an image</p>}
        {loader && <p className="text-[#00A1E4] ml-2">Loading ...</p>}
        {formData.serialNumber && (
          <img src="tick.svg" alt="Uploaded" className="ml-2 w-8" />
        )}
      </div>

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
