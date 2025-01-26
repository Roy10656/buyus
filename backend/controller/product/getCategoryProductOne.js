const productModel = require("../../models/productModel");

const getCategoryProduct = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("productCategory");
    console.log("Fetched Categories:", productCategory); // Log the fetched categories

    if (!productCategory.length) {
      return res.status(404).json({
        message: "No categories found",
        data: [],
        success: false,
        error: true
      });
    }

    const productByCategory = [];

    for (const category of productCategory) {
      const product = await productModel.findOne({ productCategory: category });
      if (product) {
        productByCategory.push(product);
      }
    }

    res.json({
      message: "category product",
      data: productByCategory,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryProduct;
