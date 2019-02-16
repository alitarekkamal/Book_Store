const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());;

    // store user in the session//
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // retrieves user from session//
    passport.deserializeUser((user, done) => {
        //find user by id//
        done(null, user);


    });
}