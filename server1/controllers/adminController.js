const adminService = require("../services/adminService");

exports.signup = (req, res) => {
    adminService.signup(req.validatedData, req.db)
        .then(() => res.send("Admin signed up successfully"))
        .catch(error => res.status(500).send(error.message));
};

exports.signin = (req, res) => {
    adminService.signin(req.validatedData, req.db)
        .then(result => {
            if (result.length == 0) {
                res.status(400).send("Admin not found");
            } else {
                res.send(result);
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.resetPassword = (req, res) => {
    adminService.resetPassword(req.validatedData, req.db)
        .then(() => res.send("Password updated successfully"))
        .catch(error => res.status(500).send(error.message));
};

exports.getBrands = (req, res) => {
    adminService.getBrands(req.db)
        .then(result => {
            if (result.length === 0) {
                res.status(400).send("Brands not found");
            } else {
                res.send(result);
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.getBrandById = (req, res) => {
    adminService.getBrandById(req.params.id, req.db)
        .then(result => {
            if (result.length === 0) {
                res.status(400).send("Brand not found");
            } else {
                res.send(result);
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.updateBrand = (req, res) => {
    adminService.updateBrand(req.params.id, req.db, req.validatedData)
        .then(result => {
            if (result.length === 0 || result.affectedRows == 0) {
                res.status(400).send("Brand could not updated");
            } else {
                res.send("Brand updated Successfully");
            }
        })
        .catch(error => {
            res.status(500).send(error.message);
        })
}
exports.deleteBrand = (req, res) => {
    adminService.deleteBrand(req.params.id, req.db)
        .then(result => {
            if (result.length == 0) {
                res.status(400), send("Error deleting Brand");
            } else {
                res.send("Brand Deleted");
            }
        })
}