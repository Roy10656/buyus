const mongoose = require('mongoose');
const productModel = require('./productModel'); // Adjust path as necessary
require('dotenv').config();

const updateFieldNames = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    // Update the field name in all documents
    await productModel.updateMany(
      { "productCatagory": { $exists: true } },
      { $rename: { "productCatagory": "productCategory" } }
    );

    console.log('Field name updated');
    mongoose.disconnect();
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

updateFieldNames();
