'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');

// router.get('/', function(req, res, next) {
//   res.render('index');
// });



router.get('/', function(req, res, next) {
  models.Post.findAll().then(function(records) {
    res.render('index', {
      records: records
    });
  });
});

router.get('/school', function(req, res, next) {
  console.log(req.qurey)
  res.render('school', {
  name: req.query.name,
  lastname: req.query.lastname});
});

router.post('/school2', function(req, res, next) {
  console.log(req.body);
  res.render('school', {name: req.body.name,lastname:req.body.lastname});
});

router.post('school3', function(req, res, next) {
  console.log(req.body);
  res.render('school', {name: req.body.name,
  lastname: req.body.lastname});
});

router.get('/posts', function(req, res, next) {
  models.Post.findByPk(req.query.id).then(function(record) {
    res.render('post', {
      record: record
    });
  });
});

router.get('/new-post', function(req, res, next){
  res.render('new-post.ejs');
});



router.post('/new-post', function(req, res, next){
  models.Post.create({
    from: req.body.from,
    title: req.body.title,
    full_text: req.body.full_text
  }).then(function(record) {
    res.redirect(`/posts?id=${record.id}`);
  });
});

router.get('/logout', function(req,res,next){
  req.logout();
  req.flash('info', 'You have been logged out.');
  res.redirect('/');
});

module.exports = router;
