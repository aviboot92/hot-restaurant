const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const tables = require('./model/tables')

let waitingList =[{
    name : "Padma",
    contact : "8789858684",
    email : "padma@gmail.com"
}];

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html")); 
 });

app.get("/add",(req,res)=>{
   res.sendFile(path.join(__dirname, "./public/add.html")); 
});

app.get("/tables", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/viewTables.html"));
});

app.get("/api/tables", (req,res)=>{
    res.json(tables);
});

app.get("/api/waiting", (req,res)=>{
    res.json(waitingList);
});

app.post("/api/addNew", (req,res)=>{
    console.log(req.body);
    if(tables.length<5){
        tables.push(req.body);
        res.json(true);
    } else{
        waitingList.push(req.body);
        res.json(false);
    }
});

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"));
});

app.listen(PORT, ()=>{
    console.log("http://localhost:"+PORT);
});