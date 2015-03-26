// server.js
// load the things we need
var express = require('express');
var mysql = require('mysql');
var gps_dist = require('gps-distance');


/*****************Configuration Module***************/

// Initialisation du module Express
var app = express();


//Configuration des paramétres de connexion à la BD MySQL
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'meetshake'

});

// Configuration du module body-parser
app.use(express.bodyParser()); // support json encoded bodies

//Configuration chemin dossier views
app.set('views', __dirname + '/views');

//Configuration du moteur de template : EJS
app.set('view engine', 'ejs');


app.use(express.static(__dirname+'/'));

/************************** Test ****************************/

var dist = gps_dist(48.85,2.57,48.85,2.58);
console.log('DISTANCE =' + dist);

connection.connect();



// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('pages/index',{ path : __dirname  } );
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

/*********************** Affichage BillBoard **********************/

// Selection des Billets en fonction de la proximité
app.post('/cards', function(req, res) {

    console.log("toto");
    console.log(req.body.latitude);

    //Récupération des parametres
    var user_info = {'latitude' : req.body.latitude,
        'longitude' : req.body.longitude,
        'perim' : req.body.perim
    };

    console.log(user_info);

    /* var cards = [];

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
     res.render('/pages/home');*/

});


// Selection des Billets en fonction de la proximité et du théme
app.get('cards/:theme', function(req,res){

});

/********************** User Cards *********************/

//Selection des billets d'un user par son id_user
app.get('cards/:id_user', function(req,res){

});

/*********************** Connexion **********************/

//Fonction permettant d'enregistrer un utilisateur
app.post('/register', function(req,res){

});

//Authentification sur le site
app.post('/auth',function(req,res){

});

/*********************** CARD **************************/

//Insertion d'un nouveau billet
app.post('/card',function(req,res){

});

//Supression d'un billet par id en méthode Delete
app.delete('/card/:id', function(req,res){

});

//Update d'un billet par id en méthode Update
app.post('/card/:id', function(req,res){

});

//Selection d'un billet par id en methode get
app.get('card/:id', function(req,res){

});
/********************************************************/

app.listen(8333);
console.log('8333 is the magic port');

connection.query('SELECT * FROM cards', function(err, rows, fields) {

    if (!err)
        console.log('The solution is: ', rows);
    else
        console.log('Error while performing Query.');
});

connection.end();