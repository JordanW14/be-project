const express = require("express")
const app = express()
const dotenv = require("dotenv")
const { getTopics } = require("./controllers/get-topics.controller")
const getEndpoints = require("./controllers/get-endpoints.controller")
const getArticles = require("./controllers/get-articles.controller")

app.get("/api/topics", getTopics)

app.get("/api", getEndpoints)

app.get("/api/articles/:article_id", getArticles)

app.all("/*", (req, res) => {
    res.status(404).send({msg: "Not found"})
})

module.exports = app