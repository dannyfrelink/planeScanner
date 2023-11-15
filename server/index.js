const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const cors = require("cors");
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

const extractSerialNumber = (data) => {
  // Split the string into an array of words
  const words = data.text.split(/\s+/);

  // Find the index of the longest word
  let longestWordIndex = 0;
  for (let i = 1; i < words.length; i++) {
    if (words[i].length > words[longestWordIndex].length) {
      longestWordIndex = i;
    }
  }

  // Return the serial number from the array
  return words.splice(longestWordIndex, 1)[0];
};

app.get("/plane/find", (req, res) => {
  res.send("Welcome");
});

app.post("/plane/number", upload.single("image"), async (req, res) => {
  try {
    const { data } = await Tesseract.recognize(req.body.image, "eng");
    const serialNumber = extractSerialNumber(data);
    res.json({ serialNumber });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
