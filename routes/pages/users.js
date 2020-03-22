const { Router } = require('express')
const {getAllUsers,createUser} = require('../../controllers/users')
const route = Router()

route.get('/', async (req, res) => {
  const users = await getAllUsers()
  res.render('users', {
    title: 'Users',
    users
  })
})


route.post('/', async (req, res) => {
    try {
      const user = await createUser(req.body.name, req.body.email)
      return res.redirect('/users')
    } catch (e) {
      return res.status(500).send({
        error: e,
      })
    }
  })
  
module.exports = route