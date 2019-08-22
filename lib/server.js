'use strict';

const express = require('express');
const app = express();

const hrRoutes = require('../routes/hr');

app.use('/hr', hrRoutes);
