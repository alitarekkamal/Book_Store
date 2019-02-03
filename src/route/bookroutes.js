const express = require('express');

const bookRouter = express.Router();

const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRouter');

function router(nav) {
    bookRouter.route('/Books')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('connected correctly to server');

                    const db = client.db(dbName);

                    const col = await db.collection('books');
                    const books = await col.find().toArray();

                    res.render('Books', {
                        title: 'Books-shop',
                        nav,
                        books
                    });
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
        });


    bookRouter.route('/Books/:id')
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

                    const col = await db.collection('books');
                    const book = await col.findOne({ _id: new ObjectID(id) });
                    debug(book);
                    res.render('singlebook', {
                        title: 'Your Book',
                        nav,
                        book
                    });
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
        });
    return bookRouter;
}
module.exports = router;
