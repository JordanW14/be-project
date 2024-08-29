const { selectArticles } = require("../models/topics.models")

const getArticles = (req, res, next)=>{
    const {article_id} = req.params
    
    selectArticles(article_id).then((articles) => {
    res.status(200).send(articles)
    })
    .catch((err)=>{
        next(err)
    })
}

module.exports = { getArticles }