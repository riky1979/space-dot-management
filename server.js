const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 8001;

app.use(express.static(path.join(__dirname, '')));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/image', express.static(path.join(__dirname, 'upload')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync(path.join(__dirname, '', 'database.json'));
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.development.host,
    user: conf.development.user,
    password: conf.development.password,
    port: conf.development.port,
    database: conf.development.database
});
connection.connect();


const hashing = require(path.join(__dirname, '', 'hashing.js')); // 두번째 인자 경로? 'config'
const salt = conf.salt;

const multer = require('multer');
const upload = multer({dest: path.join(__dirname, 'upload')});

app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
});
app.get('/coupon/:hash', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
});

app.get('/api/customers', (req, res) => {
    connection.query(
      "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
      (err, rows, fields) => {
          res.send(rows);
          console.log(err);
      }  
    );
});


app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), null, 0)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
            console.log(rows);
            console.log(err);
        }
    );
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1, deletedDate = now() WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log(err);
        }
    )
});


// app.get('/', (req, res) => {
//     res.send({message: 'Hello Home!'});
// });

/**
 * Space
 */

app.get('/api/spaces', (req, res) => {
    connection.query(
      "SELECT id, name, code, type, DATE_FORMAT(createdDate, '%Y-%m-%d %T') as createdDate, image FROM SPACE WHERE isDeleted = 0",
      (err, rows, fields) => {
          res.send(rows);
          console.log(err);
      }  
    );
});

app.get('/api/spaces/:id', (req, res) => {
    let sql = "SELECT id, name, code, type, "
    + " (SELECT COUNT(couponId) FROM COUPON WHERE spaceId=?) as couponCount, "
    + " image "
    + " FROM SPACE WHERE id = ? ";
    let params = [req.params.id, req.params.id];
    connection.query(sql, params,
      (err, rows, fields) => {
          res.send(rows);
          console.log(err);
      }  
    );
});

app.post('/api/spaces', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO SPACE (name, type, code, isDeleted, createdDate, image) VALUES (?, ?, ?, 0, now(), ?)';
    let name = req.body.name;
    let type = req.body.type;
    let code = req.body.code;
    let image = req.file ? '/image/' + req.file.filename : null;
    let params = [name, type, code, image];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
            console.log(rows);
            console.log(err);
        }
    );
});

app.delete('/api/spaces/:id', (req, res) => {
    let sql = 'UPDATE SPACE SET isDeleted = 1, deletedDate = now() WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log(err);
        }
    )
});

app.post('/api/spaces/update/:id', upload.single('image'), (req, res) => {
    let image = req.file ? '/image/' + req.file.filename : null;
    let sql = "UPDATE SPACE SET name = ?, type = ?, code = ? ";
    if(image) {
        sql += ", image = ?";
    }
    sql += " WHERE id = ?";
    
    let params;
    if(image) {
        params = [req.body.name, req.body.type, req.body.code, image, req.body.id];
    } else {
        params = [req.body.name, req.body.type, req.body.code, req.body.id];
    }
    
    console.log(params);
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log(rows);
            console.log(err);
        }
    )
});



/**
 * Coupon
 */

app.get('/api/couponsBySpace/:id', (req, res) => {
    let sql = "SELECT spaceId, couponId, couponCode, couponMenu, "
            + " DATE_FORMAT(couponStartDate, '%Y-%m-%d') as couponStartDate, "
            + " DATE_FORMAT(couponEndDate, '%Y-%m-%d') as couponEndDate, "
            + " DATE_FORMAT(staffCheck, '%Y-%m-%d %T') as staffCheck, "
            + " DATE_FORMAT(confirmOffer, '%Y-%m-%d %T') as confirmOffer, "
            + " DATE_FORMAT(createdDate, '%Y-%m-%d %T') as createdDate, "
            + " hashCode "
            // + " CONCAT('/api/coupon/', hashCode) as link "
            // + " (SELECT code FROM SPACE WHERE id=?) as spaceCode, "
            // + " (SELECT COUNT(couponId) FROM COUPON WHERE spaceId=?) as couponNumber "
            + " FROM COUPON "
            + " WHERE isDeleted = 0 AND spaceId = ?";
    let params = [req.params.id];
    connection.query(sql, params, 
      (err, rows, fields) => {
          res.send(rows);
          console.log(err);
      }  
    );
});

app.get('/api/coupons/:id', (req, res) => {
    let sql = "SELECT spaceId, couponId, couponCode, couponMenu, "
            + " DATE_FORMAT(couponStartDate, '%Y-%m-%d') as couponStartDate, "
            + " DATE_FORMAT(couponEndDate, '%Y-%m-%d') as couponEndDate, "
            + " FROM COUPON "
            + " WHERE id = ?";
    let params = [req.params.id];
    connection.query(sql, params,
      (err, rows, fields) => {
          res.send(rows);
          console.log(err);
      }  
    );
});

app.get('/api/coupon/:hash', (req, res) => {
    let sql = "SELECT C.spaceId, S.name as spaceName, couponCode, couponMenu "
            + " , DATE_FORMAT(couponEndDate, '%Y.%m.%d') as couponEndDate "
            + " , CASE WHEN NOW() > DATE_ADD(couponEndDate, INTERVAL 1 DAY) THEN TRUE ELSE FALSE END as isExpired "
            + " , CASE WHEN staffCheck IS NULL THEN FALSE ELSE TRUE END AS usedCoupon "
            + " , S.image "
            + " FROM COUPON as C "
            + " INNER JOIN SPACE as S "
            + " ON C.spaceId = S.id "
            + " WHERE C.hashCode = ?";
    let params = [req.params.hash];
    connection.query(sql, params,
      (err, rows, fields) => {
          res.send(rows);
          console.log(err);
      }  
    );
});

app.post('/api/coupons', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO COUPON (spaceId, couponCode, couponMenu, couponStartDate, couponEndDate, isDeleted, createdDate, hashCode) VALUES (?, ?, ?, now(), ?, 0, now(), ?)';
    // console.log('req.body.spaceId-'+req.body.spaceId)
    let spaceId = req.body.spaceId;
    let couponCode = req.body.couponCode;
    let couponMenu = req.body.couponMenu;
    // let couponStartDate = req.body.couponStartDate;
    let couponEndDate = req.body.couponEndDate;
    let hash = hashing.enc(couponCode+couponMenu+couponEndDate, salt);
    let params = [spaceId, couponCode, couponMenu, couponEndDate, hash];
    console.log(params);
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
            console.log(rows);
            console.log(err);
        }
    );
});

app.delete('/api/coupons/:id', (req, res) => {
    let sql = 'UPDATE COUPON SET isDeleted = 1, deletedDate = now() WHERE couponId = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log(err);
        }
    )
});

app.post('/api/coupons/update/:id', upload.single('image'), (req, res) => {
    let sql = 'UPDATE COUPON SET couponCode = ?, couponMenu = ?, couponEndDate = ?, hashCode=? WHERE couponId = ?';
    let hash = hashing.enc(req.body.couponCode+req.body.couponMenu+req.body.couponEndDate, salt);
    let params = [req.body.couponCode, req.body.couponMenu, req.body.couponEndDate, hash, req.body.couponId];
    console.log(params);
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log(rows);
            console.log(err);
        }
    )
});

app.post('/api/coupon/use', upload.single('image'), (req, res) => {
    let sql = 'UPDATE COUPON SET staffCheck = NOW() WHERE hashCode = ?';
    let hashCode = req.body.hashCode;
    let params = [hashCode];
    console.log(params);
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log(rows);
            console.log(err);
        }
    )
});

app.post('/api/coupon/staffcancel', upload.single('image'), (req, res) => {
    let sql = 'UPDATE COUPON SET staffCheck = NULL WHERE couponId = ?';
    let couponId = req.body.couponId;
    let params = [couponId];
    console.log(params);
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log(rows);
            console.log(err);
        }
    )
});

app.post('/api/coupon/confirmOffer', upload.single('image'), (req, res) => {
    let sql = 'UPDATE COUPON SET confirmOffer = NOW() WHERE couponId = ?';
    let couponId = req.body.couponId;
    let params = [couponId];
    console.log(params);
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log(rows);
            console.log(err);
        }
    )
});

app.post('/api/coupon/cancelOffer', upload.single('image'), (req, res) => {
    let sql = 'UPDATE COUPON SET confirmOffer = NULL WHERE couponId = ?';
    let couponId = req.body.couponId;
    let params = [couponId];
    console.log(params);
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log(rows);
            console.log(err);
        }
    )
});



app.listen(port, () => console.log(`Listening on port ${port}`));