const express =require("express");
const https =require("https")
const bodyParser = require("body-parser")
const app =express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
   res.sendFile(__dirname + "/index.html");
})
app.post("/",function(req,res){
    console.log("Post request received");
     const query = req.body.cityname;
   const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query + "&units=metric&appid=0f067b211232f93b47ce9b75d1ce383a";
   https.get(url,function(response){
       response.on("data",function(data){
           const weatherdata =JSON.parse(data);
          // console.log(weatherdata);
           const temp =weatherdata.main.temp;
           const weatherdescription = weatherdata.weather[0].description;
           const icon = weatherdata.weather[0].icon;
           const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
           res.write(`<h1 style="color:blue">The weather of ${query} is currently ${weatherdescription}</h1>`);
           res.write(`<h1 style="color:red">The temperature in ${query} is  ${temp} degree celsius.</h1>`);
           res.write("<img src="+imageURL+">");
           res.send();
       })
       console.log(response.statusCode);
   })
   //res.send("Server is running up and running");
    
})



app.listen(3000,function(){
    console.log("server is running on port 3000");
})