const { selectAllArticles } = require("../models/topics.models")

const getAllArticles = (req, res, next) => {
    selectAllArticles()
    .then((articles) => {
    res.status(200).send(articles)
    })
    .catch((err)=>{
        next(err)
    })
}

module.exports = { getAllArticles }