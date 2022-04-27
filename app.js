//jshint esversion:6

const express = require("express");

//this is to require https, we dnt need to install thru node because it one of nodes native packages
const https = require("https")

const app = express();

// this is to get the infor from the server
app.get("/", function(req, res){
    
    // this is to set container to store the url cz of its length 
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=4bc55ef956430a9facbfc06663e9e603&units=metric"
    
    //this function gets the data of the url from someelse's server and we see the resonse on node
    //this is also application of the callback function
    
    https.get(url, function(response){
        console.log(response);
    });

    res.send("server is up and running")
});


app.listen("3000", function(){
    console.log(`App is listening on port ${3000}`);
});