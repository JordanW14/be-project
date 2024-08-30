const express = require("express")
const app = express()
const dotenv = require("dotenv")
const { getTopics,
  getEndpoints,
  getArticles,
  getAllArticles,
  getArticleComments,
  postComment,
  patchVote,
  deleteComment,
  getUsers,} = require("./controllers")

app.use(express.json())

app.get("/api/topics", getTopics)

app.get("/api", getEndpoints)

app.get("/api/articles/:article_id", getArticles)

app.get("/api/articles", getAllArticles)

app.get("/api/articles/:article_id/comments", getArticleComments)

app.post("/api/articles/:article_id/comments", postComment)

app.patch("/api/articles/:article_id", patchVote)

app.delete("/api/comments/:comment_id", deleteComment)

app.get("/api/users", getUsers)

app.all("/*", (req, res) => {
    res.status(404).send({msg: "Not found"})
})

app.use((err, req, res, next) => {
    if (err.code === "22P02"){
    res.status(400).send({ msg: "Bad request"})
    } else {
    next(err)
    }
})

app.use((err, req, res, next) => {
if (err.message === 'No comment to delete'){
  res.status(404).send({ msg: "No comment to delete"})
  }
})
    
app.use((err, req, res, next) => {
  res.status(500).send({msg: "Server error"})  
})

module.exports = app