const PlaneImage = ({ model }) => {
  const renderImage = () => {
    try {
      switch (model) {
        case "A319":
          return (
            <img
              className="h-56 w-full object-cover object-center"
              src="planes/A319.jpeg"
              alt={model}
            />
          );
        case "A320":
          return (
            <img
              className="h-56 w-full object-cover object-center"
              src="planes/A320.avif"
              alt={model}
            />
          );
        case "A321":
          return (
            <img
              className="h-56 w-full object-cover object-center"
              src="planes/A321.jpeg"
              alt={model}
            />
          );
        case "A332":
          return (
            <img
              className="h-56 w-full object-cover object-center"
              src="planes/A332.jpeg"
              alt={model}
            />
          );
        case "A333":
          return (
            <img
              className="h-56 w-full object-cover object-center"
              src="planes/A333.jpeg"
              alt={model}
            />
          );
        case "B77W":
          return (
            <img
              className="h-56 w-full object-cover object-center"
              src="planes/B77W.jpeg"
              alt={model}
            />
          );
        case "B737":
          return (
            <img
              className="h-56 w-full object-cover object-center"
              src="planes/B737.webp"
              alt={model}
            />
          );
        case "B738":
          return (
            <img
              className="h-56 w-full object-cover object-center"
              src="planes/B738.jpeg"
              alt={model}
            />
          );
        default:
          return <p>No image available</p>;
      }
    } catch (error) {
      console.error(`Error loading image for ${model}:`, error);
      return <p>No image available</p>;
    }
  };

  return <div>{renderImage()}</div>;
};

export default PlaneImage;
