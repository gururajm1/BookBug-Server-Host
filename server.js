const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/bookRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
