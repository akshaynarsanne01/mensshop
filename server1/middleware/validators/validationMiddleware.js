const { body, validationResult } = require('express-validator');
const { sendSuccessResponse, sendFailResponse, sendErrorResponse } = require('../../utils/responseUtils');

// Common validation rules
const stringField = (field, options = {}) => body(field).isString().trim().notEmpty().withMessage(`${field} is required`).isLength(options);
const emailField = (field) => body(field).isEmail().trim().notEmpty().withMessage('Valid email is required');
const passwordField = (field, options = {}) => body(field).isString().trim().notEmpty().isLength(options).withMessage('Password is required');
const priceField = (field, options = {}) => body(field).isFloat(options).trim().notEmpty().withMessage(`${field} should be number`);
const idField = (field, options = {}) => body(field).trim().notEmpty().withMessage(`${field} is required`);
const isBoolean = (field, optoins = {}) => body(field).trim().notEmpty().isBoolean().withMessage(`${field} should be boolean`);
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
const categoryValidationRules = () => [
    stringField('category_name', { min: 5, max: 20 }),
    stringField('description', { min: 5, max: 50 }),
]
const colorValidationRules = () => [
    stringField('color', { min: 5, max: 20 }),
    stringField('description', { min: 5, max: 50 }),
]
const sizeValidationRules = () => [
    stringField('size', { min: 1, max: 20 }),
    stringField('description', { min: 5, max: 50 }),
]
const subCategoryValidationRules = () => [
    stringField('sub_category_name', { min: 5, max: 20 }),
    stringField('description', { min: 5, max: 50 }),
]
const productValidationRules = () => [
    idField('brand_id'),
    idField('category_id'),
    idField('sub_category_id'),
    stringField('name', { min: 5, max: 30 }),
    stringField('description', { min: 5, max: 50 }),
    priceField('price', { min: 0.1 }),
    priceField('selling_price', { min: 0 }),
    isBoolean('is_deleted'),
    isBoolean('is_active'),
    isBoolean('is_featured'),
]
const productVarientValidateRules = () => [
    idField('product_id'),
    idField('size_id'),
    idField('color_id'),
    idField('quantity')
]
const productUpdateVarientValidateRules = () => [
    idField('quantity')
]
// Common validation handler
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorValues = errors.array().map(error => error.value + ": is " + error.msg);
        return sendErrorResponse(res, errorValues);;
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
    categoryValidationRules,
    subCategoryValidationRules,
    productValidationRules,
    productVarientValidateRules,
    colorValidationRules,
    sizeValidationRules,
    productUpdateVarientValidateRules,
    validate
};
