const axios = require('axios');
const User = require('../models/user');
const Order = require('../models/order');
const conf = require('../configs');

exports.saveBet = async (req, res) => {
  const orders = req.body;

  for (let order of orders) {
    const { userId, betAmount } = order;
    const user = await User.findOne({ userId: userId });
    const response = await axios.get(`${conf.serviceUrl}/get-balance`, {
      headers: {
        Authorization: user.token,
        'Content-Type': 'application/json',
      },
    });
    const balance = response.data.data.balance;

    if (balance < (betAmount / conf.exchangeRate).toFixed(2)) {
      return res.json({ msg: 'Insufficient balance' });
    }

    order.betAmount = (order.betAmount / conf.exchangeRate).toFixed(2);

    const newOrder = new Order(order);

    await User.updateOne(
      { userId: userId },
      { balance: user.balance - (betAmount / conf.exchangeRate).toFixed(2) }
    );

    const saveOrder = await newOrder.save();

    await axios.post(
      `${conf.serviceUrl}/create-transaction`,
      {
        game: 'lottopoka',
        transactionId: saveOrder._id,
        type: betAmount,
        amount: (betAmount / conf.exchangeRate).toFixed(2),
      },
      {
        headers: {
          Authorization: user.token,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return res.json({ msg: 'success' });
};

exports.fetchBets = (req, res) => {
  const { userId } = req.params;

  Order.find({ userId: userId })
    .then((orders) => {
      console.log('[BET_CONTROLLER]:[SUCCESS]:[GET_ORDERS]');

      return res.send(orders);
    })
    .catch((err) => {
      console.log('[BET_CONTROLLER]:[ERROR]:[GET_ORDERS]:', err);

      return res.json({
        msg: 'Something went wrong, server is not responding.',
      });
    });
};
