'use strict';

const Model = require('../mongo.js');
const schema = require('./products-schema.js');

// mongo connection
class Products extends Model {

  constructor(){
    super(schema);
  }

}

// export
module.exports = Products;