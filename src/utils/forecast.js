const postmanRequest = require('postman-request')







const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7fa6d31ed2960c194a978b2bfe61c7e2&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longtitude) + '&units=m'
    
    postmanRequest({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather app!', undefined, undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined, undefined)
        } else {
            callback(undefined,  'Weather description: ' + body.current.weather_descriptions[0] + ', Weather in celcius: ' + body.current.temperature + ', feels like: ' + body.current.feelslike)
        }
    })
}


module.exports = {
    forecast
}