const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=> {
    return text.toUpperCase();
})
app.set('view-engine','hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = now + ': ' + req.method + req.url;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err) => {
        if (err) {
            console.log('Gak bisa nambah log ke file server.log');
        }        
    });
    next();
});
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    //res.send('<h1>Halo Ekspres</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page Saya',
        welcomeMessage: 'Selamat datang di Website Guwe',
    }); 
});

app.get('/About',(req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Tidak bisa meng-handle' 
    })
});


app.listen(3000,() =>{
    console.log('Mulai server dan mendengarkan');
});
