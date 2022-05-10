// implement your server here
// require your posts router and connect it here

// Importing express from express
// Importing postRouter from our created router from posts folder
const express = require('express')
const postsRouter = require('./posts/posts-router')

// Storing express inside of server variable
const server = express()

// invoking servers to use
server.use(express.json())
server.use('/api', postsRouter)

// server.use('/api', postsRouter) === server.use('/api/postRouter url', postRouter function)

// Exporting our server
module.exports = server