const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controllers/bookController')
const bookService = require('../services/goodreadsService');

function router(nav) {
    const { getIndex, getById } = bookController(bookService, nav);

    bookRouter.route('/Books')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get(getIndex);

    bookRouter.route('/Books/:id')
        .get(getById);
    return bookRouter;
}

module.exports = router;