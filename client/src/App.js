import { useState } from "react";
import "./App.css";
import PlaneForm from "./components/PlaneForm";

function App() {
  const [aircraft, setAircraft] = useState(null);
  const [emptyImage, setEmptyImage] = useState(false);
  const [formData, setFormData] = useState({
    aircraftModel: "A319",
    airline: "",
    origin: "",
    serialNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.serialNumber === "") {
      setEmptyImage(true);
      return;
    }

    await fetch(
      `http://localhost:3001/plane/find?data=${JSON.stringify(formData)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(({ aircraft }) => setAircraft(aircraft));
  };

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="font-semibold text-2xl mt-10 mb-5 text-[#00A1DE]">
        {!aircraft ? "Search for Aircraft" : "Matching Aircraft"}
      </h1>
      {!aircraft ? (
        <PlaneForm
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          emptyImage={emptyImage}
          setEmptyImage={setEmptyImage}
        />
      ) : (
        <div>{aircraft.aircraftModel}</div>
      )}
    </div>
  );
}

export default App;
