const express = require('express');
const router = express.Router();

const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignIn');
const authToken = require('../middleware/authToken');
const userDetailsController = require('../controller/user/userDetails');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUserRole = require('../controller/user/updateUserRole');
const uploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// admin panel
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUserRole);

// Product
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-products", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);

module.exports = router;