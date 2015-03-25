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

app.listen(8333);
console.log('8333 is the magic port');


connection.connect();
connection.query('SELECT * FROM cards', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();
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