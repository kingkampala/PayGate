const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const paypal = require('paypal-rest-sdk');
const mongoose = require('mongoose');

app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_URL;

paypal.configure({
  mode: 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'paygate'
    })
    .then(() => {
        console.log('database connection successful');
    })
    .catch((err) => {
        console.error('database connection error', err);
    });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});