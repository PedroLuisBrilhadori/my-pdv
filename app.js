import { SerialPort } from "serialport";
import express from "express";

const app = express();
const port = 3000;

let lastResponse;

const balence = new SerialPort({
  path: "COM6",
  baudRate: 4800,
});

balence.on("data", (buffer) => {
  const data = buffer?.toString();

  lastResponse = `${data}`.replace(/\x03|\x02/g, "");

  console.log(`${data}`.replace(/\x03|\x02/g, ""));
});

function sendENQ() {
  balence.write("\x05", "ascii", (error) => {
    if (error) console.log("erro:", error);
  });
}

function sendPrice(price) {
  const send = `\x02${price}\x03`;

  balence.write(send, "ascii", (error) => {
    if (error) console.log("erro:", error);
  });
}

function sendTare(tare) {
  const send = `\x01${tare}\x03`;
  console.log(send);

  balence.write(send, "ascii", (error) => {
    if (error) console.log("erro:", error);
  });
}

app.get("/weight", (req, res) => {
  sendENQ();
  res.send(`Resposta: ${lastResponse}`);
});

app.get("/price", (req, res) => {
  console.log(req.query);
  const { price } = req.query;

  sendPrice(`${price}`);

  res.send("preço enviado");
});

app.get("/tare", (req, res) => {
  sendTare("000156");

  res.send("peso tarado");
});

app.listen(port, () => {
  console.log("Server listening port 3000");
});
