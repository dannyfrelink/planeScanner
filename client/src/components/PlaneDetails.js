import PlaneData from "./PlaneData";
import PlaneImage from "./PlaneImage";

const PlaneDetails = ({ aircraft, setAircraft, setNewScan }) => {
  const handleScanNew = () => {
    setAircraft(null);
    setNewScan(true);
  };
  return (
    <div>
      <PlaneImage model={aircraft.aircraftModel} />
      <PlaneData aircraft={aircraft} />
      <button
        onClick={handleScanNew}
        className="!bg-[#00A1DE] text-white rounded-2xl p-2.5 mt-2"
      >
        Scan New Plane
      </button>
    </div>
  );
};

export default PlaneDetails;
