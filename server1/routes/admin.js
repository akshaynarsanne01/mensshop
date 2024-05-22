const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {
    validate,
    validateSignupAdminresult,
    loginValidationRules,
    resetValidationRules,
    brandValidationRules
} = require("../middleware/validators/validationMiddleware");

router.post('/signup', validateSignupAdminresult(), validate, adminController.signup);
router.post('/signin', loginValidationRules(), validate, adminController.signin);
router.post('/resetpassword', resetValidationRules(), validate, adminController.resetPassword);
router.get('/brands', adminController.getBrands);
router.get('/brands/:id', adminController.getBrandById);
router.post('/brands/:id', brandValidationRules(), validate, adminController.updateBrand);
router.delete("/brands/:id", adminController.deleteBrand);
module.exports = router;
