import { request } from "express";
import { expect } from "chai";
const app = require('../app');


describe('GET /api/v1/users', () => {
    it('should return a list of users', (done) => {
        request(app)
            .get('/api/v1/users')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });
});

describe('POST /api/v1/users', () => {
    it('should create a new user', (done) => {
        const newUser = { name: 'Jane Doe', email: 'jane.doe@example.com' };
        request(app)
            .post('/api/v1/users')
            .send(newUser)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.include(newUser);
                done();
            });
    });
});
