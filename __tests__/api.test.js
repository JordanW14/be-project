const db = require("../db/connection")
const request = require("supertest")
const app = require ("../app")
const data = require("../db/data/test-data/index")
const seed = require("../db/seeds/seed")
const endpoints = require("../endpoints.json")
const { string } = require("pg-format")

beforeEach(()=> seed(data))
afterAll(()=> db.end())


describe("API tests", ()=>{
    describe("GET api/topics", ()=>{
        test("200: Responds with list of topics", () => {
            return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({body}) => {
                    body.rows.forEach((topic) => {
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
                expect({msg:"Article ID must be a number"})
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
        test("200: Check there isn't a body property", ()=>{
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
    describe("", () => {}) 
})