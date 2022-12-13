import express from "express";
import http from "http";
import cors from "cors";

const App = () => {
  const app = express();
  const server = http.createServer(app);

  app.use(cors());
  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return { app, server };
};

export default App;
