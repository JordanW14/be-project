const { selectTopics } = require("../models/models")

const getTopics = (req, res, next) => {
    selectTopics()
        .then((topics) => {
        res.status(200).send(topics)
        })
        .catch((err) => {
            next(err)
        })
}
module.exports = getTopics