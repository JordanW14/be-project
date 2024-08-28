const { selectArticles } = require("../models/topics.models")

const getArticles = (req,res)=>{
    const {article_id} = req.params
    if(!Number(article_id)){
        return res.status(400).send({msg:"Article ID must be a number"})
    }
    selectArticles(article_id).then((article) => {
    res.status(200).send(article)
})
}

module.exports = { getArticles }