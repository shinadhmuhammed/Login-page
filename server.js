const bodyParser = require('body-parser');
const express=require('express');
const session = require('express-session');
const path=require('path');
const app=express();
const {v4:uuidv4}=require('uuid');
const router=require('./router');




const port=process.env.port||3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});


app.set('view engine','ejs');

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))


app.use(session({
    secret:uuidv4(),
    resave:'false',
    saveUninitialized:'true'
}));

app.use('/route',router);



app.get('/',(req,res)=>{
    res.render('base',{title:"login system"})
})

  
app.listen(port,()=>{console.log("listening to the server")})