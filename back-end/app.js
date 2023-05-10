require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;

//Middlewares
const cors = require("./middlewares/cors");

//DB
const connectDB = require("./db");

//Routers
const appRouter = require("./routes/AppRouter");

connectDB();

app.use("/api", appRouter);

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});
