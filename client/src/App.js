import { useEffect, useState } from "react";
import "./App.css";
import PlaneForm from "./components/PlaneForm";
import PlaneDetails from "./components/PlaneDetails";

function App() {
  const [aircraft, setAircraft] = useState(null);
  const [emptyImage, setEmptyImage] = useState(false);
  const [formData, setFormData] = useState({
    aircraftModel: "A319",
    airline: "",
    origin: "",
    serialNumber: "",
  });
  const [wrongSearch, setWrongSearch] = useState(false);
  const [newScan, setNewScan] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWrongSearch(false);

    if (formData.serialNumber === "") {
      setEmptyImage(true);
      return;
    }

    await fetch(
      `http://192.168.178.248:3001/plane/find?data=${JSON.stringify(formData)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(({ aircraft }) => setAircraft(aircraft));

    if (aircraft === null) {
      setWrongSearch(true);
    }
  };

  useEffect(() => {
    setWrongSearch(false);
    setFormData({
      aircraftModel: "A319",
      airline: "",
      origin: "",
      serialNumber: "",
    });
  }, [newScan]);

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="font-semibold text-2xl mt-12 mb-7 text-[#00A1DE]">
        {!aircraft ? "Search for Aircraft" : "Matching Aircraft"}
      </h1>
      {!aircraft ? (
        <PlaneForm
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          emptyImage={emptyImage}
          setEmptyImage={setEmptyImage}
          wrongSearch={wrongSearch}
        />
      ) : (
        <PlaneDetails
          aircraft={aircraft}
          setAircraft={setAircraft}
          setNewScan={setNewScan}
        />
      )}
    </div>
  );
}

export default App;
