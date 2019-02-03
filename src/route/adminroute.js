const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminroute');

const adminroute = express.Router();

// const books = [{
//         name: 'Reach a Wider Audience',
//         price: ' 150 $',
//         img: 'http://api.randomuser.me/portraits/thumb/men/55.jpg',
//         authors: 'Ali Tarek'
//     },
//     {
//         name: 'Repurpose Content ',
//         price: ' 200 $',
//         img: 'http://api.randomuser.me/portraits/thumb/men/59.jpg',
//         authors: 'ahmed Tarek'
//     },
//     {
//         name: '14 Useful Sites for Designers',
//         price: ' 175 $',
//         img: 'http://api.randomuser.me/portraits/thumb/men/57.jpg',
//         authors: 'ghadeer Tarek'
//     },
//     {
//         name: 'Dramatically Raise the Value of Any Piece',
//         price: ' 250 $',
//         img: 'http://api.randomuser.me/portraits/thumb/men/56.jpg',
//         authors: ' Tarek'

//     }
// ];

// const Offers = [{
//         name: 'Reach a Wider Audience',
//         price: ' 150 $',
//         sale: ' 100 $',
//         img: 'http://api.randomuser.me/portraits/thumb/men/55.jpg',
//         authors: 'Ali Tarek'
//     },
//     {
//         name: 'Repurpose Content ',
//         price: ' 200 $',
//         sale: ' 150 $',
//         img: 'http://api.randomuser.me/portraits/thumb/men/59.jpg',
//         authors: 'ahmed Tarek'
//     },
//     {
//         name: '14 Useful Sites for Designers',
//         price: ' 175 $',
//         sale: ' 120 $',
//         img: 'http://api.randomuser.me/portraits/thumb/men/57.jpg',
//         authors: 'ghadeer Tarek'
//     },
//     {
//         name: 'Dramatically Raise the Value of Any Piece',
//         price: ' 250 $',
//         sale: ' 200 $',
//         img: 'http://api.randomuser.me/portraits/thumb/men/56.jpg',
//         authors: ' Tarek'
//     }
// ];

function router() {
    adminroute.route('/admin')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url, { useNewUrlParser: true });
                    debug('connected correctly to server');

                    const db = client.db(dbName);

                    const offer = await db.collection('offers'); //.insertMany(Offers);

                    const response = await db.collection('books'); //.insertMany(books);
                    const books = await response.find().toArray();
                    const offers = await offer.find().toArray();
                    console.log(books);

                    const result = [books, offers];

                    res.json(result);
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
        });
    return adminroute;
}


module.exports = router;

// function offerRouter(nav) {
//     adminroute.route('/admin')
//         .get((req, res) => {
//             const url = 'mongodb://localhost:27017';
//             const dbName = 'libApp';

//             (async function mongo() {
//                 let client;
//                 try {
//                     client = await MongoClient.connect(url);
//                     debug('connected correctly to server');

//                     const db = client.db(dbName);

//                     const offer = await db.collection('offers').insertMany(Offers);
//                     res.json(offer);
//                 } catch (err) {
//                     debug(err.stack);
//                 }
//                 client.close();
//             }());
//         });
//     return adminroute;
// }

// module.exports = offerRouter;