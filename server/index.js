const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const Tesseract = require("node-tesseract-ocr");
// const sharp = require("sharp");
import { temporaryFile } from "tempy";
const fs = require("fs");
// const Tesseract = require("tesseract.js");
const cors = require("cors");
const { aircrafts } = require("./aircraftData.json");
const port = 3001;

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "build")));

// Example: Set 'Cache-Control' header for CSS and JS files
app.use("/static/css", (req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=31536000"); // 1 year
  next();
});

app.use("/static/js", (req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=31536000"); // 1 year
  next();
});

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

// app.post("/plane/number", upload.single("image"), async (req, res) => {
//   try {
//     const [result] = await client.textDetection(req.body.image);
//     const serialNumber = result.textAnnotations[0].description.trim();

//     console.log("testing: ", serialNumber);

//     res.json({ serialNumber });
//   } catch (error) {
//     console.log("Error: ", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.post("/plane/number", upload.single("image"), async (req, res) => {
  try {
    // const image = fs.readFileSync(req.body.image);
    const base64Data = req.body.image.split(";base64,").pop();
    const tempFilePath = temporaryFile({ extension: "png" });
    await fs.writeFile(tempFilePath, Buffer.from(base64Data, "base64"));

    // const grayscaleImageBuffer = await sharp(Buffer.from(base64Data, "base64"))
    //   .resize({ width: 10 })
    //   .grayscale()
    //   .toBuffer();

    // const grayscaleBase64Data = grayscaleImageBuffer.toString("base64");

    console.log("testing: ", tempFilePath);

    const config = {
      lang: "eng",
      oem: 1, // OCR Engine Mode: 0 to 3
      psm: 3, // Page segmentation mode: 0 to 13
      binary: "/usr/local/bin/tesseract",
    };

    const text = await Tesseract.recognize(tempFilePath, config);

    const serialNumber = text.trim();

    res.json({ serialNumber });

    // await Tesseract.recognize(req.body.image, config)
    //   .then(async ({ data: { text } }) => {
    //     const serialNumber = text.trim();

    //     console.log("testing: ", text);

    //     if (serialNumber.includes(" ")) {
    //       const splitSerialNumber = serialNumber.split(" ").join("");
    //       res.json({ serialNumber: splitSerialNumber });
    //     } else {
    //       res.json({ serialNumber });
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error processing image:", error);
    //     res.status(500).json({ error: "Error processing image" });
    //   });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
