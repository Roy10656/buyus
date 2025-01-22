const productModel = require("../../models/productModel");

const getCatagoryProduct = async (req, res) => {
  try {
    const productCatagory = await productModel.distinct("productCatagory");

    console.log("catagory", productCatagory);

    // Array to store one product from each category
    const productByCatagory = [];

    for (const catagory of productCatagory) {
      const product = await productModel.findOne({ productCatagory: catagory });

      if (product) {
        productByCatagory.push(product);
      }
    }

    res.json({
      message: "category product",
      data: productByCatagory,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getCatagoryProduct;
