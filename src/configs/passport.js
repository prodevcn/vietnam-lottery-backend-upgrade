const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
// const jwt = require('jsonwebtoken');

const User = require('../models/user');
const conf = require('./index');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: conf.secret,
};

const localOptions = {
  usernameField: 'email',
};

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy(localOptions, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            console.log('[PASSPORT]:[ERROR]: user email not found.');
            return done(null, false, { message: 'Incorrect email address.' });
          }

          user.comparePassword(password, (err1, isMatch) => {
            if (err1) {
              console.log('[PASSPORT]:[ERROR]: password is not matched.');
              return done(err1);
            }
            if (!isMatch) {
              console.log('[PASSPORT]:[ERROR]: wrong password.');
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
        })
        .catch((err) => {
          return done(err);
        });
    })
  );

  passport.use(
    new JwtStrategy(jwtOptions, (payload, done) => {
      User.findOne({ userId: payload.userId }, (err, user) => {
        if (err) {
          console.log('[PASSPORT]:[ERROR]: authentication error.', err);
          return done(err, false);
        }

        if (user) {
          console.log('[PASSPORT]:[SUCCESS]: authentication success.');
          done(null, user);
        } else {
          console.log('[PASSPORT]:[ERROR]: unauthenticated user.');
          done(null, false);
        }
      });
    })
  );
};
