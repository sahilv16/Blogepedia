const { User, Comment, Article } = require('../db/models')

async function getCommentById(id) {
    return await Comment.findOne({
        include: [{ model: User, Article, as: 'commentor' }],
        where: { id },
    })
}

async function getCommentByAuthorName(name){
  
    const comment = await Comment.findAll({
        include: [ {model:User, as: 'commentor' }],
        where: {'$commentor.name$': name}
    })
    return comment;
}


async function createComment(commentorId,articleId, title, message) {

    const comment = await Comment.create({
        commentorId,
        articleId,
        title,
        message
    })
    
    return comment
}


module.exports = {
    getCommentById,
    getCommentByAuthorName,
    // getCommentByArticleId,
    createComment
}




