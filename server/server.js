const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
    gender: String, // New gender field for utility requests
    address: { type: String, required: true }, // Address field
    phone: { type: String, required: true }, // Phone field
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "itemRequests" }
);

const ItemRequest = mongoose.model("ItemRequest", itemRequestSchema);

// Define Person schema and model
const personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    photoUrl: { type: String, required: true },
  },
  { collection: "persons" }
);

const Person = mongoose.model("Person", personSchema);

// Define a new schema and model for storing images
const imageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { collection: "images" }
);

const Image = mongoose.model("Image", imageSchema);

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Face++ API credentials
const FACE_PLUS_PLUS_API_KEY = "vnaWrRdpwGUeTmH9t_l1x7gEIdqI_XIC";
const FACE_PLUS_PLUS_API_SECRET = "ZjKShLjaPmHxxnNrsH_DYKRbxu_KRPIT";
const FACE_PLUS_PLUS_API_URL =
  "https://api-us.faceplusplus.com/facepp/v3/compare";

// Route to handle face comparison
app.post("/api/compare-face", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file uploaded." });
  }

  const uploadedImagePath = req.file.path;

  try {
    // Get all images from the uploads directory
    const directoryPath = path.join(__dirname, "uploads");
    const files = fs
      .readdirSync(directoryPath)
      .filter((file) => file !== req.file.filename);

    let mostSimilarPerson = null;
    let highestSimilarity = 0;

    // Compare the uploaded image with each image in the directory
    for (const file of files) {
      const imagePath = path.join(directoryPath, file);

      // Read images and encode them as base64
      const uploadedImage = fs.readFileSync(uploadedImagePath, {
        encoding: "base64",
      });
      const comparedImage = fs.readFileSync(imagePath, { encoding: "base64" });

      // Call Face++ API
      const response = await axios.post(FACE_PLUS_PLUS_API_URL, null, {
        params: {
          api_key: FACE_PLUS_PLUS_API_KEY,
          api_secret: FACE_PLUS_PLUS_API_SECRET,
          image_base64_1: uploadedImage,
          image_base64_2: comparedImage,
        },
      });

      console.log("Face++ API Response:", response.data); // Log the API response

      const similarity = response.data.similarity;

      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        mostSimilarPerson = {
          name: file, // Adjust this based on your actual naming convention
          address: "Address related to " + file, // Replace with actual address retrieval logic
        };
      }
    }

    fs.unlinkSync(uploadedImagePath); // Cleanup the uploaded file

    res.status(200).json({
      mostSimilarPerson,
      similarity: highestSimilarity,
    });
  } catch (error) {
    console.error(
      "Error in face comparison:",
      error.response?.data || error.message
    ); // Log detailed error
    res.status(500).json({ error: "Error comparing face." });
  }
});

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
  const {
    itemType,
    name,
    foodPackets,
    utilities,
    age,
    address,
    phone,
    gender,
  } = req.body;

  console.log("Received item request:", req.body);

  try {
    const newItemRequest = new ItemRequest({
      itemType,
      name,
      foodPackets: itemType === "Food" ? foodPackets : undefined, // For food requests
      utilities: itemType === "Utilities" ? utilities : undefined, // For utility requests
      age: itemType === "Utilities" ? age : undefined, // For utility requests
      gender: itemType === "Utilities" ? gender : undefined, // Gender for utility requests
      address, // Always required
      phone, // Always required
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

// Route to handle new person uploads
app.post("/api/person", upload.single("photo"), async (req, res) => {
  const { name, address } = req.body;
  const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

  console.log("Received person data:", req.body);
  console.log("Uploaded file info:", req.file); // To debug if the file is being uploaded

  try {
    const newPerson = new Person({
      name,
      address,
      photoUrl, // Make sure this is properly stored
    });
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (error) {
    console.error("Error saving person:", error);
    res.status(400).json({ error: error.message });
  }
});

// Route to get all persons
app.get("/api/person", async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to upload a new image with title
app.post("/api/upload-image", upload.single("image"), async (req, res) => {
  const { title } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!imageUrl || !title) {
    return res.status(400).json({ error: "Title and image are required." });
  }

  try {
    const newImage = new Image({
      title,
      imageUrl,
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all images
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
