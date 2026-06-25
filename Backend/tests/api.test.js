import request from 'supertest';
import app from '../index.js';

describe('HRMS API Tests', () => {

  test('Access /me without login returns 401', async () => {
    const res = await request(app).get('/me');
    expect(res.statusCode).toBe(401);
  });

  test('Access employee data without login is blocked', async () => {
    const res = await request(app).get('/data_pegawai');
    expect([401, 403, 302]).toContain(res.statusCode);
  });

  test('Logout without session returns 200 or 400', async () => {
    const res = await request(app).delete('/logout');
    expect([200, 400]).toContain(res.statusCode);
  });

  test('Unknown route returns 404', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.statusCode).toBe(404);
  });

});