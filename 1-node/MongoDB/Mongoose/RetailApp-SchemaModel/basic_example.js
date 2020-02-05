var mongoose = require('mongoose');
var productSchema = require('./product');

var Product = mongoose.model('Product', productSchema);

var p = new Product({
  name: 'test',
  price: {
    amount: 5,
    currency: 'USD'
  },
  category: {
    name: 'test'
  }
});
