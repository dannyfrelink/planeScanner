import { useEffect, useState } from "react";
import "./App.css";
import ImageUploader from "./components/ImageUploader";

function App() {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      // Update the viewport height when the window is resized
      setViewportHeight(window.innerHeight);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ height: `${viewportHeight}px` }}>
      <ImageUploader viewportHeight={viewportHeight} />
    </div>
  );
}

export default App;
