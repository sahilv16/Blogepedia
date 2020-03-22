const sequelize= require('sequelize')

const db = new sequelize({
    dialect: 'mysql',
    database: 'blogdb',
    username: 'bloguser',
    password: 'blogs'
})

const User =  db.define('user', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        unique: true
    }
})

const Article = db.define('article', {
    title: {
        type: sequelize.STRING(100),
        allowNull: false,
    },
    subtitle: sequelize.STRING(150),
    body: {
        type: sequelize.TEXT,
        allowNull: false 
    }
})

const Comment = db.define('comment', {
    title: {
        type: sequelize.STRING(50),
        allowNull: false,
    },
    message: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

const Category = db.define('category', {
    name: {
        type: sequelize.STRING(50),
        allowNull:false,
        unique: true,

    }
})


Article.belongsTo(User, {as: 'author'})
User.hasMany(Article, {as: 'author'})

Comment.belongsTo(User, {as: 'commentor'})
User.hasMany(Comment, {as: 'commentor'})

Comment.belongsTo(Article)
Article.hasMany(Comment)

Article.belongsToMany(Category, {through: 'article_category'})
Category.belongsToMany(Article, {through: 'article_category'})

module.exports = {
    db,
    Article,
    User,
    Comment,
    Category
}