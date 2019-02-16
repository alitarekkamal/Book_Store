/* eslint-disable no-unused-vars */
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const nav = [

    { title: 'authors', link: '/authors' },
    { title: 'Books', link: '/Books' },
    { title: 'offers', link: '/offers' },
    { title: 'sign-out', link: '/signOut' }
];

const app = express();
const authorsRoute = require('./src/route/authorsroute');
const bookRouter = require('./src/route/bookroutes')(nav);
const offersRoute = require('./src/route/offersRoute')(nav);
const adminroute = require('./src/route/adminroute')(nav);
const authRoute = require('./src/route/authRoute')(nav);

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);


app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap3/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap3/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

//-----Routes----------//
app.use('/', bookRouter);
app.use('/', authorsRoute);
app.use('/', offersRoute);
app.use('/', adminroute);
app.use('/auth', authRoute);

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
            { title: 'sign-in', link: '/auth/signin' }
        ]
    });
});

//-----Signing out-----// 
app.get('/signOut', (req, res) => {
    console.log("logging out");
    req.logout();
    res.redirect('/');
});

//----- listening port --- //
app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log(`your port is ${chalk.green(' 3000')}`);
});