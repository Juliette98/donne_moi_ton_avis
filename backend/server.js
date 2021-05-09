const express = require('express');
const session = require('express-session');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const Publication = require('./models/publication');

mongoose.connect('mongodb+srv://donne_ton_avis:donne_ton_avis@cluster0.dzqqp.mongodb.net/donne_ton_avis?retryWrites=true&w=majority')
    .then(() =>{
        console.log("Successfully connected to DB!");
    })
    .catch((error) => {
        console.log("Unable to connect to DB!");
    });


app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.set('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret:"mySecretKey", cookie:{maxAge: 24 * 60 *60 * 1000}}));


//Pour la connexion
app.post('/login', (request, response) => {
    User.findOne({login: request.body.login, password: request.body.password }, (error, user) => {
        if (error) return response.status(401).json({msg: "Erreur: " + error.msg});
        if (!user) return response.status(401).json({msg: "Pas d'utilisateur trouvé" });
        request.session.userId = user._id;
         response.status(200).json({login: user.login, fname: user.fname, lname: user.lname});
    });
});

// Pour la connexion
app.get('/logout', (request, response) => {
    request.session.destroy(error => {
        if(error) return response.status(409).json({msg: 'error'});
        response.status(200).json({msg: 'Logout OK'});
    })
})

// Teste si un utilisateur est connecté
app.get('/islogged', (request, response) => {
    if(!request.session.userId) return response.status(401).json();

    User.findOne({_id: request.session.userId}, (error, user) => {
        if (error) return response.status(401).json({msg:'Erreur: ' . error.msg});
        if (!user) return response.status(401).json({msg:'Aucun utilisateur connecté'});
        request.session.userId = user._id;
        response.status(200).json({login: user.login, fname: user.fname, lname: user.lname});
    })
})

//Pour l'inscription
app.post('/register', (request, response) =>{
    let requestUser = request.body;
    let newUser = new User({
        gender: requestUser.gender,
        fname: requestUser.fname,
        lname: requestUser.lname,
        login: requestUser.login,
        password: requestUser.password,
        birthday: requestUser.birthday
    }).save((error, client, err = null) => {
        if (error) return console.error(err);
        console.log(client);
        response.json(client);
    })
});

//Pour créer une publication
app.post('/publications', (request, response) =>{
    let publication = request.body;
    let newPub = new Publication({
        pubTitle: publication.pubTitle,
        pubRef: publication.pubRef,
        pubDescription: publication.pubDescription,
        pubPrice: publication.pubPrice,
        pubStore: publication.pubStore,
        pubLink: publication.pubLink,
        pubSize: publication.pubSize,
    });
    newPub.save((error, pub) => {
        if (error) return console.error(error);
        console.log(pub);
        response.json(pub);
    })
});

// Recherche de toutes les publications
app.get('/publications', (request, response) =>{
    Publication.find((error, publications) => {
        if (error) return console.error(err);
        response.json(publications);
    });
});

// Recherche d'une publication en particulier
app.get('/publication/:id', (request, response) =>{
    Publication.findOne( { _id: request.params.id }, (error, publication) => {
        if (error) {
            return response.status(404).json({error: error});
        }
        response.status(200).json(publication);
    });
});

app.listen(3000, ()=>{console.log("Listening on port 3000")});
