const { db, Article, User, Category } = require('../db/models')

async function getAllArticles() {
  return await Article.findAll({
    include: [{ model: User, as: 'author' }, { model: Category }],
  })
}

async function getArticleById(id) {
    return await Article.findOne({
      include: [{ model: User, as: 'author' }],
      where: { id },
    })
  }


async function getArticleByAuthorEmail(email) {
    const article = await Article.findOne({
      include: [{ model: User, as: 'author' }],
      where: { '$author.email$': email },
    })
  
    return article
  }

  async function createArticle(authorId, title, subtitle, body, categoryIds) {
    let article;
    await db.transaction(async (t) => {
  
      article = await Article.create({
        authorId,
        title,
        subtitle,
        body,
      }, {transaction: t})
  
      if (article) {
        await article.setCategories(categoryIds, {transaction: t})
      }
  
    })
  
    return article
  }


module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    getArticleByAuthorEmail
}