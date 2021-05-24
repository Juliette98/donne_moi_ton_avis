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
// Pour encoder les mdp
const bcrypt = require('bcrypt');

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
    User.findOne({login: request.body.login}, (error, user) => {
        if (error) return response.status(401).json({msg: "Erreur: " + error.msg});
        if (!user) return response.status(401).json({msg: "Pas d'utilisateur trouvé" });
        bcrypt.compare(request.body.password, user.password, function(err, result) {
            if (result){
                request.session.userId = user._id;
                response.status(200).json(user);
            }
            else return response.status(401).json({msg: "Mot de passe invalide" });
        });

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
    if(!request.session.userId) return response.status(401).json({msg:'Aucun utilisateur connecté'});

    User.findOne({_id: request.session.userId}, (error, user) => {
        if (error) return response.status(401).json({msg:'Erreur: ' . error.msg});
        if (!user) return response.status(401).json({msg:'Aucun utilisateur connecté'});
        request.session.userId = user._id;
        response.status(200).json(user);
    })
})

//Pour l'inscription
app.post('/register', (request, response) =>{
    let requestUser = request.body;
    //Encode le mot de passe
    bcrypt.hash(requestUser.password, 5, function(err, hash) {
        new User({
            gender: requestUser.gender,
            fname: requestUser.fname,
            lname: requestUser.lname,
            login: requestUser.login,
            password: hash,
            birthday: requestUser.birthday
        }).save((error, user, err = null) => {
            if (error) return console.error(err);
            console.log(user);
            response.json(user);
        })
    });
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

// recherche de publication selon des filtres
app.post('/filtre', (request, response) =>{
    let prixMax = request.body.prixMax;
    let boutique = request.body.boutique;
    let motCle = request.body.motCle;
    // si le prix n'est pas renseigné, on fixe le max à 1000
    if (!prixMax) prixMax = 1000;
    if (!boutique ) boutique = "";
    if (!motCle) motCle = "";
    console.log(prixMax); console.log(boutique); console.log(motCle);
    Publication.find( {$and: [
                {'pubStore': { "$regex": boutique, "$options": "i" } },
                {$or: [
                        {'pubTitle': { "$regex": motCle, "$options": "i" }},
                        {'pubRef': { "$regex": motCle, "$options": "i" }},
                        {'pubDescription': { "$regex": motCle, "$options": "i" }},
                        {'pubLink': { "$regex": motCle, "$options": "i" }},
                    ]},
                {'pubPrice': {$lt: prixMax + 1}} ]},
        function(err,publications){
            console.log(publications);
            if(!err) response.json(publications);
        });
});

// Recherche de toutes les publications
app.get('/mes-publications/:id', (request, response) =>{
    Publication.find({ createdBy: request.params.id }, (error, publications) => {
        if (error) return console.error(err);
        response.json(publications);
    });
});

// Obtiens les informations sur un utilisateur
app.get('/profil/:id', (request, response) => {
    User.findOne({_id: request.params.id}, (error, user) => {
        if (error) return response.status(401).json({msg:'Erreur: ' . error.msg});
        response.status(200).json(user);
    })
})

// Supprime un compte et ses publications
app.delete('/account/:id', (request, response) =>{
    let id = request.params.id;
    //Supprime les publications correspondant
    Publication.deleteMany({createdBy: id}, (error) => {
        if (error) return response.status(400).json({error:"Erreur lors de la suppression des publications"});
        //Supprime l'utilisateur
        User.deleteOne({_id: id}, (error) => {
            if (error) return response.status(400).json({error:"Erreur lors de la suppression de l'utilisateur"});
            //Déconnecte l'utilisateur
            request.session.destroy(error => {
                if(error) return response.status(409).json({msg: 'error'});
                response.status(200).json({msg: 'Utilisateur supprimé avec succès'});
            });
        });
    });
});

//Modification d'un compte
app.put('/account/:id', (request, response) =>{
    let requestUser = request.body;
    let newUser = new User({
        _id: request.params.id,
        gender: requestUser.gender,
        fname: requestUser.fname,
        lname: requestUser.lname,
        login: requestUser.login,
        birthday: requestUser.birthday,
    });

    //Met à jour l'utilisateur
    User.updateOne({_id:request.params.id}, newUser, (error, user) => {
        if (error) return response.status(400).json({error:error});
        response.status(201).json(user);
    });

    //Met à jour son nom sur les publicatons
    creatorName = requestUser.fname + " " + requestUser.lname
    Publication.find({ createdBy: request.params.id }, (error, publications) => {
        if (error) return console.error(error);
        publications.forEach( function(publication){
            pubId = publication._id;
            Publication.updateOne({_id: pubId}, {creatorName: creatorName}, (error, publication) => {
                if (error) return response.status(400).json({error:error});
            });
        });
    });
});


//Modification du mot de passe
app.put('/change-pwd/:id', (request, response) =>{
    let id = request.params.id;
    let oldPassword = request.body.oldPassword;
    let newPassword = request.body.newPassword;

    //Vérifie si l'ancien mot de passe correspond et si oui, modifie le mot de passe
    User.findOne({_id: id}, (error, user) => {
        if (error) return response.status(401).json({msg: "Erreur: " + error.msg});
        if (!user) return response.status(401).json({msg: "Pas d'utilisateur trouvé" });
        bcrypt.compare(oldPassword, user.password, function(err, result) {
            if (result){
                bcrypt.hash(newPassword, 5, function(err, hash) {
                    User.updateOne({_id: id}, {password: hash}, (error, user) => {
                        if (error) return response.status(400).json({msg:"Erreur lors de la mise à jour"});
                        response.status(201).json(user);
                    });
                });
            }
            else return response.status(401).json({msg: "Ancien mot de passe invalide" });
        });

    });
});

app.listen(3000, ()=>{console.log("Listening on port 3000")});
