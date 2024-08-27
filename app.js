const express = require("express")
const app = express()
const dotenv = require("dotenv")
const { getTopics } = require("./controllers/get-topics.controller")

app.get("/api/topics", getTopics)

app.all("/*", (req, res) => {
    res.status(404).send({msg: "Not found"})
})

module.exports = app