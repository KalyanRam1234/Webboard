// import express, { json, urlencoded } from "express";
const express = require("express");
const cors = require("cors");
const config = require("./config");
const userRouter = require("./routes/user-routes");
const boardRouter = require("./routes/board-routes");
const bodyParser = require("body-parser");
// import cors from "cors";
// import { json as _json } from "body-parser";
// import { port } from "./config.js";.
// import { routes } from "./routes/user-routes.js";

const app = express();

app.use(express.json());
app.use(cors());
// app.use(_json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api", userRouter);
app.use("/api", boardRouter);

app.listen(config.port, () =>
    console.log("App is listening on url http://localhost:" + config.port)
);
