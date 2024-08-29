const { updateVote } = require("../models/topics.models")

const patchVote = (req, res, next) => {
    const { article_id } = req.params
    const { inc_votes } = req.body

    updateVote(article_id, inc_votes)
    .then(result => {
        res.status(200).send(result)
    })
    .catch((err)=>{
        next(err)
    })
}

module.exports = { patchVote }