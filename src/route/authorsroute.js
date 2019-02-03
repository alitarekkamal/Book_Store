/* eslint-disable no-unused-vars */
const express = require('express');

const authorsRoute = express.Router();


authorsRoute.route('/authors').get((req, res) => {
    res.render('authors', {
        title: 'AUTHORS',
        nav: [
            { title: 'home', link: '/' },
            { title: 'Books', link: '/Books' },
            { title: 'offers', link: '/offers' }
        ],

    });
});


module.exports = authorsRoute;
