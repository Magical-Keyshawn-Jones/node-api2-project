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
        .then(object=>{
            const newPost = {}
            newPost.title = object.title
            newPost.contents = object.contents
            response.status(201).json(object)
        })
        .catch(err=>{
            console.log(err)
            response.status(500).json({ message: 'There was an error while saving the post to the database' })
        })
    }
})

// Returns Put changes
router.put('/posts/:id', async (req, res) => {
    // Storing values
    const { id } = req.params
    const { title, contents } = req.body
    const body = req.body
    const realPost = await Post.findById(id)

    // Testing for post/title/contents
    if (!realPost) {
        return res.status(404).json({ message: 'The post with the specified ID does not exist'})
    } else if ( title === undefined || contents === undefined ) {
        return res.status(400).json({ message: 'Please provide title and contents for the post'})
    }

    Post.update(id, body)
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'The post information could not be modified' })
    })
})

router.delete('/posts/:id', async (req, res) => {
    // Storing values
    const { id } = req.params
    const realPost = await Post.findById(id)

    // Checking for post existence
    if (!realPost) {
        return res.status(404).json({ message: 'The post with the specified ID does not exist'})
    }

    // Deleting Post
    Post.remove(id)
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'The post could not be removed' })
    })

})

// Grabbing comments
router.get('/posts/:id/comments', async (req, res) => {
    // Storing Values
    const { id } = req.params
    const realPost = await Post.findById(id)

    // Checking if post exists
    if (!realPost) {
        return res.status(404).json({ message: 'The post with the specified ID does not exist' })
    }

    Post.findCommentById(id)
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'The comments information could be retrieved'})
    })

})
module.exports = router