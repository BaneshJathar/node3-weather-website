const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/680e4e5714fdb97921397a4678afb5c2/' + latitude + ',' + longitude 

    request( { url : url, json : true }, (error, response) =>{
        if( error ) {
            callback( 'Unable to connect weather service',undefined)
        } else if(response.body.error) {
            callback('Unable to find location',undefined)
        } else {
            console.log(response.body.daily.data[0]);
            callback(undefined, 'It is currently '+ response.body.currently.temperature  +' degrees out. This high today is'+ response.body.daily.data[0].temperatureHigh +' With a low of '+ response.body.daily.data[0].temperatureLow +' T here is a '+  response.body.currently.precipIntensity + '% chance of rain.')
        }
    })
    
} 

module.exports = forecast;