require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");

const app = express();

app.use(bodyParser.json());

app.use(cors());

// app.use((req, res, next) => {
//   // console.log(req.body)
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);

app.use((error, req, res, next) => {
  console.log(error.message);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
