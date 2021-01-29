import { Application } from 'express';
import request from 'supertest';
import createServer from '../src/server';

let server: Application;

beforeAll(async () => {
  server = await createServer();
});

describe('rule validation route', () => {
  it('should return error message when no rule is passed', async () => {
    const mockResult = {
      message: 'rule is required.',
      status: 'error',
      data: null,
    };
    const result = await request(server).post('/validate-rule');
    expect(result.body).toEqual(mockResult);
  });

  it('should return error message when no data is passed', async () => {
    const mockResult = {
      message: 'data is required.',
      status: 'error',
      data: null,
    };
    const result = await request(server)
      .post('/validate-rule')
      .send({
        rule: { field: '', condition: 'eq', condition_value: '' },
      });
    expect(result.body).toEqual(mockResult);
  });

  it('should return right message when no data is passed', async () => {
    const mockResponse = {
      message: 'field missions.count successfully validated.',
      status: 'success',
      data: {
        validation: {
          error: false,
          field: 'missions.count',
          field_value: 45,
          condition: 'gte',
          condition_value: 30,
        },
      },
    };
    const result = await request(server)
      .post('/validate-rule')
      .send({
        rule: {
          field: 'missions.count',
          condition: 'gte',
          condition_value: 30,
        },
        data: {
          name: 'James Holden',
          crew: 'Rocinante',
          age: 34,
          position: 'Captain',
          missions: {
            count: 45,
            successful: 44,
            failed: 1,
          },
        },
      });
    expect(result.body).toEqual(mockResponse);
  });

  it('should return right message when no data is passed', async () => {
    const mockResponse = {
      message: 'field missions.count successfully validated.',
      status: 'success',
      data: {
        validation: {
          error: false,
          field: 'missions.count',
          field_value: 45,
          condition: 'gt',
          condition_value: 30,
        },
      },
    };
    const result = await request(server)
      .post('/validate-rule')
      .send({
        rule: {
          field: 'missions.count',
          condition: 'gt',
          condition_value: 30,
        },
        data: {
          name: 'James Holden',
          crew: 'Rocinante',
          age: 34,
          position: 'Captain',
          missions: {
            count: 45,
            successful: 44,
            failed: 1,
          },
        },
      });
    expect(result.body).toEqual(mockResponse);
  });

  it('should return right message when no data is passed', async () => {
    const mockResponse = {
      message: 'field missions.count successfully validated.',
      status: 'success',
      data: {
        validation: {
          error: false,
          field: 'missions.count',
          field_value: 45,
          condition: 'neq',
          condition_value: 30,
        },
      },
    };
    const result = await request(server)
      .post('/validate-rule')
      .send({
        rule: {
          field: 'missions.count',
          condition: 'neq',
          condition_value: 30,
        },
        data: {
          name: 'James Holden',
          crew: 'Rocinante',
          age: 34,
          position: 'Captain',
          missions: {
            count: 45,
            successful: 44,
            failed: 1,
          },
        },
      });
    expect(result.body).toEqual(mockResponse);
  });

  it('should return right message when no data is passed', async () => {
    const mockResponse = {
      message: 'field 0 failed validation.',
      status: 'error',
      data: {
        validation: {
          error: true,
          field: '0',
          field_value: 'd',
          condition: 'eq',
          condition_value: 'a',
        },
      },
    };
    const result = await request(server)
      .post('/validate-rule')
      .send({
        rule: {
          field: '0',
          condition: 'eq',
          condition_value: 'a',
        },
        data: 'damien-marley',
      });
    expect(result.body).toEqual(mockResponse);
  });

  it('should return right message when no data is passed', async () => {
    const mockResponse = {
      message: 'field 5 is missing from data.',
      status: 'error',
      data: null,
    };
    const result = await request(server)
      .post('/validate-rule')
      .send({
        rule: {
          field: '5',
          condition: 'contains',
          condition_value: 'rocinante',
        },
        data: ['The Nauvoo', 'The Razorback', 'The Roci', 'Tycho'],
      });
    expect(result.body).toEqual(mockResponse);
  });

  it('should return right message when no data is passed', async () => {
    const mockResponse = {
      message: 'field 0 successfully validated.',
      status: 'success',
      data: {
        validation: {
          error: false,
          field: '0',
          field_value: 'The Nauvoo',
          condition: 'contains',
          condition_value: 'a',
        },
      },
    };
    const result = await request(server)
      .post('/validate-rule')
      .send({
        rule: {
          field: '0',
          condition: 'contains',
          condition_value: 'a',
        },
        data: ['The Nauvoo', 'The Razorback', 'The Roci', 'Tycho'],
      });
    expect(result.body).toEqual(mockResponse);
  });
});
