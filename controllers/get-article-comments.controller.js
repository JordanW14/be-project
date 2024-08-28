const { selectArticleComments } = require("../models/topics.models")

const getArticleComments = (req,res)=>{
    const {article_id} = req.params
    if(!Number(article_id)){
        return res.status(400).send({msg:"Article ID must be a number"})
    }
    selectArticleComments(article_id).then((comments) => {
    res.status(200).send(comments)
})
}

module.exports = { getArticleComments }