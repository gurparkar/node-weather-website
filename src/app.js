const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const port = process.env.PORT || 3000
const pathname = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
console.log(pathname)
app.set('view engine', 'hbs');
app.set("views",viewsPath )
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(pathname)))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Gurparkar Singh'
    } )
})
app.get("/help", (req, res) =>{
    res.render('help',{
        Helptext: "This is the help page",
        title: "Help",
        name: "Gurparkar"
    })
})

app.get("/about", (req, res) =>{
    res.render('about', {
        title: "About",
        name: "Gurparkar Singh"
    })
})

app.get("/weather", (req, res) =>{
    if(!req.query.address){
        return res.send({
            error : "You must provide an Address"
        })  
    }
    
    else {
        console.log(req.query.address)
        geocode(req.query.address, (error,{latitude, longitude, place}={}) => { // response(object) has a three properties inside it so we will use destructuring here
               if (error){
                      return res.send(error)
               }
               forecast(latitude,longitude,(error, forecastResponse) =>{
                      if(error){
                             return res.send(error)
                      }
                      res.send({
                          weather: forecastResponse,
                          place,
                          address: req.query.address

                      })
               })
        })
     }

})

app.get("/products", (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })

    }
    console.log(req.query) // We can send the response only one 
                           // thats why we used return in if statement
    res.send({
        products: []
    })

})

app.listen(port,() =>{
    console.log("Server started at 3000 port number")
})