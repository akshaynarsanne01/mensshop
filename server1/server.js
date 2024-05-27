const express = require("express");
const db = require("./db/db");
const cors = require('cors');
const admin = require("./routes/admin");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error("Unable to connect to database:", err);
            return res.status(500).send("Unable to connect to database");
        }
        req.db = connection;
        next();
    });
});
app.use('/admin',admin);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
