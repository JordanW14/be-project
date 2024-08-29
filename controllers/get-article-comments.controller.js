const { selectArticleComments } = require("../models/topics.models")

const getArticleComments = (req,res, next)=>{
    const {article_id} = req.params
    selectArticleComments(article_id).then((comments) => {
    res.status(200).send(comments)
    })
    .catch((err)=>{
        next(err)
    })
}

module.exports = { getArticleComments }