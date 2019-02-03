/* eslint-disable no-unused-vars */
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const nav = [
    { title: 'home', link: '/' },
    { title: 'authors', link: '/authors' },
    { title: 'Books', link: '/Books' },
    { title: 'offers', link: '/offers' }
];

const app = express();
const authorsRoute = require('./src/route/authorsroute');
const bookRouter = require('./src/route/bookroutes')(nav);
const offersRoute = require('./src/route/offersRoute')(nav);
const adminroute = require('./src/route/adminroute')(nav);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap3/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap3/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

//-----Routes----------//
app.use('/', bookRouter);
app.use('/', authorsRoute);
app.use('/', offersRoute);
app.use('/', adminroute);
//----template setting--------//
app.set('views', './src/views');
app.set('view engine', 'ejs');

//-----Home => GET REQUEST--//
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Ali book-store',
        nav: [
            { title: 'Books', link: '/Books' },
            { title: 'authors', link: '/authors' },
            { title: 'offers', link: '/offers' }
        ],
        nav_left: [
            { title: 'sign-in', link: '/sign-in' },
            { title: 'sign-up', link: '/sign-up' }
        ],
        books: [{
                name: 'Reach a Wider Audience',
                price: ' 150 $',
                img: 'http://api.randomuser.me/portraits/thumb/men/55.jpg',
                authors: 'Ali Tarek'
            },
            {
                name: 'Repurpose Content ',
                price: ' 200 $',
                img: 'http://api.randomuser.me/portraits/thumb/men/59.jpg',
                authors: 'ahmed Tarek'
            },
            {
                name: '14 Useful Sites for Designers',
                price: ' 175 $',
                img: 'http://api.randomuser.me/portraits/thumb/men/57.jpg',
                authors: 'ghadeer Tarek'
            },
            {
                name: 'Dramatically Raise the Value of Any Piece',
                price: ' 250 $',
                img: 'http://api.randomuser.me/portraits/thumb/men/56.jpg',
                authors: ' Tarek'
            }
        ]
    });
});

//----- listening port --- //
app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log(`your port is ${chalk.green(' 3000')}`);
});
