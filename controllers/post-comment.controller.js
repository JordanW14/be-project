const { insertComment } = require("../models/topics.models")

const postComment = (req, res) => {
    const { username, body } = req.body
    const { article_id } = req.params
    
    insertComment(username, body, article_id)
      .then((comment) => {
        res.status(201).send({ comment })
        })
}
module.exports = { postComment }