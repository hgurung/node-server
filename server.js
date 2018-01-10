const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log + '\n');
    next();
});

// app.use((req, res , next) => {
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('convertToUpperCase', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to homepage'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs',{
        pageTitle: 'Portfolio Page',
        welcomeMessage: 'Welcome to my portfolio'
    });
});

app.get('/bad' ,(req , res) => {
    res.send({
        error: 'Unable to find any thing'
    });
})
app.listen(port, () => {
    console.log(`Server is up on ${port} port`);
});