var mongoose = require('mongoose')
var connectionString = 'mongodb://Jasper:2324dragon@ds117469.mlab.com:17469/kanban-fun' //Jasper Server
//var connectionString = 'mongodb://Jasper:student@ds133550.mlab.com:33550/kanban' //Jasper Server
var connection = mongoose.connection

mongoose.connect(connectionString)

connection.on('error', err=>{
  console.log('ERROR FROM DATABASE: ', err)
})

connection.once('open', ()=>{
  console.log('Connected to Database')
})