'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );

// file Routes

const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Catchalls
app.use(notFound);
app.use(errorHandler);

// routes

app.get('/', (request, response) => {
  response.send('app running');
});

app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);

module.exports = {
  server: app,
  start: (port) => app.listen(port, () => console.log(`Server up on port ${port}`) ),
};
