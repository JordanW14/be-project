const { selectArticle } = require("../models/models")

const getArticle = (req, res, next)=>{
    const {article_id} = req.params
    
    selectArticle(article_id)
    .then((article) => {
    res.status(200).send(article)
    })
    .catch((err)=>{
        next(err)
    })
}

module.exports = getArticle