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

exports.signup = async (data, db) => {
    const qry = `INSERT INTO admin (full_name,email,password) VALUES (?,?,?)`;
    const arguments = Object.values(data);
    await executeQuery(db, qry, arguments);
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

exports.getBrands = async (db) => {
    const selectQuery = `SELECT * FROM brand`;
    return executeQuery(db, selectQuery, []);
};

exports.getBrandById = async (id, db) => {
    const selectQuery = `SELECT * FROM brand WHERE brand_id = ?`;
    return executeQuery(db, selectQuery, [id]);
};
exports.updateBrandById = async (id, db, params) => {
    const arguments = Object.values(params);
    const updateQuery = `update brand set brand_name = ?, description = ? where brand_id = ?`;
    return executeQuery(db, updateQuery, [...arguments, id]);
}
exports.deleteBrand = async (id, db) => {
    const deleteQuery = `delete from brand where brand_id = ?`;
    return executeQuery(db, deleteQuery, id);
}

exports.getSizes = async (db) => {
    const selectQuery = `select * from size`;
    return executeQuery(db, selectQuery);
}
exports.getSize = async (id, db) => {
    const selectQuery = `select * from size where size_id = ?`;
    return executeQuery(db, selectQuery, id);
}
exports.getColors = async (db) => {
    const selectQuery = `select * from color`;
    return executeQuery(db, selectQuery);
}
exports.getCustomers = async (db) => {
    const selectQuery = `select * from customer`;
    return executeQuery(db, selectQuery);
}
exports.getCustomer = async (id, db) => {
    const selectQuery = `select * from customer where customer_id = ?`;
    return executeQuery(db, selectQuery, id);
}

