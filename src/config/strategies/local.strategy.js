const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libApp';

        (async function addUser() {
            let client;
            try {
                client = await MongoClient.connect(url, { useNewUrlParser: true });
                debug('connect the server correctly');
                const db = client.db(dbName);
                const col = db.collection('users');
                const user = await col.findOne({ username });
                if (user && user.username) {
                    done(null, user);
                } else if (user && user.password) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (err) {
                console.log(err.stack);
            }
            client.close();
        }());
    }));
};