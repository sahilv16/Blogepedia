const { Router } = require('express')
const { 
  getAllUsers,
  createUser,
  getUserById
 } = require('../../controllers/users')


const route = Router()

route.get('/', async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).send(users)
  } catch (e) {
    return res.status(500).send({
      error: e
    })
  }
})



route.get('/:id', async (req, res) => {
  try {
    
    const user = await getUserById(req.params.id)
    
    if(!user){
      res.status(404).send({
        error: 'No such user id'
      })
    }

    res.status(200).send(user)
  } catch (e) {
    console.log(e);
    
    return res.status(500).send({
      error: e
    })
  }
})


route.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body.name, req.body.email)
    return res.status(201).send(user)

  } catch (e) {    
    
    return res.status(500).send({
      error: e,
    })
  }
  
})


 module.exports = route