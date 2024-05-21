const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {
    validateSignupAdminresult,
    validateSignupAdmin,
    loginValidationRules,
    validateLogin,
    resetValidationRules,
    validateReset
} = require("../middleware/validators/validationMiddleware");

router.post('/signup', validateSignupAdminresult(), validateSignupAdmin, adminController.signup);
router.post('/signin', loginValidationRules(), validateLogin, adminController.signin);
router.post('/resetpassword', resetValidationRules(), validateReset, adminController.resetPassword);
router.get('/brands', adminController.getBrands);
router.get('/brands/:id', adminController.getBrandById);

module.exports = router;
