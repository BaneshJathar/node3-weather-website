// const path =require('path');
// const express = require('express');

//  const app = express()
//  const publicDirectoryPath =  path.join(__dirname,'../public');

//  app.set('view engine', 'hbs')
// app.use(express.static(publicDirectoryPath))

// app.get('', (req,res) => {
//     res.render('index')
// })

// app.get('/weather', (req,res) => {
//        res.send("Weather page");
//    })

// app.listen(3000, () => {
//        console.log('Server is up on port  3000.');
//    });











//*************************       Sir Code  *********** */



const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views');
const partialPaths = path.join(__dirname,'../templates/partials')

// Setup handlebars engine  and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPaths)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
  
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Banesh'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Banesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        name: 'Expert Team'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
          error: 'Please provide an address'  
        })
    }
   
    geocode(req.query.address, (error, {latitude, longitude, location} = { }) => {
            if(error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) =>{
                if(error){
                   return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })  
    }) 


    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     Address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
             error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=> {
    res.render('404', {
        title: '404',
        name: 'Banesh',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res)=> {  
 res.render('404', {
     title: '404',
     name: 'Banesh',
     errorMessage: 'Page not found'
 })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})