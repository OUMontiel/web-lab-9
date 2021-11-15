const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Post = require('../model/post.js');

router.get('/', async (req, res) => {
  var posts = await Post.find()
  res.render('index', {posts});
});

router.get('/newPost', async (req, res) => {
  res.render('newPost');
});

router.post('/newPost', async (req, res) => {
  var post = new Post(req.body)
  await post.save()
  res.redirect('/')
})

router.get('/edit/:id', async (req, res) => {
  var id = req.params.id
  var posts = await Post.find()
  var post = posts.find(post => post._id == id)
  res.render('edit', {id, post})
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id
  var posts = await Post.find()
  var index = posts.findIndex((obj => obj.id == id))
  posts[index].title = req.body.title
  posts[index].author = req.body.author
  posts[index].post_data = req.body.post_data
  await posts[index].save()
  res.redirect('/')
})

router.get('/delete/:id', async (req, res) => {
  var id = req.params.id
  var posts = await Post.find()
  var post = posts.find(post => post._id == id)
  res.render('delete', {id, post})
})

router.post('/delete/:id', async (req, res) => {
  var id = req.params.id
  await Post.remove({_id: id})
  res.redirect('/')
})

module.exports = router;
