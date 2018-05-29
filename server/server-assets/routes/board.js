let router = require('express').Router()
var Board = require('../models/board')

//GET BY ID
router.get('/api/boards/:id', (req, res, next)=>{
    Board.findById(req.params.id)
      .then(board =>{
        res.status(200).send(board)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })
  
  //ADD
  router.post('/api/boards/', (req, res, next) => {
    var board = req.body
    Board.create(board)
      .then(newBoard => {
        res.status(200).send(newBoard)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })
  
  //EDIT
  router.put('/api/boards/:id', (req, res, next) => {
    Board.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(board => {
        res.status(200).send({message: "Successfully Updated", board})
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })
  
  //DESTROY
  router.delete('/api/boards/:id', (req, res, next)=>{
    Board.findByIdAndRemove(req.params.id)
      .then(data=>{
        res.send("Successfully Deleted board")
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })









module.exports = {
    router
  }