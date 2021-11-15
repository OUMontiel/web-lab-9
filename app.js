const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// connection to db
mongoose.connect('mongodb+srv://user_test:pSYcfEoMuZ6jqKv6@cluster0.ydfxo.mongodb.net/mongo-crud?retryWrites=true&w=majority')
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// importing routes
const indexRoutes = require('./routes/routeindex');

// routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})
