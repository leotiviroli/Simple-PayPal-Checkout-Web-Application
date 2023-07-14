const express = require('express');
const fetch = require('isomorphic-fetch');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, 'New');
app.use(express.static(publicPath));

// Add CSP header
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

const environment = process.env.ENVIRONMENT || 'sandbox';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url = environment === 'sandbox' ? 'https://sandbox.paypal.com' : 'https://sandbox.paypal.com';

/**
 * Creates an order and returns it as a JSON response.
 */
app.post('/create_order', (req, res) => {
  const order_data_json = {
    'intent': req.body.intent.toUpperCase(),
    'purchase_units': [{
      'amount': {
        'currency_code': 'USD',
        'value': '$2,351.8'
      }
    }]
  };

  const data = JSON.stringify(order_data_json);

  fetch(endpoint_url + '/v2/checkout/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    },
    body: data
  })
    .then(response => response.json())
    .then(json => {
      res.send(json);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

/**
 * Completes an order and returns it as a JSON response.
 */
app.post('/complete_order', (req, res) => {
  fetch(endpoint_url + '/v2/checkout/orders/' + req.body.order_id + '/' + req.body.intent, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      res.send(json);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${3000}`);
});
