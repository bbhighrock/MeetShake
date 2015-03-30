/************************************************************************************/
/*********************************** MODULES ****************************************/
/************************************************************************************/

var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var util =  require('util');
var bodyParser = require('body-parser');
var passport =  require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var mysql = require('mysql');


/************************************************************************************/
/********************************* CONFIGURATION ************************************/
/************************************************************************************/

//Configuration Facebook Connect
var fbApiKey = '342815219241216';
var fbApiSecret = 'c4ba007448460bd59fe4c2877a9f5816';
var cbUrl = 'http://localhost:3000/auth/facebook/callback';

//Configuration MySql
var useDB = 'true';
var host = 'meetshakedb.crmctavtajde.us-west-2.rds.amazonaws.com';
var username = 'awsdb';
var password = 'mikolibratistar';
var database = 'meetshake';
var port = '3306';

//Configuration session


/************************************************************************************/
/*************************************** MYSQL **************************************/
/************************************************************************************/

var connection = mysql.createConnection({
    host     : host,
    user     : username,
    password : password,
    port 	 : port,
    database : database
});

//Connect to Database only if Config.js parameter is set.
if(useDB ==='true')
{
    console.log("Connexion à la base MySql")
    connection.connect();
    connection.query('SELECT * FROM cards', function(err, rows, fields) {
        if (!err)
            console.log('BASE : QUERY TEST OK');
        else
            console.log('BASE : QUERY TEST KO');
    });
}


/************************************************************************************/
/*********************************** APP SET/USE ************************************/
/************************************************************************************/

//SET
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');

//USE
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'mikolibratistar', key: 'sid'}));
app.use(cookieParser());
app.use(session({secret:'mikolibratistar'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


/************************************************************************************/
/*********************************** PASSPORT FB ************************************/
/************************************************************************************/


// Passport session setup.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
        clientID: fbApiKey,
        clientSecret: fbApiSecret ,
        callbackURL: cbUrl
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            //Check whether the User exists or not using profile.id
            //Further DB code.
            return done(null, profile);
        });
    }
));

/************************************************************************************/
/************************************ FUNCTIONS *************************************/
/************************************************************************************/

function getCards(req, res, next) {
    var dbRequest = 'SELECT * FROM cards, theme WHERE cards.id_theme = theme.id';
    console.log(dbRequest);
    connection.query(dbRequest, function(error, rows) {
        if(rows.length !== 0) {
            console.log("Query OK");
            req.cards = rows;
            next();
        }
        else{
            console.log("Query KO");
            res.render('error'); /* Render the error page. */
        }
    });
}

function addUser(req, res, next){

    var user_data = {
        'login' : req.body.username,
        'email' : req.body.email,
        'password' : req.body.password,
        'homme' : req.body.homme,
        'femme' : req.body.femme,
        'birth' : req.body.birth,
        'perimetre' : 5
    };

    if(user_data.homme)
        user_data.sexe = 'M';
    else if(user_data.femme)
        user_data.sexe = 'F';

    var dbRequest = "INSERT INTO `meetshake`.`utilisateur` " +
        "(`login`, " +
        "`password`, " +
        "`email`, " +
        "`perimetre`, " +
        "`datebirth`, " +
        "`sexe`) VALUES " +
        "('"+user_data.login+"', " +
        "'"+user_data.password+"', " +
        "'"+user_data.email+"', " +
        "'"+user_data.perimetre+"', " +
        "'"+user_data.birth+"', " +
        "'"+user_data.sexe+"')";

    console.log('USERDATA : ' + JSON.stringify(user_data));
    console.log('DBREQUEST : ' + dbRequest );

    connection.query(dbRequest, function(err, result) {
        if(!err){
            console.log("INSERT OK")
            next();
        }
        else
            res.render('error'); /* Render the error page. */

    });
    /* .... A FINIR  insertion et hash*/

    next();
}

function addCard(req, res, next){

    var card_data = {

    };


    var dbRequest = "INSERT INTO `meetshake`.`cards` " +
        "(``, " +
        "``, " +
        "``, " +
        "``, " +
        "``, " +
        "``) VALUES " +
        "('"+card_data+"', " +
        "'"+card_data+"', " +
        "'"+card_data+"', " +
        "'"+card_data+"', " +
        "'"+card_data+"', " +
        "'"+card_data+"')";

    console.log('CARDDATA : ' + JSON.stringify(card_data));
    console.log('DBREQUEST : ' + dbRequest );

    connection.query(dbRequest, function(err, result) {
        if(!err){
            console.log("INSERT OK")
            next();
        }
        else
            res.render('error'); /* Render the error page. */

    });

    next();
}


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}


/************************************************************************************/
/************************************* ACTIONS **************************************/
/************************************************************************************/


app.get('/', function(req, res) {
    res.render('index', { title: 'Index', user: req.user  });
});

app.get('/profil',/* ensureAuthenticated,*/ function(req, res){
    res.render('profil', { user: req.user});
});

app.post('/cards/newcard',addCard, function(req, res){


    res.render('cards');
});

app.post('/auth/inscription', addUser ,function(req, res){

    /* ... Session a mettre à jour... */

    res.render('profil');
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/cards',
        failureRedirect: '/'
    }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


// Selection des Billets en fonction de la proximité
app.get('/cards', getCards,  function(req, res){

    res.render('billboard', {
        data: req.cards
    });

});

/************************************************************************************/
/********************************* ERRORS HANDLER ***********************************/
/************************************************************************************/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/************************************************************************************/
/********************************* PORT LISTENER ************************************/
/************************************************************************************/

app.listen(3000);
console.log("Server Démaré : Port 3000 en écoute ...")
