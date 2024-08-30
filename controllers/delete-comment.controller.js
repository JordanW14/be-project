const { deleteCommentById } = require("../models/models")

const deleteComment = (req, res, next) => {
    const {comment_id} = req.params
    deleteCommentById(comment_id)
    .then((result) => {
        res.status(204).send(result)
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = deleteComment