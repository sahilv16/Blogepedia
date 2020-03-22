const express = require('express')
const hbs = require('hbs')
const path= require('path')
const {db} = require('./db/models')
const app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', require('./routes/api'))
app.use('/', require('./routes/pages'))
app.use('/',express.static(path.join(__dirname, 'public')))


db.sync().then(() => {
    app.listen('9988', () => {
    console.log('the server had started at port http://localhost:9988');
})
}).catch(console.error)




