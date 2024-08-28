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