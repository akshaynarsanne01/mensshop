const adminModel = require("../models/adminModel");

exports.signup = (req, res) => {
    adminModel.signup(req.validatedData, req.db)
        .then(() => res.send("Admin signed up successfully"))
        .catch(error => res.status(500).send(error.message));
};

exports.signin = (req, res) => {
    adminModel.signin(req.validatedData, req.db)
        .then(result => {
            if (result.length === 0) {
                res.status(400).send("Admin not found");
            } else {
                res.send(result);
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.resetPassword = (req, res) => {
    adminModel.resetPassword(req.validatedData, req.db)
        .then(() => res.send("Password updated successfully"))
        .catch(error => res.status(500).send(error.message));
};

exports.addBrand = (req, res) => {
    adminModel.addBrand(req.validatedData, req.db)
        .then(() => res.send("Brand added successfully"))
        .catch(error => res.status(500).send(error.message));
};

exports.getBrands = (req, res) => {
    adminModel.getBrands(req.db)
        .then(result => {
            if (result.length === 0) {
                res.status(404).send("Brands not found");
            } else {
                res.send(result);
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.getBrandById = (req, res) => {
    adminModel.getBrandById(req.params.id, req.db)
        .then(result => {
            if (result.length === 0) {
                res.status(404).send("Brand not found");
            } else {
                res.send(result);
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.updateBrand = (req, res) => {
    adminModel.updateBrandById(req.params.id, req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                res.status(400).send("Brand could not be updated");
            } else {
                res.send("Brand updated successfully");
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.deleteBrand = (req, res) => {
    adminModel.deleteBrand(req.params.id, req.db)
        .then(result => {
            if (result.affectedRows === 0) {
                res.status(400).send("Error deleting brand");
            } else {
                res.send("Brand deleted");
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.addCategory = (req, res) => {
    adminModel.addCategory(req.db, req.validatedData)
        .then(result => res.send("Category added successfully"))
        .catch(error => res.status(500).send(error.message));
};

exports.updateCategory = (req, res) => {
    adminModel.updateCategory(req.params.id, req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                res.status(400).send("Unable to update category");
            } else {
                res.send("Category updated successfully");
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.getCategories = (req, res) => {
    adminModel.getCategories(req.db)
        .then(result => {
            if (result.length === 0) {
                res.status(404).send("No categories found");
            } else {
                res.send(result);
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.getCategoryById = (req, res) => {
    adminModel.getCategoryById(req.params.id, req.db)
        .then(result => {
            if (result.length === 0) {
                res.status(404).send("Category not found");
            } else {
                res.send(result);
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.addSubCategory = (req, res) => {
    adminModel.category(req.body.category_id, req.db)
        .then(result => {
            if (result.length > 0 && result[0].category_id === req.body.category_id) {
                return adminModel.addSubCategory(req.body.category_id, req.db, req.validatedData);
            } else {
                throw new Error("Category not found");
            }
        })
        .then(() => res.send("Subcategory added successfully"))
        .catch(error => res.status(500).send(error.message));
};

exports.updateSubCategory = (req, res) => {
    adminModel.updateSubCategory(req.params.id, req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                res.status(400).send("Unable to update subcategory");
            } else {
                res.send("Subcategory updated successfully");
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.subCategories = (req, res) => {
    adminModel.subCategories(req.db)
        .then(result => {
            if (result.length === 0) {
                res.status(404).send("No subcategories found");
            } else {
                res.send(result);
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.subCategory = (req, res) => {
    adminModel.subCategory(req.params.id, req.db)
        .then(result => {
            if (result.length === 0) {
                res.status(404).send(`Subcategory with ID ${req.params.id} not found`);
            } else {
                res.send(result);
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.deleteSubCategory = (req, res) => {
    adminModel.deleteSubCategory(req.params.id, req.db)
        .then(result => {
            if (result.affectedRows === 0) {
                res.status(400).send(`Subcategory with ID ${req.params.id} not found`);
            } else {
                res.send("Subcategory deleted");
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.addColor = (req, res) => {
    console.log(req.validatedData);
    adminModel.addColor(req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                res.status(400).send("Could not add color");
            } else {
                res.send("Color added successfully");
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.updateColor = (req, res) => {
    adminModel.updateColor(req.params.id, req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                res.status(400).send("Could not update color");
            } else {
                res.send("Color updated successfully");
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.colors = (req, res) => {
    adminModel.colors(req.db)
        .then(result => {
            if (result.length === 0) {
                res.status(404).send("No colors found");
            } else {
                res.send(result);
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.color = (req, res) => {
    adminModel.color(req.params.id, req.db)
        .then(result => {
            if (result.length === 0) {
                res.status(404).send(`Color with ID ${req.params.id} not found`);
            } else {
                res.send(result);
            }
        })
        .catch(error => res.status(500).send(error.message));
};

exports.deleteColor = (req, res) => {
    adminModel.deleteColor(req.params.id, req.db)
        .then(result => {
            if (result.affectedRows === 0) {
                res.status(400).send(`Color with ID ${req.params.id} could not be deleted`);
            } else {
                res.send("Color deleted successfully");
            }
        })
        .catch(error => res.status(500).send(error.message));
};
exports.addSize = (req, res) => {
    adminModel.addSize(req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                res.status(400), send("Coundnot add size");
            } else {
                res.send("size Added");
            }
        })
        .catch(error => res.status(500).send(error.message));
}
exports.updateSize = (req,res) => {
    adminModel.updateSize(req.params.id,req.db,req.validatedData)
        .then(result =>{
            if(result.length === 0 || result.affectedRows === 0){
                res.status(400).send(`Size with ${req.params.id} could not updated`);
            }else{
                res.send("size updated");
            }
        })
        .catch(error => {
            res.status(500).send(error.message);
        })
}
exports.sizes = (req,res) => {
    adminModel.sizes(req.db)
        .then(result =>{
            if(result.length === 0){
                res.status(400).send("Sizes not found");
            }else{
                res.send(result);
            }
        })
        .catch(error  => {
            res.status(500).send(error.message);
        })
}
exports.size = (req,res) => {
    adminModel.size(req.params.id,req.db)
        .then(result => {
            if(result.length === 0){
                res.status(400).send(`size with the ${req.params.id} id not found`);
            }else{
                res.send(result);
            }
        })
        .catch(error => {
            res.status(500).send(error.message);
        })
}
exports.deleteSize = (req,res) =>{
    adminModel.deleteSize(req.params.id,req.db)
        .then(result => {
            if(result.affectedRows === 0){
                res.status(400).send(`size with the ${req.params.id} is not found`);
            }else{
                res.send("size deleted");
            }
        })
        .catch(error =>{
            res.status(500).send(error.message);
        })
}