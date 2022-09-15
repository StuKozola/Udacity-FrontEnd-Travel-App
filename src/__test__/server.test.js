// requirements
const request = require('supertest');
const app = require('../server/index.js');

// test the server
describe('Test the root path', () => {
    test('It should respond to the GET method', () => {
        return request(app).get('/').then(response => {
            expect(response.statusCode).toBe(200);
        });
    });
})

// test /all endpoint
describe('Test the /all path', () => {
    test('It should respond to the GET method', () => {
        return request(app).get('/all').then(response => {
            expect(response.statusCode).toBe(200);
        });
    });
})

// test /test endpoint
describe('Test the /test path', () => {
    test('It should respond to the GET method', () => {
        return request(app).get('/test').then(response => {
            expect(response.statusCode).toBe(200);
        });
    });
})

// test /trip endpoint
describe('Test the /trip path', () => {
    test('It should respond to the POST method', () => {
        return request(app).post('/trip').then(response => {
            expect(response.statusCode).toBe(200);
        });
    });
})
