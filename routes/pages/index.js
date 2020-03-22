const { Router } = require('express')
const {getAllArticles,createArticle,getArticleById} = require ('../../controllers/articles')
const {getAllUsers, getUserById} = require('../../controllers/users')
const {getAllCategories} = require('../../controllers/categories')
const {createComment,getCommentByAuthorName,getCommentById} = require('../../controllers/comments')

const route = Router()

route.get('/', async (req, res) => {
    const articles = await getAllArticles()
    const users  =  await getAllUsers()
    const categories = await getAllCategories()

    res.render('home', {title: 'Home', articles, users, categories})
})

route.get('/article/:id', async (req, res) => {
     const article = await getArticleById(req.params.id)
     const user  = await getUserById(req.params.id)
     const users = await getAllUsers()
     res.render('article', {title: article.title, article, users})
})

route.post('/articles', async (req, res) => {
    try {
      const article = await createArticle(req.body.author_id, req.body.title, req.body.subtitle, req.body.body, req.body.category)
      return res.redirect('/')
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        error: e,
      })
    }
  })
route.post('/article/:id/comment', async (req, res) => {
  try {
    const comment = await createComment(
        req.body.commentor_id,
        // req.body.user_id,
        req.body.article_id,
        req.body.title,
        req.body.message
    )
    return  res.redirect('/article/:id')
  } catch (e) {
    return res.status(500).send({
      error: e
    })
  }
})


route.get('/article', (req, res) => {
    res.render('article', {title: 'Article'})
})

route.use('/users', require('./users'))
module.exports = route
