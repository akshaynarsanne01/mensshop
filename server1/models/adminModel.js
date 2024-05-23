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

exports.addBrand = async (data, db) => {
    return create(db, 'brand', data);
};

exports.getBrands = async (db) => {
    return readAll(db, 'brand');
};

exports.getBrandById = async (id, db) => {
    return readById(db, 'brand', id);
};

exports.updateBrandById = async (id, db, data) => {
    return updateById(db, 'brand', id, data);
};

exports.deleteBrand = async (id, db) => {
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

exports.addCategory = async (data, db) => {
    return create(db, 'category', data);
};

exports.updateCategory = async (id, db, data) => {
    return updateById(db, 'category', id, data);
};

exports.categories = async (db) => {
    return readAll(db, 'category');
};

exports.category = async (id, db) => {
    return readById(db, 'category', id);
};

exports.addSubCategory = async (id, db, data) => {
    const subCategoryData = { ...data, category_id: id };
    return create(db, 'sub_category', subCategoryData);
};

exports.updateSubCategory = async (id, db, data) => {
    return updateById(db, 'sub_category', id, data);
};

exports.subCategories = async (db) => {
    return readAll(db, 'sub_category');
};

exports.subCategory = async (id, db) => {
    return readById(db, 'sub_category', id);
};

exports.deleteSubCategory = async (id, db) => {
    console.log("aa");
    return deleteById(db, 'sub_category', id);
};
exports.addColor = async (id, db, data) => {
    return create(db, 'color', data);
}
exports.updateColor = async (id, db, data) => {
    return updateById(db, 'color', { ...data, color_id: id });
}
exports.colors = async (db, data) => {
    return readAll(db, 'color', data);
}
exports.color = async (id, db, data) => {
    return readById(db, 'color', {...data,color_id:id});
}
exports.deleteColor = async (id,db) =>{
    return deleteById(db,'color',id);
}
exports.addSize = async (db,data) => {
    return create(db,'size',data);
}
exports.updateSize = async (id,db,data) =>{
    return updateById(db,'size',{...data,size_id:id});
}
exports.sizes = async (db) =>{
    return readAll(db,'size');
}
exports.size = async (id,db) =>{
    return readById(db,'size',id);
}
exports.deleteSize = (req,res) =>{
    return deleteById(db,'size',id);
}