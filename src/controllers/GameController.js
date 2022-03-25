const Result = require('../models/result');
const Staging = require('../models/staging');
const History = require('../models/history');
const Order = require('../models/order');

exports.getAllLatestResults = (req, res) => {
  const northern = new Promise((resolve, reject) => {
    Result.findOne({ gameType: 'northern' })
      .sort({ endTime: -1 })
      .then((result) => {
        console.log(
          '[GAME_CONTROLLER]:[SUCCESS]:[GET_ALL_LATEST_RESULT]:[NORTHERN_LOTTERY]'
        );
        resolve(result);
      })
      .catch((err) => {
        console.log(
          '[GAME_CONTROLLER]:[FAILED]:[GET_ALL_LATEST_RESULT]:[NORTHERN_LOTTERY]:',
          err
        );
        reject(err);
      });
  });

  const hanoi = new Promise((resolve, reject) => {
    Result.findOne({ gameType: 'hanoi' })
      .sort({ endTime: -1 })
      .then((response) => {
        console.log(
          '[GAME_CONTROLLER]:[SUCCESS]:[GET_ALL_LATEST_RESULT]:[HANOI_LOTTERY]'
        );
        resolve(response);
      })
      .catch((err) => {
        console.log(
          '[GAME_CONTROLLER]:[FAILED]:[GET_ALL_LATEST_RESULT]:[HANOI_LOTTERY]:',
          err
        );
        reject(err);
      });
  });

  const hochiminh = new Promise((resolve, reject) => {
    Result.findOne({ gameType: 'hochiminh' })
      .sort({ endTime: -1 })
      .then((response) => {
        console.log(
          '[GAME_CONTROLLER]:[SUCCESS]:[GET_ALL_LATEST_RESULT]:[HOCHIMINH_LOTTERY]'
        );
        resolve(response);
      })
      .catch((err) => {
        console.log(
          '[GAME_CONTROLLER]:[FAILED]:[GET_ALL_LATEST_RESULT]:[HOCHIMINH_LOTTERY]:',
          err
        );
        reject(err);
      });
  });

  const saigon = new Promise((resolve, reject) => {
    Result.findOne({ gameType: 'saigon' })
      .sort({ endTime: -1 })
      .then((response) => {
        console.log(
          '[GAME_CONTROLLER]:[SUCCESS]:[GET_ALL_LATEST_RESULT]:[SAIGON_LOTTERY]'
        );
        resolve(response);
      })
      .catch((err) => {
        console.log(
          '[GAME_CONTROLLER]:[FAILED]:[GET_ALL_LATEST_RESULT]:[SAIGON_LOTTERY]:',
          err
        );
        reject(err);
      });
  });

  const mega = new Promise((resolve, reject) => {
    Result.findOne({ gameType: 'mega' })
      .sort({ endTime: -1 })
      .then((response) => {
        console.log(
          '[GAME_CONTROLLER]:[SUCCESS]:[GET_ALL_LATEST_RESULT]:[MEGA_LOTTERY]'
        );
        resolve(response);
      })
      .catch((err) => {
        console.log(
          '[GAME_CONTROLLER]:[FAILED]:[GET_ALL_LATEST_RESULT]:[MEGA_LOTTERY]:',
          err
        );
        reject(err);
      });
  });

  Promise.all([northern, saigon, hochiminh, hanoi, mega])
    .then((response) => {
      console.log('[GAME_CONTROLLER]:[SUCCESS]:[GET_ALL_LATEST_RESULT]:[ALL]');
      return res.json(response);
    })
    .catch((err) => {
      console.log(
        '[GAME_CONTROLLER]:[FAILED]:[GET_ALL_LATEST_RESULT]:[ALL]:',
        err
      );
      res.send('something went wrong');
    });
};

exports.getLatestResult = (req, res) => {
  const { gameType } = req.params;

  Result.findOne({ gameType: gameType })
    .sort({ endTime: -1 })
    .then((result) => {
      if (result) {
        console.log('[GAME_CONTROLLER]:[SUCCESS]:[GET_LATEST_RESULT]');
        return res.send(result);
      }
      console.log;
      return res.json({ msg: 'no result', status: false });
    })
    .catch((err) => {
      console.error('[GAME_CONTROLLER]:[ERROR]:[GET_LATEST_RESULT]', err);
    });
};

exports.getAllResultForGameType = (req, res, next) => {
  const { gameType } = req.params;

  Result.find({ gameType })
    .sort({ endTime: -1 })
    .limit(50)
    .then((data) => {
      console.log('[GAME_CONTROLLER]:[SUCCESS]:[FETCHING_GAME_HISTORY]');
      return res.json(data);
    })
    .catch((err) => {
      console.log('[GAME_CONTROLLER]:[ERROR]:[FETCHING_GAME_HISTORY]:', err);
      res.status(400);
      next(err);
    });
};

exports.getAllHistoryForUser = (req, res, next) => {
  const { userId } = req.params;

  History.find({ userId })
    .sort({ endTime: -1 })
    .then((data) => {
      console.log('[GAME_CONTROLLER]:[SUCCESS]:[FETCHING_GAME_HISTORY]');
      return res.json(data);
    })
    .catch((err) => {
      console.log('[GAME_CONTROLLER]:[ERROR]:[FETCHING_GAME_HISTORY]:', err);
      res.status(400);
      next(err);
    });
};

exports.getAllOrderForUser = (req, res, next) => {
  const { userId } = req.params;

  Order.find({ userId })
    .sort({ createdAt: -1 })
    .then((data) => {
      console.log('[GAME_CONTROLLER]:[SUCCESS]:[FETCHING_GAME_HISTORY]');
      return res.json(data);
    })
    .catch((err) => {
      console.log('[GAME_CONTROLLER]:[ERROR]:[FETCHING_GAME_HISTORY]:', err);
      res.status(400);
      next(err);
    });
};

exports.getAllOrderForGame = (req, res, next) => {
  const { userId, gameType } = req.body;

  Order.find({ userId, gameType })
    .sort({ createdAt: -1 })
    .then((data) => {
      console.log('[GAME_CONTROLLER]:[SUCCESS]:[FETCHING_GAME_HISTORY]');
      return res.json(data);
    })
    .catch((err) => {
      console.log('[GAME_CONTROLLER]:[ERROR]:[FETCHING_GAME_HISTORY]:', err);
      res.status(400);
      next(err);
    });
};

exports.getAllOrders = (req, res, next) => {
  const { userId, gameType } = req.body;

  Order.find({ userId: userId, gameType: gameType })
    .sort({ createdAt: -1 })
    .then((data) => {
      console.log('[GAME_CONTROLLER]:[SUCCESS]:[FETCHING_ALL_GAME_HISTORY]');
      return res.send(data);
    })
    .catch((err) => {
      console.log(
        '[GAME_CONTROLLER]:[ERROR]:[FETCHING_ALL_GAME_HISTORY]:',
        err
      );
      res.status(400);
      next(err);
    });
};

exports.getNewGameInfo = (req, res, next) => {
  const { gameType } = req.params;

  Staging.findOne({ gameType })
    .then((data) => {
      console.log('[GAME_CONTROLLER]:[SUCCESS]:[FETCHING_NEW_GAME_INFO]');
      return res.json(data);
    })
    .catch((err) => {
      console.log('[GAME_CONTROLLER]:[ERROR]:[FETCHING_NEW_GAME_INFO]:', err);
      res.status(400);
      next(err);
    });
};

exports.saveGameResult = (req, res, next) => {
  const { gameType, numbers, endTime } = req.body;
  const newResult = new Result({
    gameType,
    numbers,
    endTime,
  });

  newResult
    .save()
    .then(() => {
      console.log('[GAME_CONTROLLER]:[SUCCESS]:[SAVE_GAME_RESULT]');
      return res.send('save game result successfully');
    })
    .catch((err) => {
      console.log('[GAME_CONTROLLER]:[ERROR]:[SAVE_GAME_RESULT]:', err);
      res.send('save game error');
      next(err);
    });
};
