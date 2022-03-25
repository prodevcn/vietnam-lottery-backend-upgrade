require('dotenv').config();

module.exports = {
  dbUrl: process.env.DATABASE_URL,
  port: process.env.PORT,
  secret: process.env.SECRET,
  confirmEmail: process.env.CONFIRM_MAIL_USER,
  confirmEmailPwd: process.env.CONFIRM_MAIL_PASS,
  seedTimeNorthern: process.env.SEED_TIME_NORTHERN,
  seedTimeVipHochiminh: process.env.SEED_TIME_VIP_HOCHIMINH,
  seedTimeVipHanoi: process.env.SEED_TIME_VIP_HANOI,
  seedTimeVipSaigon: process.env.SEED_TIME_VIP_HANOI,
  seedTimeSouthernHochiminh: process.env.SEED_TIME_SOUTHERN_HOCHIMINH,
  seedTimeCentralQuangnam: process.env.SEED_TIME_CENTRAL_QUANGNAM,
  resultUrl_1: process.env.RESULT_URL1,
  resultUrl_2: process.env.RESULT_URL2,
  resultUrlNorthern: process.env.RESULT_URL_NORTHERN,
  resultUrlSouthern: process.env.RESULT_URL_SOUTHERN_HOCHIMINH,
  resultUrlAsean: process.env.RESULT_URL_ASEAN,
  // serviceUrl: process.env.SERVICE_URL_PRODUCT,
  serviceUrl: process.env.SERVICE_URL_DEBUG,
  exchangeRate: Number(process.env.EXCHANGE_RATE),
};
