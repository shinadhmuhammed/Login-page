const e=require('express');
var express=require('express');
var router=express.Router();

const credential={
    email:'shinadh@gmail.com',
    password:1234
}

//login user
router.post('/login',(req,res)=>{
    if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.user=req.body.email;
        res.redirect('/route/dashboard');
    }else{
       res.end('invalid username');
    }
});

//route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        req.session.destroy()
    }
})

//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }else{
            res.render('base',{title:"express",logout:"logout succesfully...!"})
        }
     
    })
    
})


module.exports=router;