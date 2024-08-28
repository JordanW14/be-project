const { selectArticles } = require("../models/topics.models")

const getArticles = (req,res)=>{
    const {article_id} = req.params
    selectArticles(article_id).then((article) => {
    res.status(200).send(article)
})
}

module.exports = { getArticles }