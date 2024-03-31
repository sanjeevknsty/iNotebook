const express = require('express')
const fetchUser = require('../middleware/fetchUser')
// const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const schemaNotes = require('../models/notes')
const { default: userEvent } = require('@testing-library/user-event')

const router = express.Router()

router.get('/fetchAllNotes', fetchUser, async (req, res) => {

  try {
    const note = await schemaNotes.find({ user: req.user.id })
    res.json(note)
  } catch (error) {
    res.status(500).send("Error Occured")
    console.error(error.message)
  }
})


router.post('/addNotes', fetchUser, [
  body('tittle', 'Enter Valid Tittle').isLength({ min: 3 }),
  body('description', 'Enter More Than 5 Letters').isLength({ min: 5 }),
], async (req, res) => {
  const { tittle, description, tags, email } = req.body

  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array()})
    }
    const note = new schemaNotes(
      { tittle, description, tags, email, user: req.user.id })
    const result = await note.save()
    res.json(result)
  } catch (error) {
    res.status(500).send("Error Occured")
    console.error(error.message)
  }

})


router.put('/updateNotes/:id', fetchUser, [
  body('tittle', 'Enter Valid Tittle').isLength({ min: 3 }),
  body('description', 'Enter More Than 5 Letters').isLength({ min: 5 }),
  body('tags')
], async (req, res) => {
  const { tittle, description, tags } = req.body

  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array()})
    }
    let note = await schemaNotes.findById(req.params.id)

    const newNote = 
      { tittle, description, tags}
    if(note.user.toString() !== req.user.id){
      return res.status(500).send("Error Occured,No user")
    }
    note = await schemaNotes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note)
    
  } catch (error) {
    // console.error(error.message)
    return res.status(500).send("Error Occured")
  }

})


router.delete('/DeleteNotes/:id', fetchUser, async (req, res) => {

  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array()})
    }
    let note = await schemaNotes.findById(req.params.id)
 
    if(note.user.toString() !== req.user.id){
      return res.status(500).send("Error Occured")
    }
    note = await schemaNotes.findByIdAndDelete(req.params.id)
    res.json({message : "Success",note : note})
    
  } catch (error) {
    res.status(500).send("Error Occured")
    console.error(error.message)
  }

})

module.exports = router