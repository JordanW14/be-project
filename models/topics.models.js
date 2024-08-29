const db = require("../db/connection")

exports.selectTopics = () => {
    return db.query("SELECT * FROM topics")
    .then((data) => {
        return data
    })
}

exports.selectArticles = (article_id) => {
    return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((data) => {
        return data.rows[0]
    })
}

exports.selectAllArticles = () => {
    return db.query("SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC")
    .then((data) => {
        return data.rows
    })
}

exports.selectArticleComments = (article_id) => {
    return db.query("SELECT comment_id, votes, created_at, author, body, article_id FROM comments WHERE article_id = $1 ORDER BY created_at DESC", [article_id])
    .then((data) => {
        return data.rows
    })
}

exports.insertComment = (username, body, article_id) => {
    return db.query("INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *", [body, username, article_id])
    .then((data) => {
        return data.rows[0]
    }) 
}