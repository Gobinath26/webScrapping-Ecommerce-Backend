//const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
console.log(process.env.MONGO_URL);


const app = express();

const PORT = process.env.PORT;

//const MONGO_URL = "mongodb://localhost";
const  MONGO_URL= process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient( MONGO_URL);
  await client.connect();
  console.log("mongo is connected✌");
  return client;
}
const client = await createConnection();


app.use(express.json());
app.use(cors());

app.get("/flipkart", async function (request, response) {
    const data= await client.db("scrap").collection("flipkart").find({}).toArray();
  response.send(data);
});

app.get("/amazon", async function (request, response) {
    const data= await client.db("scrap").collection("amazon").find({}).toArray();
  response.send(data);
});

app.get("/snapdeal", async function (request, response) {
    const data= await client.db("scrap").collection("snapdeal").find({}).toArray();
  response.send(data);
});

app.post("/flipkart" ,async function(request,response){

    const data = request.body;
    console.log(data);
    const result = await client.db("scrap")
    .collection("flipkart")
    .insertMany(data);
    response.send(result);
})

app.post("/amazon" ,async function(request,response){

    const data = request.body;
    console.log(data);
    const result = await client.db("scrap")
    .collection("amazon")
    .insertMany(data);
    response.send(result);
})

app.post("/snapdeal" ,async function(request,response){

    const data = request.body;
    console.log(data);
    const result = await client.db("scrap")
    .collection("snapdeal")
    .insertMany(data);
    response.send(result);
})

app.get("/", function (request, response) {
  response.send("Welcome to Scraping App✨😍👌");
});

app.listen(PORT, () => console.log(`server started in ${PORT}`));
