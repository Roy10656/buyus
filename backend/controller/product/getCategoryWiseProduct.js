const productModel = require('../../models/productModel');

const getCategoryWiseProduct = async (req, res) => {
    try {
        const { productCategory } = req?.body || req?.query;
        console.log('Requested category:', productCategory); // Debug log
        const product = await productModel.find({ productCategory });
        console.log('Fetched products:', product); // Debug log

        res.json({
            message: "Product",
            error: false,
            success: true,
            data: product
        });
    } catch (err) {
        console.error('Error:', err); // Debug log
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = getCategoryWiseProduct;
