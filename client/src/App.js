import "./App.css";
import PlaneForm from "./components/PlaneForm";

function App() {
  return (
    <div className="w-11/12 mx-auto">
      <h1 className="font-semibold text-2xl mt-10 mb-5 text-[#00A1DE]">
        Search for Aircraft
      </h1>
      <PlaneForm />
    </div>
  );
}

export default App;
