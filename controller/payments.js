const paypal = require('paypal-rest-sdk');
const Card = require('../models/card');

const makePayment = async (req, res) => {
        const { amount, currency, card } = req.body;
      
        const createPaymentJson = {
          intent: 'sale',
          payer: {
            payment_method: 'credit_card',
            funding_instruments: [{
              credit_card: {
                number: card.number,
                type: card.type,
                expire_month: card.expire_month,
                expire_year: card.expire_year,
                cvv: card.cvv,
                first_name: card.first_name,
                last_name: card.last_name
              }
            }]
          },
          transactions: [{
            amount: {
              total: amount,
              currency: currency
            }
          }]
        };

        const cardDetails = req.body.card;

        try {
            const newCard = new Card(cardDetails);
            const savedCard = await newCard.save();
            res.status(200).json({ message: 'card information saved successfully', card: savedCard });
        } catch (error) {
            res.status(500).json({ error: 'could not save card information', details: error.message });
        }
      
        paypal.payment.create(createPaymentJson, (error, payment) => {
          if (error) {
            throw error;
          } else {
            for (let i = 0; i < payment.links.length; i++) {
              if (payment.links[i].rel === 'approval_url') {
                res.redirect(payment.links[i].href);
              }
            }
          }
        });
};

module.exports = makePayment;