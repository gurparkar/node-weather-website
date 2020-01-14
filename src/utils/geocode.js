const request = require('request')

const geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZ3VycGFya2FyIiwiYSI6ImNrNTlkNXAyNDBvZDUzZW8xamt3ZHB5YjUifQ.WmS4Aok1P0j5xE1uJC5ukg&limit=1"

    request({url, json: true},(error, {body}) =>{ // We have used {body} instead of response.body for shortening our code
           if(error){
                  callback(error, undefined)
           }else if(body.features.length == 0){
                  callback("Unable to find the location. Try another search",undefined)
           }else{
                  callback(undefined,{
                         latitude: body.features[0].center[1],
                         longitude:body.features[0].center[0],
                         place:body.features[0].place_name
                  })
           }
})
}

module.exports = geocode