const request = require('request')


const forecast = (coordinate1,coordinate2,callback) =>{
    const url = 'https://api.darksky.net/forecast/7eaf4ba315786464c6763a82ffc924bc/' +encodeURIComponent(coordinate1)+','+encodeURIComponent(coordinate2)
    console.log(url)

    request({url, json: true}, (error,{body}) =>{  // Property shorthand is used here and also destructuring of objects is used here
           if(error){
                  callback(error, undefined)
           }else if(body.error){
                  callback(body.error, undefined)
           }else{
                   const high = (body.daily.data[0].temperatureHigh - 32)*(5/9)
                   const high1 = Number(high).toFixed(2)
                   const low =  (body.daily.data[0].temperatureLow -32)*(5/9)
                   const currentTemperature =(body.currently.temperature - 32)*(5/9)
                  callback(undefined, body.daily.data[0].summary + ' It is currently ' + Number(currentTemperature).toFixed(2) + ' C out. The high today is ' + high1 + ' C and with a low of ' + Number(low).toFixed(2) +' C' + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
           }
    })


}

module.exports = forecast