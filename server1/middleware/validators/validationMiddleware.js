const { body, validationResult } = require('express-validator');

const customerValidationRules = () => {
    return [
        body('first_name').isString().notEmpty().withMessage('First name is required'),
        body('last_name').isString().notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('phone_number').isString().notEmpty().withMessage('Phone number is required'),
        body('password_hash').isString().notEmpty().withMessage('Password is required'),
        body('address_line1').isString().notEmpty().withMessage('Address line 1 is required'),
        body('address_line2').isString().optional(),
        body('city').isString().notEmpty().withMessage('City is required'),
        body('state').isString().notEmpty().withMessage('State is required'),
        body('zip_code').isString().notEmpty().withMessage('Zip code is required'),
        body('country').isString().notEmpty().withMessage('Country is required'),
        body('address_type').isString().notEmpty().withMessage('Address type is required')
    ];
}
const validateSignupAdminresult = () => {
    return [
        body('full_name').optional().isString().trim().notEmpty().isLength({ min: 5, max: 25 }),
        body('email').isEmail().trim().notEmpty().isLength({ min: 10 }),
        body('password').isString().trim().notEmpty().isLength({ min: 10, max: 30 })
    ];
}
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { first_name, last_name, email, phone_number, password_hash, address_line1, address_line2, city, state, zip_code, country, address_type } = req.body;
    req.validatedData = [first_name, last_name, email, phone_number, password_hash, address_line1, address_line2, city, state, zip_code, country, address_type];
    next();
}
const validateSignupAdmin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { full_name, email, password } = req.body;
    req.validatedData = [full_name, email, password];
    next();
}
const loginValidationRules = () => {
    return [
        body('email').isEmail().trim().notEmpty().isLength({ min: 10 }),
        body('password').isString().trim().notEmpty().isLength({ min: 10, max: 30 })
    ];
}
const validateLogin = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    req.validatedData = [email,password];
    next();
}
const resetValidationRules = () => {
    return [
        body('email').isEmail().trim().notEmpty().isLength({ min: 10 }),
        body('password').isString().trim().notEmpty().isLength({ min: 10, max: 30 }),
        body('new_password').isString().trim().notEmpty().isLength({ min: 10, max: 30 }),
        body('confirm_password').isString().trim().notEmpty().isLength({ min: 10, max: 30 })
    ];
}
const validateReset = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password,new_password,confirm_password} = req.body;
    req.validatedData = [email,password,new_password,confirm_password];
    next();
}
module.exports = {
    customerValidationRules,
    validate,
    validateSignupAdmin,
    validateSignupAdminresult,
    loginValidationRules,
    validateLogin,
    resetValidationRules,
    validateReset
};
