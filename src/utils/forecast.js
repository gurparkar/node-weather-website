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
                  callback(undefined, body.daily.data[0].summary)
           }
    })


}

module.exports = forecast