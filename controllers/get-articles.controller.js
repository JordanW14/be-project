const selectArticles = require("../models/topics.models")

const getArticles = (req,res)=>{
    selectArticles().then((articles) => {
    res.status(200).send(articles)
})
}

module.exports = getArticles