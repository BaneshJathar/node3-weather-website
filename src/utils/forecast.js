const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/680e4e5714fdb97921397a4678afb5c2/' + latitude + ',' + longitude 

    request( { url : url, json : true }, (error, response) =>{
        if( error ) {
            callback( 'Unable to connect weather service',undefined)
        } else if(response.body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined, 'It is currently '+ response.body.currently.temperature  +' degrees out. There is a '+  response.body.currently.precipIntensity + '% chance of rain.')
        }
    })
    
} 

module.exports = forecast;