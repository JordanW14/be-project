const endpoints = require("../endpoints.json")
const fs = require("fs")

const getEndpoints = (req, res) => {
    res.status(200).send(endpoints)
}

module.exports = getEndpoints

