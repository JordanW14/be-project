const getEndpoints = require("./get-endpoints.controller.js")
const getArticle = require("./get-article.controller.js")
const getAllArticles = require("./get-all-articles.controller.js")
const getArticleComments = require("./get-article-comments.controller.js")
const postComment = require("./post-comment.controller.js")
const patchVote = require("./patch-vote.controller.js")
const deleteComment = require("./delete-comment.controller.js")
const getTopics = require("./get-topics.controller.js")
const getUsers = require("./get-users.controller.js")

module.exports = {
    getTopics,
    getEndpoints,
    getArticle,
    getAllArticles,
    getArticleComments,
    postComment,
    patchVote,
    deleteComment,
    getUsers,
}