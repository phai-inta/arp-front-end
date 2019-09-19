const express = require("express");
const cors = require("cors");
const getAzureData = require("./src/azure");
const getAWSData = require("./src/aws");
const app = express();

app.use(cors());

app.get("/azure", async (req, res) => {
  const data = await getAzureData();
  res.json(data);
});

app.get("/aws", async (req, res) => {
  const awsData = await getAWSData();
  res.json(awsData);
});

app.listen(7000, () => {
  console.log("Simple server running at port 7000");
});