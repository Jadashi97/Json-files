//jshint esversion:6

const express = require("express");

//this is to require https, we dnt need to install thru node because it one of nodes native packages
const https = require("https")

const app = express();


// this is the initial function to get the infor from someelse's server onto our servers
app.get("/", function(req, res){
    
    // this is to set container to store the url cz of its length 
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=4bc55ef956430a9facbfc06663e9e603&units=imperial"
    
    //this function gets the data of the url from someoneelse's(external) server and we see the resonse on node
    
    //this function fetches data 
    https.get(url, function(response){
        console.log(response);

    //this is getting the data inform of a JSON
    response.on("data",(data)=>{
        const weatherData = JSON.parse(data)
        console.log(weatherData);
        
        //using JSON to print out some of the weather details and also acces the specific data needed from the object
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon // used to acces the icon of the weather type 
        const imageUrl= "http://openweathermap.org/img/wn/" + icon + " @2x.png"



        // use (res.write) to write  and sent multiple data 
        res.write(`<p>The weather is currently ${weatherDescription}</p>`)
        res.write(`<h1>The Temperature in Minneapolis is ${temp} degrees celcius</h1>`)
        res.write("<img scr = " + imageUrl  + ">")
        res.send();

        // this is just me goofing around to use the stringify method in  the object to see how it all plays out
        // const myInfor= {
        //     name: "lokose",
        //     food: "ramen",
        //     lover: "ToniRose"
        // };
        // console.log(JSON.stringify(myInfor));
    })
    });
});


app.listen("3000", function(){
    console.log(`App is listening on port ${3000}`);
});