const express = require('express');
const session = require('express-session');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const Publication = require('./models/publication');
//gère le telechargement des images
const multer = require('multer');

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

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../frontend/src/assets/images/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(/\s/g, '').replace(/[^a-zA-Z.\s]/g, "").toLowerCase());
    }
})

var upload = multer({ storage: storage })

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
        response.status(200).json({id: user._id, login: user.login, fname: user.fname, lname: user.lname});
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

// Pour gérer les images
app.post('/upload', upload.single('image'), (request, response, next) =>{
    //Enregistre l'image
    const image = request.body;
    if (!image){
        console.log("erreur");
        const error = new Error ("'Erreur lors du chargement de l'image ");
        error.httpStatusCode = 400;
        return next(error)
    }
});

//Pour créer une publication
app.post('/publication', (request, response, next) =>{
    let publication = request.body;
    //Enregistre dans la base de données
    let newPub = new Publication({
    pubTitle: publication.pubTitle,
    pubRef: publication.pubRef,
    pubDescription: publication.pubDescription,
    pubPrice: publication.pubPrice,
    pubStore: publication.pubStore,
    pubLink: publication.pubLink,
    pubSize: publication.pubSize,
    pubImage: publication.pubImage,
    dateCreation: Date.now(),
    createdBy: publication.createdBy,
    creatorName: publication.creatorName
    });

    //Enregistre dans la base de données
    newPub.save((error, pub) => {
        if (error) return console.error(error);
        response.json(pub);
    });
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


//Suppression d'une publication
app.delete('/publication/:id', (request, response) =>{
    Publication.deleteOne({_id: request.params.id}, (error) => {
        if (error) return response.status(400).json({error:error});
        response.status(201).json({msg:'ok'});
    });
});

//Modification d'une publication
app.put('/publication/:id', (request, response) =>{
    let requestPublication = request.body;
    let newPublication = new Publication({
        _id: request.params.id,
        pubTitle: requestPublication.pubTitle,
        pubRef: requestPublication.pubRef,
        pubDescription: requestPublication.pubDescription,
        pubPrice: requestPublication.pubPrice,
        pubStore: requestPublication.pubStore,
        pubLink: requestPublication.pubLink,
        pubSize: requestPublication.pubSize,
        pubImage: requestPublication.pubImage
    });
    Publication.updateOne({_id:request.params.id}, newPublication, (error, publication) => {
        if (error) return response.status(400).json({error:error});
        response.status(201).json(publication);
    });
});

app.listen(3000, ()=>{console.log("Listening on port 3000")});
