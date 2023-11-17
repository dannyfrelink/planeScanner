const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const cors = require("cors");
const { aircrafts } = require("./aircraftData.json");
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

function calculateLevenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // Deletion
        matrix[i][j - 1] + 1, // Insertion
        matrix[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return matrix[b.length][a.length];
}

app.get("/plane/find", (req, res) => {
  try {
    const { data } = req.query;
    const dataObject = JSON.parse(data);
    const { aircraftModel, airline, origin, serialNumber } = dataObject;

    const filteredAircraftArr = aircrafts.filter(
      (aircraft) => aircraft.serialNumber === serialNumber
    );
    let filteredAircraft = filteredAircraftArr[0];

    if (filteredAircraftArr.length === 0) {
      const matchingAircrafts = aircrafts.filter(
        (aircraft) =>
          aircraft.aircraftModel === aircraftModel &&
          aircraft.airline.toLowerCase().includes(airline.toLowerCase()) &&
          aircraft.origin.toLowerCase().includes(origin.toLowerCase())
      );

      filteredAircraft = matchingAircrafts.reduce((closest, current) => {
        const currentDistance = calculateLevenshteinDistance(
          current.serialNumber,
          serialNumber
        );
        const closestDistance = calculateLevenshteinDistance(
          closest.serialNumber,
          serialNumber
        );

        return currentDistance < closestDistance ? current : closest;
      }, matchingAircrafts[0]);
    }

    res.json({ aircraft: filteredAircraft });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/plane/number", upload.single("image"), async (req, res) => {
  try {
    await Tesseract.recognize(req.body.image, "eng")
      .then(async ({ data: { text } }) => {
        const serialNumber = text.trim();
        if (serialNumber.includes(" ")) {
          const splitSerialNumber = serialNumber.split(" ").join("");
          res.json({ serialNumber: splitSerialNumber });
        } else {
          res.json({ serialNumber });
        }
      })
      .catch((error) => {
        console.error("Error processing image:", error);
        res.status(500).json({ error: "Error processing image" });
      });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
