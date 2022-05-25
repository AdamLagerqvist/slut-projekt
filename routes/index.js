var express = require('express');
var session = require('express-session');
var bcrypt = require('bcrypt');
const pool = require('../database');
var router = express.Router();

var linkify = require('linkify-it')();

var md = require('markdown-it')()
            .disable([ 'link', 'image' ])
            .enable([ 'link' ])
            .enable('image');

md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
});

md.linkify.set({ fuzzyEmail: false });  // disables converting email to link

var responses = [
    "Wrong username or password.",
    "Username already exists",
    "Passwords do not match",
    "lol easter egg"
]


router.post('/register', async function (req, res, next) {
    const username = req.body.user;
    const password = req.body.password;
    if (password != req.body.password2) {
        return res.status(500).redirect("/register?response=2");
    }
    bcrypt.hash(password, 10, async function (err, hash) {

        await pool.promise()
            .query('INSERT INTO admlat_login (user, password) VALUES (?,?)', [username, hash])
            .then(async ([rows, fields]) => {
                await pool.promise()
                .query('SELECT id FROM admlat_login WHERE user = ?', [username])
                .then(([rows, fields]) => {
                    console.log(rows[0])
                    req.session.user = rows[0];
                    req.session.username = username;
                    res.redirect("/secret");
                }).catch(err => {
                    console.log(err)
                    res.status(500).redirect("/register?response=1");
                });
            }).catch(err => {
                console.log(err)
                res.status(500).redirect("/register?response=1");
            });

    });
})
/* GET users listing. */
router.post('/login', async function (req, res, next) {

    const username = req.body.user;
    const password = req.body.password;

    await pool.promise()
        .query('SELECT * FROM admlat_login WHERE user = ?', [username])
        .then(([rows, fields]) => {

            const user = rows[0];

            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {

                    if (result) {
                        req.session.user = user.id;
                        req.session.username = username;

                        return res.redirect("/secret");
                    } else {
                        res.status(500).redirect("/login?response=0");
                    }

                });

            } else throw "error";

        })
        .catch(err => {
            res.status(500).redirect("/login?response=0");
        });
});

router.get('/test', function (req, res, next) {
    let password = req.query.password;
    bcrypt.hash(password, 10, function (err, hash) {
        res.send(hash);
    });
});

router.post('/logout', function (req, res, next) {
    req.session.user = null;
    req.session.username = null;
    res.redirect("/login");
});

router.get('/content/:page', async function (req, res, next) {
    await pool.promise()
        .query('SELECT admlat_posts.id, admlat_posts.heading, admlat_posts.description, admlat_login.`user` FROM admlat_posts INNER JOIN admlat_login ON admlat_posts.uid=admlat_login.id;')
        .then(([rows, fields]) => {
            let page = req.params.page;
            console.log(page);
            let lastPage = Math.trunc(rows.length/6);
            let lastPageItems = rows.length % 6;
            if(lastPageItems != 0){
                lastPage++;
            }
            if(page > lastPage){ page = lastPage }
            if(page < 1){ page = 1 }
            if(page != lastPage){
                var items = rows.slice((page-1) * 6, page * 6 - 1);
            }else{
                var items = rows.slice((page-1) * 6, rows.length);
            }
            res.render('index.njk', { title: 'Homepage', user: req.session.username, posts: items, lastPage: lastPage, page: page, nextPage: (page-0+1), prevPage: (page-1)});
        })
        .catch(err => {
            console.log(err)
            res.status(500).redirect("/index.njk");
        });
});

router.get('/', async function (req, res, next) {
    res.redirect("/content/1");
});

router.get('/login', function (req, res, next) {
    res.render('login.njk', { title: 'login', response: responses[req.query.response] || null, user: req.session.user });
});

router.get('/secret', function (req, res, next) {
    if (!req.session.user) return res.redirect("/login");
    res.render('secret.njk', { title: 'secret', user: req.session.username });
});

router.get('/register', function (req, res, next) {
    res.render('register.njk', { title: 'register', response: responses[req.query.response] || null, user: req.session.username });
});

router.post('/post', async function (req, res, next) {
    
    await pool.promise()
        .query('INSERT INTO admlat_posts (uid, heading, full_text, description) VALUES(?, ?, ?, ?)', [req.session.user, req.body.heading, req.body.fullText, req.body.description])
        .then(([rows, fields]) => {
            res.status(500).redirect("/secret");
        })
        .catch(err => {
            console.log(err)
            res.status(500).redirect("/secret");
        });
});

router.get('/fullPost/:id', async function (req, res, next) {
    
    let result;
    let uid;
    let nextid = undefined;
    let previd = undefined;
    let post;

    await pool.promise()
        .query('SELECT * FROM admlat_posts INNER JOIN admlat_login ON admlat_posts.uid=admlat_login.id WHERE admlat_posts.id = ?', [req.params.id])
        .then(([rows, fields]) => {
            result = md.render(rows[0].full_text)
            uid = rows[0].uid;
            post = rows[0];     
        })
        .catch(err => {
            console.log(err)
            return;
        });
        await pool.promise()
        .query('SELECT * FROM admlat_posts WHERE uid = ?', [uid])
        .then(([rows, fields]) => {
            rows.forEach(row => {
                if(row.id - req.params.id < 0 && (row.id > previd || previd == undefined)){
                    previd = row.id;
                }
                if(row.id - req.params.id > 0 && (row.id < previd || nextid == undefined)){
                    nextid = row.id;
                }
            });
        })
        .catch(err => {
            console.log(err)
            return;
        });
        console.log(post);
        res.render('fullPost.njk', { markdownHtml: result, post: post, user: req.session.username, nextid: nextid, previd: previd})
});

router.post('/delete/:id', async function (req, res, next) {
    
    let is_valid_user;

    await pool.promise()
        .query('SELECT * FROM admlat_posts INNER JOIN admlat_login ON admlat_posts.uid=admlat_login.id WHERE admlat_posts.id = ?', [req.params.id])
        .then(([rows, fields]) => {
            is_valid_user = (rows[0].user == req.session.username);
            console.log(rows[0])
            console.log(is_valid_user)
            console.log(rows[0].user)
            console.log(req.session.username)
        })
        .catch(err => {
            console.log(err)
        });
        if(is_valid_user){
        await pool.promise()
            .query('DELETE FROM admlat_posts WHERE id = ?', [req.params.id])
            .then(([rows, fields]) => {
                
            })
            .catch(err => {
                console.log(err)
            });
        }
        res.redirect("/")
});

module.exports = router;
