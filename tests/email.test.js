import request from 'supertest';
import app from '../src/app.js';
import EmailService from '../src/services/email.service.js';
import { jest } from '@jest/globals'; //  this is required for ESM

EmailService.sendEmail = jest.fn().mockResolvedValue({ messageId: 'mocked-id' });

describe('POST /api/email', () => {
  it('should return 400 for missing fields', async () => {
    const res = await request(app).post('/api/email').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Missing required fields');
  });

it('should return 200 for valid fields', async () => {
  const res = await request(app).post('/api/email').send({
    to: 'test@example.com',
    subject: 'Test Subject',
    body: 'Test message',
    idempotencyKey: 'test-123'
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Email job added to queue'); //  updated
}, 10000);

});
