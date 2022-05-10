// require your server and launch it here

// Importing server from api folder
const server = require('./api/server')

// Declaring our Port
const port = 9000

// Initializing server
server.listen(port, () => {
    // Console logging when server is up and running
    console.log(`Server is Running on Port ${port}`)
})