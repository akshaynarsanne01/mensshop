const adminModel = require("../models/adminModel");
const { sendSuccessResponse, sendFailResponse, sendErrorResponse } = require('../utils/responseUtils');
// Admin Authentication Controllers
exports.signup = (req, res) => {
    adminModel.signup(req.validatedData, req.db)
        .then(() => sendSuccessResponse(res, 'Admin signed up successfully'))
        .catch(error => sendErrorResponse(res, error.message));
};

exports.signin = (req, res) => {
    adminModel.signin(req.validatedData, req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 400, 'Admin not found');
            } else {
                sendSuccessResponse(res, 'Admin signed in successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

exports.resetPassword = (req, res) => {
    adminModel.resetPassword(req.validatedData, req.db)
        .then(() => sendSuccessResponse(res, 'Password updated successfully'))
        .catch(error => sendErrorResponse(res, error.message));
};

// Brand Controllers
exports.createBrand = (req, res) => {
    adminModel.createBrand(req.validatedData, req.db)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, 'Could not create brand');
            } else {
                sendSuccessResponse(res, 'Brand created successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

exports.fetchAllBrands = (req, res) => {
    adminModel.fetchAllBrands(req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, 'Brands not found');
            } else {
                sendSuccessResponse(res, 'Brands retrieved successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

exports.fetchBrandById = (req, res) => {
    adminModel.fetchBrandById(req.params.id, req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, `Brand with ID ${req.params.id} not found`);
            } else {
                sendSuccessResponse(res, 'Brand retrieved successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

exports.updateBrand = (req, res) => {
    adminModel.updateBrandById(req.params.id, req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, `Brand with ID ${req.params.id} could not be updated`);
            } else {
                sendSuccessResponse(res, 'Brand updated successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

exports.deleteBrandById = (req, res) => {
    adminModel.deleteBrandById(req.params.id, req.db)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, `Brand with ID ${req.params.id} could not be deleted`);
            } else {
                sendSuccessResponse(res, 'Brand deleted successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

// Category Controllers
exports.createCategory = (req, res) => {
    adminModel.createCategory(req.db, req.validatedData)
        .then(result => sendSuccessResponse(res, 'Category added successfully', result))
        .catch(error => sendErrorResponse(res, error.message));
};

exports.updateCategory = (req, res) => {
    adminModel.updateCategory(req.params.id, req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, `Category with ID ${req.params.id} could not be updated`);
            } else {
                sendSuccessResponse(res, 'Category updated successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

exports.fetchAllCategory = (req, res) => {
    adminModel.fetchAllCategory(req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, 'No categories found');
            } else {
                sendSuccessResponse(res, 'Categories retrieved successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

exports.fetchCategoryById = (req, res) => {
    adminModel.fetchCategoryById(req.params.id, req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, `Category with ID ${req.params.id} not found`);
            } else {
                sendSuccessResponse(res, 'Category retrieved successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

exports.deleteCategoryById = (req, res) => {
    adminModel.deleteCategoryById(req.params.id, req.db)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, `Category with ID ${req.params.id} could not be deleted`);
            } else {
                sendSuccessResponse(res, 'Category deleted successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

// SubCategory Controllers
exports.createSubCategory = (req, res) => {
    adminModel.fetchCategoryById(req.body.category_id, req.db)
        .then(result => {
            if (result.length > 0 && result[0].category_id === req.body.category_id) {
                return adminModel.createSubCategory(req.body.category_id, req.db, req.validatedData);
            } else {
                throw new Error("Category not found");
            }
        })
        .then(result => sendSuccessResponse(res, 'Subcategory added successfully', result))
        .catch(error => sendErrorResponse(res, error.message));
};

exports.updateSubCategory = (req, res) => {
    adminModel.updateSubCategory(req.params.id, req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, `Subcategory with ID ${req.params.id} could not be updated`);
            } else {
                sendSuccessResponse(res, 'Subcategory updated successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

exports.fetchAllSubCategory = (req, res) => {
    adminModel.fetchAllSubCategory(req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, 'No subcategories found');
            } else {
                sendSuccessResponse(res, 'Subcategories retrieved successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

exports.fetchSubCategoryById = (req, res) => {
    adminModel.fetchSubCategoryById(req.params.id, req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, `Subcategory with ID ${req.params.id} not found`);
            } else {
                sendSuccessResponse(res, 'Subcategory retrieved successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

exports.deleteSubCategoryById = (req, res) => {
    adminModel.deleteSubCategoryById(req.params.id, req.db)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, `Subcategory with ID ${req.params.id} could not be deleted`);
            } else {
                sendSuccessResponse(res, 'Subcategory deleted successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

// Color Controllers
exports.createColor = (req, res) => {
    adminModel.createColor(req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, 'Could not add color');
            } else {
                sendSuccessResponse(res, 'Color added successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

exports.updateColor = (req, res) => {

    adminModel.updateColor(req.params.id, req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, `Color with ID ${req.params.id} could not be updated`);
            } else {
                sendSuccessResponse(res, 'Color updated successfully', result);
            }
        })
        .catch(error => {
            sendErrorResponse(res, error.message);
        });
};

exports.fetchAllColor = (req, res) => {
    adminModel.fetchAllColor(req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, 'No colors found');
            } else {
                sendSuccessResponse(res, 'Colors retrieved successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

exports.fetchColorById = (req, res) => {
    adminModel.fetchColorById(req.params.id, req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, `Color with ID ${req.params.id} not found`);
            } else {
                sendSuccessResponse(res, 'Color retrieved successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
};

exports.deleteColorById = (req, res) => {
    adminModel.deleteColorById(req.params.id, req.db)
        .then(result => {
            if (result.affectedRows === 0) {
                res.status(400).send(`Color with ID ${req.params.id} could not be deleted`);
            } else {
                res.send("Color deleted successfully");
            }
        })
        .catch(error => res.status(500).send(error.message));
};
exports.createSize = (req, res) => {
    adminModel.createSize(req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, 'Could not add size');
            } else {
                sendSuccessResponse(res, 'size added successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
}
exports.updateSize = (req, res) => {
    adminModel.updateSize(req.params.id, req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, `Size with ID ${req.params.id} could not be updated`);
            } else {
                sendSuccessResponse(res, 'Size updated successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
}
exports.fetchAllSize = (req, res) => {
    adminModel.fetchAllSize(req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, 'No sizes found');
            } else {
                sendSuccessResponse(res, 'Sizes retrieved successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
}
exports.fetchSizeById = (req, res) => {
    adminModel.fetchSizeById(req.params.id, req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, `Size with ID ${req.params.id} not found`);
            } else {
                sendSuccessResponse(res, 'Size retrieved successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
}
exports.deleteSizeById = (req, res) => {
    adminModel.deleteSizeById(req.params.id, req.db)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, `Size with ID ${req.params.id} Could not deleted`);
            } else {
                sendSuccessResponse(res, 'Size Deleted successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
}
exports.createProduct = (req, res) => {
    adminModel.createProduct(req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, 'Could not add product');
            } else {
                sendSuccessResponse(res, 'Product Added Successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
}
exports.updateProduct = (req, res) => {
    adminModel.updateProduct(req.params.id, req.db, req.validatedData)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, `Product with ID ${req.params.id} could not be updated`);
            } else {
                sendSuccessResponse(res, 'Product updated successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
}
exports.fetchAllProduct = (req, res) => {
    adminModel.fetchAllProduct(req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, 'No Products found');
            } else {
                sendSuccessResponse(res, 'Products retrieved successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
}
exports.fetchProductById = (req, res) => {
    adminModel.fetchProductById(req.params.id, req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, `Product with ID ${req.params.id} not found`);
            } else {
                sendSuccessResponse(res, 'Product retrieved successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
}
exports.deleteProductById = (req, res) => {
    adminModel.deleteProductById(req.params.id, req.db)
        .then(result => {
            if (result.affectedRows === 0) {
                sendFailResponse(res, 404, `Product with ID ${req.params.id} Could not deleted`);
            } else {
                sendSuccessResponse(res, 'Product Deleted successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
}
exports.createVariant = async (req, res) => {
    try {
        const { product_id, size_id, color_id } = req.validatedData;
        const product = await adminModel.fetchProductById(product_id, req.db);

        if (product.length === 0) {
            return sendFailResponse(res, 404, 'Product not found');
        }
        const size = await adminModel.fetchSizeById(size_id, req.db);
        if (size.length === 0) {
            return sendFailResponse(res, 404, 'size not found');
        }
        const color = await adminModel.fetchColorById(color_id, req.db);
        if (color.length === 0) {
            return sendFailResponse(res, 404, 'color not found');
        }
        const result = await adminModel.createVariant(req.db, req.validatedData);
        if (result.affectedRows === 0) {
            sendFailResponse(res, 404, 'Could not add variant');
        } else {
            sendSuccessResponse(res, 'Variant Added Successfully', result);
        }
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return sendFailResponse(res, 409, 'Variant already exists');
        }
        sendErrorResponse(res, error.message);
    }
}
exports.updateVariant = async (req, res) => {
    try {
        const quantity = req.validatedData.quantity;
        const result = await adminModel.updateVariant(req.params.id, req.db, { quantity });
        if (result.affectedRows === 0) {
            sendFailResponse(res, 404, 'Could not update variant');
        } else {
            sendSuccessResponse(res, 'Variant Updated Successfully', result);
        }
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
}
exports.fetchAllVariant = (req, res) => {
    adminModel.fetchAllVariant(req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, 'No Variant found');
            } else {
                sendSuccessResponse(res, 'Variant retrieved successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
}
exports.fetchVariantById = (req, res) => {
    adminModel.fetchVariantById(req.params.id, req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, `Variant with ID ${req.params.id} not found`);
            } else {
                sendSuccessResponse(res, 'Variant retrieved successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
}
exports.deleteVariantById = (req, res) => {
    adminModel.deleteVariantById(req.params.id, req.db)
        .then(result => {
            if (result.length === 0) {
                sendFailResponse(res, 404, `Variant with ID ${req.params.id} Could not deleted`);
            } else {
                sendSuccessResponse(res, 'Variant Deleted successfully', result);
            }
        })
        .catch(error => sendErrorResponse(res, error.message));
}
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return sendFailResponse(res, 400, 'No file uploaded');
        }

        const imagePath = `/uploads/${req.file.filename}`;
        const variantId = req.body.variant_id;

        const result = await adminModel.addImage(req.db, {
            variant_id: variantId,
            image_data: imagePath,
            created_at: new Date(),
            updated_at: new Date()
        });

        if (result.affectedRows === 0) {
            sendFailResponse(res, 404, 'Could not save image URL');
        } else {
            sendSuccessResponse(res, 'Image Uploaded Successfully', { image_url: imagePath });
        }
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
};

