import request from 'supertest';

import { app } from '../../src/app';

describe('Test the root path', () => {
  test('It should response the GET method', done => {
    request(app)
      .get('/users')
      .then(response => {
        expect(response.status).toBe(200);
        done();
      });
  });
});

describe('Test the root path - Error', () => {
  test('It should response the GET method', done => {
    request(app)
      .get('/users/error')
      .then(response => {
        expect(response.status).toBe(500);
        done();
      });
  });
});
