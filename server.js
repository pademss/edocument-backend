require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Middleware
app.use(express.json()); // parse json bodies in the request object

// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/buku", require("./routes/bookRoutes"));
app.use("/pengguna", require("./routes/userRoutes"));
app.use("/dokumen", require("./routes/documentRoutes"));
app.use("/peminjaman", require("./routes/peminjamanRoutes"));
app.use("/login", require("./routes/loginRoutes"));

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went rely wrong",
  });
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
