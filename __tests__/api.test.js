const db = require("../db/connection")
const request = require("supertest")
const app = require ("../app")
const data = require("../db/data/test-data/index")
const seed = require("../db/seeds/seed")
const endpoints = require("../endpoints.json")

beforeEach(()=> seed(data))
afterAll(()=> db.end())


describe("API tests", () => {
    describe("GET /api/topics", () => {
        test("200: Responds with list of topics", () => {
            return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({body}) => {
                expect(Array.isArray(body)).toBe(true)
                body.forEach((topic) => {
                    expect(topic).toHaveProperty("slug")
                    expect(topic).toHaveProperty("description")
                })
            })
        })
        test("404: Responds with error if path not found", () => {
            return request(app)
            .get("/api/notHere")
            .expect(404)
            .then((response) => {
            expect(response.body).toEqual({msg: "Not found"})
            }) 
        })
    })
    describe("GET /api", ()=>{
        test("200: Responds with a list of possible endpoints", () => {
            return request(app)
            .get("/api")
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(endpoints)
            })
        })
        test("404: Responds with error if path not found", () => {
            return request(app)
            .get("/abi")
            .expect(404)
            .then((response) => {
            expect(response.body).toEqual({msg: "Not found"})
            }) 
        })
    })
    describe("GET /api/articles/:article_id", () => {
        test("200: Responds with requested article by ID", () => {
            
            return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty("article_id", 1)
                expect(response.body).toHaveProperty("title", "Living in the shadow of a great man")
                expect(response.body).toHaveProperty("votes", 100)
            })
        })
        test("400: Responds with error when given invalid article_id endpoint", () => {
            return request(app)
            .get("/api/articles/banana")
            .expect(400)
            .then((response) => {
                expect({msg:"Bad request"})
            })
        })
    })
    describe("GET /api/articles", () => {
        test("200: Responds with an articles array of article objects containing info and comment count in descending order", ()=>{
            return request(app)
            .get("/api/articles")
            .expect(200)
            .then((response) => {
                expect(Array.isArray(response.body))
                response.body.forEach((article) => {
                expect(article).toHaveProperty("author", expect.any(String))
                expect(article).toHaveProperty("comment_count", expect.any(Number))
                })
            })
        })
        test("200: Check there isn't a body property", () => {
            return request(app)
            .get("/api/articles")
            .expect(200)
            .then((response) => {
                response.body.forEach((article) => {
                expect(article).not.toHaveProperty("body")
                })
            })
        })
    })
    describe("GET /api/articles/:article_id/comments", () => {
        test("200: Responds with an array of comments for the given article ID", () => {
            return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then((response) => {
                response.body.forEach((comment) => {
                    expect(comment).toHaveProperty('comment_id', expect.any(Number))
                    expect(comment).toHaveProperty('votes', expect.any(Number))
                    expect(comment).toHaveProperty('created_at', expect.any(String))
                    expect(comment).toHaveProperty('author', expect.any(String))
                    expect(comment).toHaveProperty('body', expect.any(String))
                    expect(comment).toHaveProperty('article_id', expect.any(Number))
                });
            })
        })
        test("400: Responds with error when given invalid article_id endpoint", () => {
            return request(app)
            .get("/api/articles/banana/comments")
            .expect(400)
            .then((response) => {
                expect({msg:"Bad request"})
            })
        })
    })
    describe("POST /api/articles/:article_id/comments", () => {
        test("201: Post a comment to article", () => {
            return request(app)
                .post("/api/articles/1/comments")
                .send({ username: 'rogersop', body: 'Test comment' })
                .expect(201)
                .then((response) => {
                    expect(response.body.comment).toHaveProperty('body', 'Test comment')
                    expect(response.body.comment).toHaveProperty('author', 'rogersop')
                    expect(response.body.comment).toHaveProperty('article_id', 1)
                })
        })
    })
    describe("PATCH /api/articles/:article_id", () => {
        test("200: Updates an article", () => {
            return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then((response) => {
                expect(response.body.votes).toBe(101)
            })
        })
    })
    describe("DELETE /api/comments/:comment_id", () => {
        test("204: Deletes a comment by the comment ID", () => {
            return request(app)
            .delete("/api/comments/1")
            .expect(204)
        })
        test("404: Check the comment was successfully deleted", () => {
            return request(app)
            .get(`/api/comments/1`)
            .expect(404)
        })
        test("404: Returns correct error if there was no comment to delete", () => {
            return request(app)
            .delete("/api/comments/150")
            .expect(404)
            .then(response => {
                expect({ msg: "No comment to delete"})
            })
         })
    })
})