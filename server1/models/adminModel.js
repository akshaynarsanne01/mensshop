exports.signup = (data, db) => {
    return new Promise((resolve, reject) => {
        const qry = `INSERT INTO admin (full_name,email,password) VALUES (?,?,?)`;
        db.query(qry, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

exports.signin = (data, db) => {
    return new Promise((resolve, reject) => {
        const qry = `SELECT * FROM admin WHERE email=? AND password = ?`;
        db.query(qry, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.resetPassword = (data, db) => {
    return new Promise((resolve, reject) => {
        const [email, password, newPassword, confirmPassword] = data;
        const selectQuery = `SELECT * FROM admin WHERE email = ? AND password = ?`;
        db.query(selectQuery, [email, password], (err, result) => {
            if (err) {
                reject(err);
            }
            if (result.length === 0) {
                reject(new Error("Email or password is wrong."));
            }

            if (newPassword !== confirmPassword) {
                reject(new Error("New password and confirm password do not match."));
            }

            const updateQuery = `UPDATE admin SET password = ? WHERE email = ?`;
            db.query(updateQuery, [newPassword, email], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    });
};

exports.getBrands = (db) => {
    return new Promise((resolve, reject) => {
        const selectQuery = `SELECT * FROM brand`;
        db.query(selectQuery, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.getBrandById = (id, db) => {
    return new Promise((resolve, reject) => {
        const selectQuery = `SELECT * FROM brand WHERE brand_id = ?`;
        db.query(selectQuery, id, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
