// var express = require('express');
// var router = express.Router();
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// module.exports = router;
let express = require('express');
let router = express.Router();

let mysql = require('mysql');

let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'keeping_accounts'
});

let sql = 'SELECT * from users';

router.get('/', function (req, res, fields) {
    pool.getConnection(function (err, conn) {
        console.log('pool.getConnection -> err', err)
        if (err) {
            res.send(JSON.stringify({
                code: '400',
                status: 0,
                remark: '服务器异常',
                message: null,
                data: null
            }))
        } else {
            conn.query(sql, function (qerr, vals, fields) {
                console.log('conn.query -> err', qerr)
                if (qerr) {
                    res.send(JSON.stringify({
                        code: '500',
                        status: 0,
                        remark: '获取用户列表',
                        message: '请求失败',
                        data: null
                    }))
                }
                conn.release();
                res.send(JSON.stringify({
                    code: '200',
                    status: 1,
                    remark: '获取用户列表',
                    message: '请求成功',
                    data: vals
                }))
            })
        }
    })
})

module.exports = router
