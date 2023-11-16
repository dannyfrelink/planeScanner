const PlaneData = ({ aircraft }) => {
  const { aircraftModel, airline, origin, serialNumber } = aircraft;
  return (
    <div className="mt-3 mb-5 [&>p]:my-1 [&>p>span]:font-semibold">
      <p>
        <span>Aircraft Model:</span> {aircraftModel}
      </p>
      <p>
        <span>Airline:</span> {airline}
      </p>
      <p>
        <span>Origin:</span> {origin}
      </p>
      <p>
        <span>Serial Number:</span> {serialNumber}
      </p>
    </div>
  );
};

export default PlaneData;
