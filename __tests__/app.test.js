'use strict';

const { server } = require('../src/app');
const supergoose = require('./supergoose.js');
const mockRequest = supergoose(server);

describe('server', () => {

  it('get on /categories', () => {
    return mockRequest
    .get('/api/v1/categories')
      .then(results => {
        expect(results.status).toBe(200);
      })
      .catch(console.log(error));
  });

  it('post on catagory', () => {
    return mockRequest
      .post('/api/v1/categories')
      .send({ name: 'Test', description: 'test stuff' })
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.name).toBe('Test');
        expect(results.body.description).toBe('test stuff');
      })
      .catch(console.error);
  });

  it('put on category', () => {

    return mockRequest
      .post('/api/v1/categories')
      .send({ name: 'Test', description: 'test stuff' })
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.name).toBe('Test');
        expect(results.body.description).toBe('test stuff');
        return mockRequest.put(`/api/v1/categories/${results.body._id}`)
          .send({ name: 'Updated Test', description: 'test stuff' });
      })
      .then( result => {
        expect(result.status).toBe(200);
        expect(result.body.name).toBe('Updated Test');
        expect(result.body.description).toBe('test stuff');
      })
      .catch(console.error);

  });

  it('delete on category', () => {
    return mockRequest
      .post('/api/v1/categories')
      .send({ name: 'Test', description: 'test stuff' })
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.name).toBe('Test');
        expect(results.body.description).toBe('test stuff');
        return mockRequest.delete(`/api/v1/categories/${results.body._id}`);
      })
      .then( results => {
        expect(results.status).toBe(200);
        expect(results.body.name).toBe('Test');
        expect(results.body.description).toBe('test stuff');
        return mockRequest.get('/api/v1/categories');
      })
      .then(results => {
        expect(results.status).toBe(200);
      })
      .catch(console.error);
  });
});
