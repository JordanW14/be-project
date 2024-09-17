const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require ('cors')
const { getTopics,
  getEndpoints,
  getAllArticles,
  getArticleComments,
  postComment,
  patchVote,
  deleteComment,
  getUsers,
  //getSpecificArticles,
} = require("./controllers")

app.use(express.json())
app.use(cors())

app.get("/api/articles", getAllArticles)

app.get("/api/topics", getTopics)

app.get("/api", getEndpoints)

//app.get("/api/articles/:article_id", getSpecificArticles)

app.get("/api/articles/:article_id/comments", getArticleComments)

app.post("/api/articles/:article_id/comments", postComment)

app.patch("/api/articles/:article_id", patchVote)

app.delete("/api/comments/:comment_id", deleteComment)

app.get("/api/users", getUsers)


app.all("/*", (req, res) => {
    res.status(404).send({msg: "Not found"})
})

app.use((err, req, res, next) => {
  (err.message === 'Invalid sort' || err.message === 'Invalid order')
  return res.status(400).send({ msg: err.message });
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
    res.status(400).send({ msg: "No comment to delete"})
  }
})
    
app.use((err, req, res, next) => {
  res.status(500).send({msg: "Server error"})  
})

module.exports = app