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

    test('PUT /Productos/:id actualiza un producto existente', async () => {
        const nuevoProducto = { nombre: 'Laptop 4', precio: 15.99 };
        const postResponse = await request(app).post('/productos').send(nuevoProducto);
        const productoCreado = postResponse.body;

        const productoActualizado = { nombre: 'Laptop 4 Actualizada', precio: 17.99 };
        const putResponse = await request(app).put(`/productos/${productoCreado.id}`).send(productoActualizado);
        expect(putResponse.statusCode).toBe(200);
        expect(putResponse.body.nombre).toBe(productoActualizado.nombre);
        expect(putResponse.body.precio).toBe(productoActualizado.precio);
    });
    test('DELETE /Productos/:id elimina un producto existente', async () => {
        const nuevoProducto = { nombre: 'Laptop 5', precio: 20.99 };
        const postResponse = await request(app).post('/productos').send(nuevoProducto);
        const productoCreado = postResponse.body;

        const deleteResponse = await request(app).delete(`/productos/${productoCreado.id}`);
        expect(deleteResponse.statusCode).toBe(200);
        expect(deleteResponse.body.message).toBe('Producto eliminado');
    });

});