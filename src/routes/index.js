const express = require('express');
const passport = require('passport');
const AuthController = require('../controllers/AuthController');
const GameController = require('../controllers/GameController');
const BetController = require('../controllers/BetController');
const CommonController = require('../controllers/CommonController');

const requireAuth = passport.authenticate('jwt', { session: false });
// const requireLogin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  const gameRoutes = express.Router();
  const betRoutes = express.Router();

  /** api routes */
  apiRoutes.get('/test', (req, res) => {
    return res.send({ status: true, msg: 'Server is running ...' });
  });
  apiRoutes.use('/auth', authRoutes);

  apiRoutes.use('/game', gameRoutes);

  apiRoutes.post(
    '/get-balance',
    requireAuth,
    CommonController.getBalanceFromMainService
  );

  /** auth routes */
  authRoutes.get('/authenticate', AuthController.auth);

  authRoutes.get(
    '/get-user-info/:userId',
    requireAuth,
    AuthController.getUserInfo
  );

  /** game routes  */
  gameRoutes.get(
    '/get-new-game-info/:gameType',
    requireAuth,
    GameController.getNewGameInfo
  );

  gameRoutes.get(
    '/get-latest-result/:gameType',
    requireAuth,
    GameController.getLatestResult
  );

  gameRoutes.get('/get-all-latest-results', GameController.getAllLatestResults);

  gameRoutes.get(
    '/get-all-results/:gameType',
    requireAuth,
    GameController.getAllResultForGameType
  );

  gameRoutes.get(
    '/get-all-history/:userId',
    requireAuth,
    GameController.getAllHistoryForUser
  );

  gameRoutes.get(
    '/get-all-order/:userId',
    requireAuth,
    GameController.getAllOrderForUser
  );

  gameRoutes.post(
    '/get-all-order',
    requireAuth,
    GameController.getAllOrderForGame
  );

  gameRoutes.get('/get-all-orders', requireAuth, GameController.getAllOrders);

  gameRoutes.use('/bet', betRoutes);

  gameRoutes.post('/save-result', requireAuth, GameController.saveGameResult);

  /** bet routes */
  betRoutes.post('/save', requireAuth, BetController.saveBet);

  betRoutes.get(
    '/get-bet-history/:userId',
    requireAuth,
    BetController.fetchBets
  );

  app.use('/', apiRoutes);
};
