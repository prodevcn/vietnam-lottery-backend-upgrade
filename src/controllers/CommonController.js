const axios = require('axios');
const conf = require('../configs');

exports.getBalanceFromMainService = (req, res) => {
  const { token } = req.body;

  axios
    .get(`${conf.serviceUrl}/get-balance`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.data.code === 0) {
        console.log(
          '[COMMON_CONTROLLER]:[SUCCESS]:[GET_BALANCE]:',
          response.data
        );

        return res.send({ code: 0, balance: response.data.data.balance });
      } else {
        console.log(
          '[COMMON_CONTROLLER]:[ERROR]:[GET_BALANCE]:',
          response.data.error
        );

        return res.send({
          code: 1,
          balance: null,
          msg: 'Main service error ...',
        });
      }
    })
    .catch((err) => {
      console.log('[COMMON_CONTROLLER]:[ERROR]:[GET_BALANCE]:', err);

      return res.send({
        code: 2,
        balance: null,
        msg: 'Something went wrong ...',
      });
    });
};
