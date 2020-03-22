const { Router } = require('express')

const route = Router()

route.use('/articles', require('./articles'))
route.use('/comments', require('./comments'))
route.use('/user', require('./users'))
route.use('/categories', require('./categories'))

module.exports = route