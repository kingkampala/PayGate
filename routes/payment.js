const express = require('express');
const router = express.Router();
const makePayment = require('../controller/payments');

router.post('/', makePayment)

module.exports = router;