// implement your posts router here

// Importing Functions from posts model
const Post = require('./posts-model')

// Importing our express
const express = require('express')

// Creating a router
const router = express.Router()

// Grabs all of the post objects
router.get('/posts', (request, response) => {
    Post.find()
    .then(object => {
        response.status(200).json(object)
    })
    .catch(err=>{
        console.log(err)
        response.status(500).json({ message: 'The posts information could not be retrieved' })
    })
})

// Returns specified posts
router.get('/posts/:id', (request, response) => {
    const { id } = request.params
    Post.findById(id)
    .then(object => {
        // Checking post existence
        if (object) {response.status(200).json(object)}
        else {response.status(404).json({ message: 'The post with the specified ID does not exist'})}
    })
    .catch(err => {
        console.log(err)
        response.status(500).json({ message: 'The post information could not be retrieved' })
    })
})

// Posting/Adding a new object to the server
router.post('/posts', (request, response) => {
    // Storing title and comment inside variables
    // the body holds the object that we send or receive
    const contents = request.body.contents
    const title = request.body.title
    const body = request.body
    
    if (contents === undefined || title === undefined) {
        response.status(400).json({message: 'Please provide title and contents for the post'})
    } else { 

        Post.insert(body)
        .then(object=>{response.status(201).json(object)})
        .catch(err=>{
            console.log(err)
            response.status(500).json({ message: 'There was an error while saving the post to the database' })
        })
    }
})

// Returns Put changes
router.put('/posts/:id', (request, response) => {
    // Storing body inside changes variable
    const changes = request.body
    const { id } = request.id
    Post.update(id, changes)
    .then(object => {
        if (object) {
            response.status(200).json(object)
        } else {
            response.status(404).json({ message: 'The post with the specified ID does not exist'})
        }
    })
    .catch( err => {
        console.log(err)
        response.status(500).json({ message: 'The post information could not be modified'})
    })
})

module.exports = router