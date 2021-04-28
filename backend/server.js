const express = require('express');
const session = require('express-session');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
mongoose.connect('mongodb+srv://noteapp:noteapp@cluster0.dzqqp.mongodb.net/noteapp?retryWrites=true&w=majority')
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


//login
app.post('/login', (request, response) => {
    User.findOne({login: request.body.login, password: request.body.password }, (error, user) => {
        if (error) return response.status(401).json({msg: 'Error'});
        if (!user) return response.status(401).json({msg: 'Wrong login' });
        request.session.userId = user._id;
        response.status(200).json({login: user.login, fullName: user.fullName});
    });
});

//logout
app.get('/logout', (request, response) => {
    request.session.destroy(error => {
        if(error) return response.status(409).json({msg: 'error'});
        response.status(200).json({msg: 'Logout OK'});
    })
})

app.get('/islogged', (request, response) => {
    if(!request.session.userId) return response.status(401).json();

    User.findOne({_id: request.session.userId}, (error, user) => {
        if (error) return response.status(401).json({msg:'Error'});
        if (!user) return response.status(401).json({msg:'Error'});
        request.session.userId = user._id;
        response.status(200).json({login: user.login, fullName: user.fullName});
    })
})

app.listen(3000, ()=>{console.log("Listening on port 3000")});
