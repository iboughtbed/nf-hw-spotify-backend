import "dotenv/config";

import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import { Server as SocketIOServer } from "socket.io";

import connectDB from "./db";
import { logger } from "./logger";
import { globalRouter } from "./routes/global-router";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/", globalRouter);

const server = createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("message", (msg) => {
    console.log("message: ", msg);
    io.emit("message", msg);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000/api/");
});
