const express = require('express')
const bodyparser = require('body-parser')
// const mongoose = require('mongoose')
// const cors = require('cors')
var path = require('path')
const app = express()

// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost:27017/posts');
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error"));
// db.once("open", function(callback){
//   console.log("Connection Successful");
// });

app.use(bodyparser.json())
// app.use(cors())
app.use(express.static(path.join(__dirname, 'src')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/index.html'));
})
app.get('/*', (req, res) => {
    res.redirect('/')
})

let port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Listenning on port ${port}`)
})