const functions = require("firebase-functions");

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')
    ('sk_test_51N1w8wSGUC39K1nVpUHWiywX4TDJMnfzfKjnFWBpHstBkDahtch0TSNBZJ2actsUG4gXWai79Y3hYGkNi5ii4HGJ007EQmcF6O');

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// API

// API Configuration
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get('/', (req, res) => res.status(200).send("Hello World"));

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;

    console.log("Total amount for payment is: ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        // Following 'total' amount is the sub-units of currency
        amount: total,
        currency: 'usd',
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
});

// Listen Command
exports.api = functions.https.onRequest(app);

// API endpoint Example
// http://127.0.0.1:5001/clone-1d0ef/us-central1/api
// An endpoint is a component of an API, while an API is a set of rules that allow two applications to share resources. Endpoints are the locations of the resources, and the API uses endpoint URLs to retrieve the requested resources
