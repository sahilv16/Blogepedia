const { Router } = require('express')
const { createComment, getCommentById, getCommentByAuthorName } = require('../../controllers/comments')

const route = Router()

route.get('/:id', async (req, res) => {
 
  try {
      const comment = await getCommentById(req.params.id)
      if (!comment) {
        return res.status(404).send({ error: 'No such comment' })
      } else {
        return res.status(200).send(comment)
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        error: e,
      })
    }
})

route.get('/', async (req, res) => {
  try {
    if(req.query.author_name){
      const comment = await getCommentByAuthorName(req.query.author_name)
        if (comment) {
          return res.status(200).send(comment)
        }else{
          res.status(404).send({
            error: "No article with this name"
          })
        }
      
    }
  } catch (e) {
  console.log(e);
  
  return res.status(500).send({
    error: e
  })
  }
})

route.post('/comments', async (req, res) => {
    try {
        const comment = await createComment(
            req.body.commentor_id,
            req.body.article_id,
            req.body.title,
            req.body.message
        )
        return res.status(200).send(comment)

    } catch (e) {
        console.log(e);
        return res.status(500).send({
            error: e
        })
    }
})

module.exports = route