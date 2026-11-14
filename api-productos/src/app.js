const express = require('express');
const app = express();

app.use(express.json());

let productos = [
    { id: 1, nombre: 'Laptop 1', precio: 10.99 },
    { id: 2, nombre: 'Laptop 2', precio: 19.99 },
    { id: 3, nombre: 'Laptop 3', precio: 5.99 }
];

app.get('/productos', (req, res) => {
   res.json(productos);
});

app.post('/productos', (req, res) => {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        return res.status(400).json({ error: 'Nombre y precio son requeridos' });
    }
    const nuevoProducto = {
        id: productos.length + 1,
        nombre,
        precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    const producto = productos.find(p => p.id === parseInt(id));

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    producto.nombre = nombre;
    producto.precio = precio;

    res.json(producto);
});

app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const producto = productos.find(p => p.id === parseInt(id));

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    productos = productos.filter(p => p.id !== parseInt(id));
    res.json({ message: 'Producto eliminado' });
});

module.exports = app;