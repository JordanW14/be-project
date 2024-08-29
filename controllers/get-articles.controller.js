const { selectArticles } = require("../models/topics.models")

const getArticles = (req, res, next)=>{
    const {article_id} = req.params
    /*if(!Number(article_id)){
        return res.status(400).send({msg:"Article ID must be a number"})
    }*/
    selectArticles(article_id).then((articles) => {
    res.status(200).send(articles)
    })
    .catch((err)=>{
        next(err)
    })
}

module.exports = { getArticles }