import { Application } from 'express';
import request from 'supertest';
import createServer from '../src/server';

let server: Application;

beforeAll(async () => {
  server = await createServer();
});

const mockResult = {
  message: 'My Rule-Validation API',
  status: 'success',
  data: {
    name: 'Ikechukwu Orji',
    github: '@jojitoon',
    email: 'jojitoon@gmail.com',
    mobile: '09069787848',
    twitter: '@jojitoon1',
  },
};

describe('api entry point', () => {
  it('/ returns proper values', async () => {
    const result = await request(server).get('/');
    expect(result.body).toEqual(mockResult);
  });
  it('* returns proper error', async () => {
    const result = await request(server).get('/wrong');
    expect(result.body).toEqual({
      message: 'route not found',
      status: 'error',
      data: null,
    });
  });
});
