//jshint esversion:6

const express = require("express");
//this is to require https, we dnt need to install thru node because it one of nodes native packages
const https = require("https")

// this is the body that allows to look thru the request and fetch the data based on name of the input in the html
const  bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true})); // this helps body parser grab inputs from the user

// this is the initial function to get the infor from someelse's server onto our servers
app.get("/", function(req, res){
    
    res.sendFile(__dirname + "/index.html");
});

// this is to post the infor that has been requested

app.post("/", function(req, res){

    // set these variables so we can scale with diff other locations

    const query = "req.body.cityName"; //(req.body.cityName) used to log the city put by the user
    const apiKey = "4bc55ef956430a9facbfc06663e9e603";
    const unit = "imperial";
    // this is to set container to store the url cz of its length
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    
    //this function gets the data of the url from someoneelse's(external) server and we see the resonse on node
    https.get(url, function(response){
        console.log(response.statusCode);

        //this is getting the data inform of a JSON
        response.on("data",(data)=>{
        
            //using JSON to print out some of the weather details and also acces the specific data needed from the object
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const iconType = weatherData.weather[0].icon; // used to acces the icon of the weather type

            const imageURL = "http://openweathermap.org/img/wn/" + iconType + "@2x.png" // figure out why this dont work

            // use (res.write) to write  and send multiple data to the browser
            res.write(`<p>The weather is currently ${weatherDescription}</p>`);
            res.write(`<h1>The Temperature in ${query} is ${temperature} degrees celcius</h1>`);
            res.write(`<img src="${imageURL}">`)
            res.send();
        });
    });
});


app.listen("4000", function(){
    console.log(`App is listening on port ${3000}`);
});