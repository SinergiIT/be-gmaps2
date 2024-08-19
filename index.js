import express from "express";
import searchPlace from "./api/search-place.js";
import distance from "./api/distance.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Hanya mengizinkan dari localhost:5173
  methods: "GET,POST", // Metode yang diizinkan
  allowedHeaders: "Content-Type,Authorization", // Header yang diizinkan
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/search-place", searchPlace);
app.use("/api/distance", distance);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
