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
    subCategoryValidationRules
} = require("../middleware/validators/validationMiddleware");

router.post('/signup', validateSignupAdminresult(), validate, adminController.signup);
router.post('/signin', loginValidationRules(), validate, adminController.signin);
router.post('/resetpassword', resetValidationRules(), validate, adminController.resetPassword);
router.post('/addBrand', brandValidationRules(), validate, adminController.addBrand);
router.get('/brands', adminController.getBrands);
router.get('/brands/:id', adminController.getBrandById);
router.post('/brands/:id', brandValidationRules(), validate, adminController.updateBrand);
router.delete("/brands/:id", adminController.deleteBrand);
router.post('/addCategory', categoryValidationRules(), validate, adminController.addCategory);
router.post('/updateCategory/:id', categoryValidationRules(), validate, adminController.updateCategory);
router.get('/categories', adminController.getCategories);
router.get('/categories/:id', adminController.getCategoryById);
router.post('/addSubCategory', subCategoryValidationRules(), validate, adminController.addSubCategory);
router.post('/updateSubCategory/:id', subCategoryValidationRules(), validate, adminController.updateSubCategory);
router.get('/sub_categories',adminController.subCategories);
router.get('/sub_category',adminController.subCategory);
router.delete('/deleteSubCategory/:id',adminController.deleteSubCategory);
router.post('/addColor',adminController.addColor);
router.post('/updateColor/:id',adminController.updateColor);
router.get('/colors',adminController.colors);
router.get('/color/:id',adminController.color);
router.delete('/deleteColor/:id',adminController.deleteColor);
router.post('/addSize',adminController.addSize);
router.post('/updateSize/:id',adminController.updateSize);
router.get('/sizes',adminController.sizes);
router.get('/size/:id',adminController.size);
router.delete('/deleteSize/:id',adminController.deleteSize);
module.exports = router;
