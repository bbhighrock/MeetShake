// server.js
// load the things we need
var express = require('express');
var app = express();


var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'meetshake'

});

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var gps_dist = require('gps-distance');

var dist = gps_dist(48.85,2.58,48.85,2.58);
console.log('DISTANCE =' + dist);

connection.connect();



// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// Récupére l'ensemble des Billets
app.post('/cards', function(req, res) {

    //Récupération des parametres
    var user_info = {'latitude' : req.latitude,
                     'longitude' : req.longitude,
                     'perim' : req.body.perim
    };
    console.log(user_info);

    /* ... voir http://jsfiddle.net/LyD4Q/4/

    var cards = [];

    var paris = { 'longitude' : 48.856614, 'latitute' : 2.352222};

    connection.query('SELECT * FROM cards', function(err, rows, fields) {
        if (!err){
            rows.forEach(function(card) {
                //var distance = gps_dist(user_info.latitude,user_info.longitude,card.latitude,card.longitude);
                var distance = gps_dist(paris.latitute,paris.longitude,card.latitude,card.longitude);
                if(distance <= user_info.perim){
                    cards.push(card);
                    console.log("Ajout d'une Card");
                }
            });
        }
        else
            console.log('Error while performing Query.');

    res.json(cards);
    console.log(res);
    //res.render('home');
*/

});

app.listen(8333);
console.log('8333 is the magic port');


/*
connection.query('SELECT * FROM cards', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();*/
/*
 register (enregistrement d'un utilisateur )

 authentification (connection d'un utilisateur mdp / password)

 cards ( Creation / Modification / Suppression / Select1: Geoloc ou|et Théme / Select2: Mes cards )

	/addCard 
		Insertion carte 

	/majCard by id

	/delete by id

	/cards by geoloc et|ou theme

	/mycards by id personne

 confPerimetre (Curseur périmétre de géolocalisation)

*/