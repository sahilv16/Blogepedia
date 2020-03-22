const { Router } = require('express')
const{getAllArticles, getArticleByAuthorEmail, createArticle, getArticleById } = require('../../controllers/articles')



const route = Router()


route.get('/:id', async (req, res) => {
  try {
    const article = await getArticleById(req.params.id)
    if (!article) {
      return res.status(404).send({ error: 'No such article' })
    } else {
      return res.status(200).send(article)
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
  if(req.query.author_email){
        const article =  await getArticleByAuthorEmail(req.query.author_email) 
          if (article) { return res.status(200).send(article) 
        } else{
          res.status(404).send({
            error: "No article with this email id"
          })
        }
    }else {
      const articles = await getAllArticles()
      return res.status(200).send(articles)
    }
} catch (e) {
  console.log(e);
  
  return res.status(500).send({
    error: e 
  })
}
})

   
route.post('/', async (req, res) => {
  try {
    const article = await createArticle(req.body.author_id, req.body.title, req.body.subtitle, req.body.body)
    return res.status(201).send(article)
  } catch (e) {
    console.log(e);

    return res.status(500).send({
      error: e,
    })
  }
})

 module.exports = route