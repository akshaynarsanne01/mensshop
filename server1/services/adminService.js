const adminModel = require("../models/adminModel");

exports.signup = (data, db) => {
    return adminModel.signup(data, db);
};

exports.signin = (data, db) => {
    return adminModel.signin(data, db);
};

exports.resetPassword = (data, db) => {
    return adminModel.resetPassword(data, db);
};

exports.getBrands = (db) => {
    return adminModel.getBrands(db);
};

exports.getBrandById = (id, db) => {
    return adminModel.getBrandById(id, db);
};
exports.updateBrand = (id, db, data) => {
    return adminModel.updateBrandById(id, db, data);
}
exports.deleteBrand = (id, db) => {
    return adminModel.deleteBrand(id, db);
}