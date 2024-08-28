const { selectAllArticles } = require("../models/topics.models")

const getAllArticles = (req, res) => {
    selectAllArticles().then((articles) => {
    res.status(200).send(articles)
})
}

module.exports = { getAllArticles }