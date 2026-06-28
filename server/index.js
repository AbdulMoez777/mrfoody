const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());


// This tells Express to look inside the "images" folder whenever someone goes to http://localhost:5000/images/...
app.use('/images', express.static(path.join(__dirname, 'images')));

// Endpoint to get data from category.json
app.get('/categories', (req, res) => {
    const filePath = path.join(__dirname, 'data/category.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        try {
            const categories = JSON.parse(data);
            res.json(categories);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Endpoint to get data from restaurantChains.json
app.get('/top-restaurant-chains', (req, res) => {
    const filePath = path.join(__dirname, 'data/restaurantChains.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        try {
            const restaurantChains = JSON.parse(data);
            res.json(restaurantChains);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Endpoint to get menu data for a specific restaurant
app.get('/menu/:restaurantId', (req, res) => {
    const restaurantId = req.params.restaurantId;
    const filePath = path.join(__dirname, 'data/menu.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        try {
            const menus = JSON.parse(data);
            const restaurantMenu = menus[restaurantId] || [];
            res.json(restaurantMenu);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});