const express = require("express")
const app = express()
const dotenv = require("dotenv")
const { getTopics } = require("./controllers/get-topics.controller")
const getEndpoints = require("./controllers/get-endpoints.controller")
const { getArticles } = require("./controllers/get-articles.controller")
const { getAllArticles } = require("./controllers/get-all-articles.controller")
const { getArticleComments } = require("./controllers/get-article-comments.controller")
const { postComment } = require("./controllers/post-comment.controller")

app.use(express.json())

app.get("/api/topics", getTopics)

app.get("/api", getEndpoints)

app.get("/api/articles/:article_id", getArticles)

app.get("/api/articles", getAllArticles)

app.get("/api/articles/:article_id/comments", getArticleComments)

app.post("/api/articles/:article_id/comments", postComment)

app.all("/*", (req, res) => {
    res.status(404).send({msg: "Not found"})
})

app.use((err, req, res, next) => {
    if (err.code === "22P02"){
    res.status(400).send({ msg: "Article ID must be a number"})
    }
  });

module.exports = app