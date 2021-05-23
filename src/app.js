const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express configS
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials' )

//Setup handlebars and views location
app.set('view engine','hbs')
app.set('views', viewsPath )
hbs.registerPartials(partialPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Alek Alexanyan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Alek Alexanyan',
        name: 'Alek Alexanyan'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Alek Alexnayan'
    })
})


app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode.geocode(req.query.address, (error,{latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({error: error})
        } 
        
        forecast.forecast(latitude,longtitude, (error,forecastData) => {
            if (error) {
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
         return res.send({
            error: 'You must provide a search term'
        })
    } 
        res.send({
        product: []
    })   
})



app.get('/help/*', (req, res) => {
    res.render('error_404_help', {
        title: '404',
        name: 'Alek Alexnayan',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req,res) => {
    res.render('error_404', {
        title: '404',
        name: 'Alek Alexnayan',
        errorMessage: 'Page not found.'
    })
})




app.listen(3000, () =>{
    console.log('Server is up on port 3000.');
})


