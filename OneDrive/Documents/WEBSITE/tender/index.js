const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const User = require("./model/model")

const app = express();
require('dotenv').config()


// middleware
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


const PORT = 3000;
// DB_URI = mongodb://localhost:27017/tender
mongoose.set("strictQuery", false);

//mongodb connection
const connect = async() => {
    try{
        await mongoose.connect(process.env.MONGO)
        console.log('connected to db')
    }
    catch(err){
        throw(err)
    }
 }

 app.set("view engine","ejs")



 mongoose.connection.on("connected",() => {
    console.log("mongodb connected")
 })
 mongoose.connection.on("disconnected",() => {
    console.log("mongodb disconnected")
 })

app.get("/",(req,res)=>{
    User.find().exec((err,user) =>{
        if (err) {
            res.send("ERROR")
        } else {
            // res.render("details",{user:user})
            res.render("search")
        }
    })
});



app.post('/details',async(req,res)=>{
    const user = new User({
        ID:req.body.id,
        WARD:req.body.ward,
        PROJECT:req.body.project,
        SBD_PREPARATION:req.body.sbd,
        
        TENDER_PUBLISHED:req.body.tenderpublished,
        TENDER_OPEN:req.body.tenderopen,
        POST_TENDER:req.body.posttender,
        TENDER_NEGOTIATION:req.body.tenderapproval,
        LOA_PREPARATION:req.body.loa,
        AGREEMENT_APPROVED:req.body.agreementapproved,
        EMD_RELEASE:req.body.emdrelease,
        SITE_HANDOVER:req.body.sitehandover,
        BIDDER:req.body.bidder,
    })
    user.save((err)=>{
        if (err) {
            res.status(500)
        } else {
            res.redirect('/')
        }
    })
})

app.get('/details',async(req,res)=>{
    try {
        
        res.render("data")
    } catch (err) {
        res.status(500).json(err.message)
        
    }
})

app.get('/edit/:id',(req,res)=>{
    let id = req.params.id
    User.findById(id,(err,user)=>{
        if (err) {
            res.redirect("/")
        } else {
            if (user == null) {
                res.redirect("/")
            } else {
                res.render("edit",{user:user})
            }
        }
    })
    
})

app.post('/update/:id',(req,res)=>{
    let id = req.params.id
    User.findByIdAndUpdate(id,{
        ID:req.body.id,
        WARD:req.body.ward,
        PROJECT:req.body.project,
        SBD_PREPARATION:req.body.sbd,
        
        TENDER_PUBLISHED:req.body.tenderpublished,
        TENDER_OPEN:req.body.tenderopen,
        POST_TENDER:req.body.posttender,
        TENDER_NEGOTIATION:req.body.tenderapproval,
        LOA_PREPARATION:req.body.loa,
        AGREEMENT_APPROVED:req.body.agreementapproved,
        EMD_RELEASE:req.body.emdrelease,
        SITE_HANDOVER:req.body.sitehandover,
        BIDDER:req.body.bidder,
    },(err,result)=>{
        if (err) {
            res.redirect('/')
        } else {
            res.redirect('/add')
        }
    })
})

app.get('/search',(req,res)=>{
    res.render("search")
})

app.get('/get',(req,res)=>{
    const searchTerm = req.query.search;

    User.find({ $or: [{ WARD: { $regex: searchTerm, $options: 'i' } }, { PROJECT: { $regex: searchTerm, $options: 'i' } }, { ID: { $regex: searchTerm, $options: 'i' } }] }, (err, users) => {
        if (err) {
        //   res.render("searching",{users:users});
        res.redirect('/search')
        } else {
            if (users == null) {
               res.render('details')
            } else {
                res.render("searching",{users:users})
            }
          
        }
      });
    
})
app.get('/add',(req,res)=>{
    User.find().exec((err,user) =>{
        if (err) {
            res.send("ERROR")
        } else {
            // res.render("details",{user:user})
            res.render("details",{user:user})
        }
    })
})


app.listen(PORT, ()=>{
    connect();
    console.log(`server started at http://127.0.0.1:${PORT}`);
})

 