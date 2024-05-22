const { body, validationResult } = require('express-validator');

// Common validation rules
const stringField = (field, options = {}) => body(field).isString().trim().notEmpty().withMessage(`${field} is required`).isLength(options);
const emailField = (field) => body(field).isEmail().trim().notEmpty().withMessage('Valid email is required');
const passwordField = (field, options = {}) => body(field).isString().trim().notEmpty().isLength(options).withMessage('Password is required');

const customerValidationRules = () => [
    stringField('first_name'),
    stringField('last_name'),
    emailField('email'),
    stringField('phone_number'),
    stringField('password_hash'),
    stringField('address_line1'),
    body('address_line2').optional().isString().trim(),
    stringField('city'),
    stringField('state'),
    stringField('zip_code'),
    stringField('country'),
    stringField('address_type')
];

const validateSignupAdminresult = () => [
    stringField('full_name', { min: 5, max: 25 }).optional(),
    emailField('email').isLength({ min: 10 }),
    passwordField('password', { min: 10, max: 30 })
];

const loginValidationRules = () => [
    emailField('email').isLength({ min: 10 }),
    passwordField('password', { min: 10, max: 30 })
];

const resetValidationRules = () => [
    emailField('email').isLength({ min: 10 }),
    passwordField('password', { min: 10, max: 30 }),
    passwordField('new_password', { min: 10, max: 30 }),
    passwordField('confirm_password', { min: 10, max: 30 })
];

const brandValidationRules = () => [
    stringField('brand_name', { min: 5, max: 20 }),
    stringField('brand_description', { min: 5, max: 50 }).optional()
];

// Common validation handler
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    req.validatedData = req.body;
    next();
};

module.exports = {
    customerValidationRules,
    validateSignupAdminresult,
    loginValidationRules,
    resetValidationRules,
    brandValidationRules,
    validate
};
