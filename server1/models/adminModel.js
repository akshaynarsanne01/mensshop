const executeQuery = async (db, query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

// Generic CRUD operation functions
const create = async (db, table, data) => {
    const columns = Object.keys(data).join(',');
    const placeholders = Object.keys(data).map(() => '?').join(',');
    const values = Object.values(data);
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    return executeQuery(db, query, values);
};

const readAll = async (db, table) => {
    const query = `SELECT * FROM ${table}`;
    return executeQuery(db, query, []);
};

const readById = async (db, table, id) => {
    const query = `SELECT * FROM ${table} WHERE ${table}_id = ?`;
    return executeQuery(db, query, [id]);
};

const updateById = async (db, table, id, data) => {
    const columns = Object.keys(data).map(key => `${key} = ?`).join(',');
    const values = Object.values(data);
    const query = `UPDATE ${table} SET ${columns} WHERE ${table}_id = ?`;
    return executeQuery(db, query, [...values, id]);
};

const deleteById = async (db, table, id) => {
    const query = `DELETE FROM ${table} WHERE ${table}_id = ?`;
    return executeQuery(db, query, [id]);
};

// Specific function exports using the generic functions
exports.signup = async (data, db) => {
    return create(db, 'admin', data);
};

exports.signin = async (data, db) => {
    const qry = `SELECT * FROM admin WHERE email = ? AND password = ?`;
    const [email, password] = Object.values(data);
    return executeQuery(db, qry, [email, password]);
};

exports.resetPassword = async (data, db) => {
    const [email, password, newPassword, confirmPassword] = Object.values(data);
    const selectQuery = `SELECT * FROM admin WHERE email = ? AND password = ?`;
    const result = await executeQuery(db, selectQuery, [email, password]);

    if (result.length === 0) {
        throw new Error("Email or password is wrong.");
    }

    if (newPassword !== confirmPassword) {
        throw new Error("New password and confirm password do not match.");
    }

    const updateQuery = `UPDATE admin SET password = ? WHERE email = ?`;
    await executeQuery(db, updateQuery, [newPassword, email]);
};

exports.createBrand = async (data, db) => {
    return create(db, 'brand', data);
};

exports.fetchAllBrands = async (db) => {
    return readAll(db, 'brand');
};

exports.fetchBrandById = async (id, db) => {
    return readById(db, 'brand', id);
};

exports.updateBrandById = async (id, db, data) => {
    return updateById(db, 'brand', id, data);
};

exports.deleteBrandById = async (id, db) => {
    return deleteById(db, 'brand', id);
};

exports.getSizes = async (db) => {
    return readAll(db, 'size');
};

exports.getSize = async (id, db) => {
    return readById(db, 'size', id);
};

exports.getColors = async (db) => {
    return readAll(db, 'color');
};

exports.getCustomers = async (db) => {
    return readAll(db, 'customer');
};

exports.getCustomer = async (id, db) => {
    return readById(db, 'customer', id);
};

exports.createCategory = async (db,data) => {
    return create(db, 'category', data);
};

exports.updateCategory = async (id, db, data) => {
    return updateById(db, 'category', id, data);
};

exports.fetchAllCategory = async (db) => {
    return readAll(db, 'category');
};

exports.fetchCategoryById = async (id, db) => {
    return readById(db, 'category', id);
};
exports.deleteCategoryById = async (id, db) => {
    return deleteById(db, 'category', id);
};

exports.createSubCategory = async (id, db, data) => {
    const subCategoryData = { ...data, category_id: id };
    return create(db, 'sub_category', subCategoryData);
};

exports.updateSubCategory = async (id, db, data) => {
    return updateById(db, 'sub_category', id, data);
};

exports.fetchAllSubCategory = async (db) => {
    return readAll(db, 'sub_category');
};

exports.fetchSubCategoryById = async (id, db) => {
    return readById(db, 'sub_category', id);
};

exports.deleteSubCategoryById = async (id, db) => {
    return deleteById(db, 'sub_category', id);
};
exports.createColor = async (db, data) => {
    return create(db, 'color', data);
}
exports.updateColor = async (id, db, data) => {
    return updateById(db, 'color', id,data);
}
exports.fetchAllColor = async (db, data) => {
    return readAll(db, 'color', data);
}
exports.fetchColorById = async (id, db) => {
    return readById(db, 'color', id);
}
exports.deleteColorById = async (id,db) =>{
    return deleteById(db,'color',id);
}
exports.createSize = async (db,data) => {
    return create(db,'size',data);
}
exports.updateSize = async (id,db,data) =>{
    return updateById(db,'size',id,data);
}
exports.fetchAllSize = async (db) =>{
    return readAll(db,'size');
}
exports.fetchSizeById = async (id,db) =>{
    return readById(db,'size',id);
}
exports.deleteSizeById = (id,db) =>{
    return deleteById(db,'size',id);
}
exports.createProduct = (db,data) =>{
    return create(db,'products',data);
}
exports.updateProduct = (id,db,data) =>{
    return updateById(db,'products',id,data);
}
exports.fetchAllProduct = (db) =>{
    return readAll(db,'products');
}
exports.fetchProductById = (id,db) =>{
    return readById(db,'products',id);
}
exports.deleteProductById = (id,db) =>{
    return deleteById(db,'products',id);
}
exports.createVariant = (db,data) =>{
    return create(db,'product_variant',data);
}
exports.fetchAllVariant = (db) =>{
    return readAll(db,'product_variant');
}
exports.fetchVariantById = (id,db) =>{
    return readById(db,'product_variant',id);
}
exports.updateVariant = (id,db,data) =>{
    return updateById(db,'product_variant',id,data);
}
exports.deleteVariantById = (id,db,data) =>{
    return deleteById(db,'product_variant',id);
}
exports.addImage = (db, data) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO product_images (variant_id, image_data, created_at, updated_at) VALUES (?, ?, ?, ?)';
        console.log(query);
        console.log( [data.variant_id, data.image_data, data.created_at, data.updated_at]);
        db.query(query, [data.variant_id, data.image_data, data.created_at, data.updated_at], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};