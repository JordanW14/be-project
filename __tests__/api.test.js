const db = require("../db/connection")
const request = require("supertest")
const app = require ("../app")
const data = require("../db/data/test-data/index")
const seed = require("../db/seeds/seed")
const endpoints = require("../endpoints.json")

beforeEach(()=> seed(data))
afterAll(()=> db.end())


describe("API tests", ()=>{
    describe("GET api/topics", ()=>{
        test("responds with 200 status code", () => {
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
        test("responds with 404 status code if path not found", () => {
            return request(app)
            .get("/api/notHere")
            .expect(404)
            .then((response) => {
            expect(response.body).toEqual({msg: "Not found"})
        }) 
        })
    })
    describe("GET api", ()=>{
        test("responds with a 200 status code and gives list of endpoints", () => {
            return request(app)
            .get("/api")
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(endpoints)
        })
    })
    describe("GET /api/articles/:article_id", () => {
        test("responds with 200 status code and gives requested article by ID", () => {
            
            return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty("article_id", 1)
                expect(response.body).toHaveProperty("title", "Living in the shadow of a great man")
                expect(response.body).toHaveProperty("votes", 100)
            })
        })
        test("responds with 400 status code when given invalid article_id endpoint", () => {
            return request(app)
            .get("/api/articles/banana")
            .expect(400)
            .then((response) => {
                expect({msg:"Article ID must be a number"})
            })
        })
    }

    )
})
})
