const express = require("express");
const app = express();
const multer = require("multer");
const Tesseract = require("tesseract.js");
const port = 3001;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.post("/plane/find", upload.single("image"), async (req, res) => {
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
