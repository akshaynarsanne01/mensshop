const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {
    validate,
    validateSignupAdminresult,
    loginValidationRules,
    resetValidationRules,
    brandValidationRules,
    categoryValidationRules,
    subCategoryValidationRules,
    productValidationRules,
    productVarientValidateRules,
    colorValidationRules,
    sizeValidationRules,
    productUpdateVarientValidateRules,
} = require("../middleware/validators/validationMiddleware");

router.post('/signup', validateSignupAdminresult(), validate, adminController.signup);
router.post('/signin', loginValidationRules(), validate, adminController.signin);
router.put('/resetpassword', resetValidationRules(), validate, adminController.resetPassword);

router.route('/brand')
    .post(brandValidationRules(), validate, adminController.createBrand)
    .get(adminController.fetchAllBrands);
router.route('/brand/:id')
    .put(brandValidationRules(), validate, adminController.updateBrand)
    .get(adminController.fetchBrandById)
    .delete(adminController.deleteBrandById);

router.route('/category')
    .post(categoryValidationRules(), validate, adminController.createCategory)
    .get(adminController.fetchAllCategory);
router.route('/category/:id')
    .put(categoryValidationRules(), validate, adminController.updateCategory)
    .get(adminController.fetchCategoryById)
    .delete(adminController.deleteCategoryById);

router.route('/subcategory')
    .post(subCategoryValidationRules(), validate, adminController.createSubCategory)
    .get(adminController.fetchAllCategory);
router.route('/subcategory/:id')
    .put(subCategoryValidationRules(), validate, adminController.updateSubCategory)
    .get(adminController.fetchSubCategoryById)
    .delete(adminController.deleteSubCategoryById);

router.route('/color')
    .post(colorValidationRules(),validate,adminController.createColor)
    .get(adminController.fetchAllColor);
router.route('/color/:id')
    .put(colorValidationRules(),validate,adminController.updateColor)
    .get(adminController.fetchColorById)
    .delete(adminController.deleteColorById);

router.route('/size')
    .post(sizeValidationRules(),validate,adminController.createSize)
    .get(adminController.fetchAllSize);
router.route('/size/:id')
    .put(sizeValidationRules(),validate,adminController.updateSize)
    .get(adminController.fetchSizeById)
    .delete(adminController.deleteSizeById);

router.route('/product')
    .post(productValidationRules(), validate, adminController.createProduct)
    .get(adminController.fetchAllProduct);
router.route('/product/:id')
    .put(productValidationRules(), validate, adminController.updateProduct)
    .get(adminController.fetchProductById)
    .delete(adminController.deleteProductById);

router.route('/variant')
    .post(productVarientValidateRules(), validate, adminController.createVariant)
    .get(adminController.fetchAllVariant);
router.route('/variant/:id')
    .put(productUpdateVarientValidateRules(), validate, adminController.updateVariant)
    .get(adminController.fetchVariantById)
    .delete(adminController.deleteVariantById);

// router.route('/image')
//     .post(adminController.addImage)
//     .get(adminController.images);
// router.route('/image/:id')
//     .put(adminController.updateImage)
//     .get(adminController.image)
//     .delete(adminController.deleteImage);

// router.route('/payment')
//     .post(paymentController.addPayment)
//     .get(paymentController.getPayments);
// router.route('/payment/:id')
//     .put(paymentController.updatePayment)
//     .get(paymentController.getPaymentById)
//     .delete(paymentController.deletePayment);

module.exports = router;
