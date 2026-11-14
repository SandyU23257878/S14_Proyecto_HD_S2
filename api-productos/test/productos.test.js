import {describe, test, expect} from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('API Productos', () => {
    test('GET /Productos', async () => {
        const response = await request(app).get('/productos');
        expect(response.statusCode).toBe(200);
    });

    test('POST /Productos devuelve array', async () => {
        const response = await request(app).get('/productos');
        expect(Array.isArray(response.body)).toBe(true);
    });
});