const postmanRequest = require('postman-request')



const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxla2FsZXhhbnlhbiIsImEiOiJja29zaTg1dzYwMXJrMnVsa2Vxd2dlaGV0In0.wB9Wmcgu0QVhXIfYVBbFVg&limit=1'
    
    postmanRequest({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })
}

module.exports = {
    geocode
}