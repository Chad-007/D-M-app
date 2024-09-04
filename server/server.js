const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI =
  "mongodb+srv://alan:alan@cluster0.3e4yv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Define Rescue Request schema and model
const rescueRequestSchema = new mongoose.Schema(
  {
    latitude: Number,
    longitude: Number,
    requestNumber: Number,
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "rescueRequests" }
);

const RescueRequest = mongoose.model("RescueRequest", rescueRequestSchema);

// Define Item Request schema and model
const itemRequestSchema = new mongoose.Schema(
  {
    itemType: { type: String, required: true },
    name: { type: String, required: true },
    foodPackets: Number, // Only for food requests
    utilities: String, // Only for utility requests
    age: Number, // Only for utility requests
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "itemRequests" }
);

const ItemRequest = mongoose.model("ItemRequest", itemRequestSchema);

// Route to handle new rescue requests
app.post("/api/rescue", async (req, res) => {
  const { latitude, longitude, requestNumber } = req.body;
  console.log("Received rescue request:", req.body);
  try {
    const newRequest = new RescueRequest({
      latitude,
      longitude,
      requestNumber,
    });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all rescue requests
app.get("/api/rescue", async (req, res) => {
  try {
    const requests = await RescueRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to handle new item requests (food, medicine, utilities)
app.post("/api/request-item", async (req, res) => {
  const { itemType, name, foodPackets, utilities, age } = req.body;
  console.log("Received item request:", req.body);
  try {
    const newItemRequest = new ItemRequest({
      itemType,
      name,
      foodPackets,
      utilities,
      age,
    });
    await newItemRequest.save();
    res.status(201).json(newItemRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all item requests
app.get("/api/request-item", async (req, res) => {
  try {
    const requests = await ItemRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Basic route for server status
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
