const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Define the path to your db.json file
const dbPath = path.join(__dirname, "db.json");

app.get("/", (req, res) => {
  return res.send("Hello World");
});

// Middleware to serve the data from db.json
app.get("/dashboard", (req, res) => {
  fs.readFile(dbPath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read database" });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData.dashboard);
    } catch (e) {
      res.status(500).json({ error: "Failed to parse database" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
