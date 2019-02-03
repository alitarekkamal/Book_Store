const express = require('express');

const offersRoute = express.Router();

const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:offersRoute');

function router(nav) {
    offersRoute.route('/offers')
        .get((req, res) => {
            const { id } = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'libApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('connected correctly to server');

                    const db = client.db(dbName);

                    const col = await db.collection('offers');
                    const Offer = await col.find().toArray();
                    const offers = await col.findOne({ _id: new ObjectID(id) });

                    res.render('offersview', {
                        title: 'We Offered',
                        Offer,
                        offers,
                        nav
                    });
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
        });

    offersRoute.route('/offers/:id')
        .get((req, res) => {
            const { id } = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'libApp';
            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('connected to server correctly');

                    const db = client.db(dbName);

                    const col = await db.collection('offers');
                    const offer = await col.findOne({ _id: new ObjectID(id) });
                    debug(offer);
                    res.render('singleOffer', {
                        title: 'Good Offer For You',
                        nav,
                        offer
                    });
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
        });

    return offersRoute;
}

module.exports = router;
