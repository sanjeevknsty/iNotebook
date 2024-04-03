const express = require('express')
const schemaUser = require('../models/user')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')



const SEC_PASS = "Sanjeev@10"

router.post('/createuser',
  [
    body('name', 'Enter Valid Name').isLength({ min: 3 }),
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Enter Vaid Password').isLength({ min: 5 })
  ], async (req, res) => {
    try {
      let success = false

      console.log(req.body)
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
      }


      const userEmail = await schemaUser.findOne({ email: req.body.email })
      if (userEmail) {
        return res.status(400).json({ success, error: "Email already Exists" })
      }

      const salt = await bcrypt.genSalt(10)

      const secPass = await bcrypt.hash(req.body.password, salt)

      let user = await schemaUser.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      })
      // res.send(user)
      const data = {
        userId: {
          id: user.id
        }
      }
      const jwtToken = jwt.sign(data, SEC_PASS)
      success = true
      res.send({ success, jwtToken })
    }
    catch (error) {
      res.status(500).send("Error Occured")
      console.error(error.message)
    }

    // .then((user)=>{
    //   res.json(user)
    // }).catch(err => {
    //   console.log(err)
    //   res.json({error : 'Email already Exists',message : err.message})
    // })


  })



router.post('/login',
  [
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Enter Vaid Password').isLength({ min: 5 })
  ], async (req, res) => {

    let success = false
    console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      const user = await schemaUser.findOne({ email })
      if (!user) {
        return res.status(400).send({ success, error: "Enter Valid Details,Email" })
      }
      const verifyPassword = await bcrypt.compare(password, user.password)
      if (!verifyPassword) {
        return res.status(400).send({ success, error: "Enter Valid Details,Password" })
      }
      const data = {
        userId: {
          id: user.id
        }
      }
      const jwtToken = jwt.sign(data, SEC_PASS)
      success = true
      res.send({ success, jwtToken })
    } catch (error) {
      res.status(500).send("Error Occured")
      console.error(error.message)
    }

  })



router.post('/getUser', fetchUser, async (req, res) => {

  try {
    userId = req.user.id
    const user = await schemaUser.findById(userId).select('-password')
    res.send(user)

  } catch (error) {
    res.status(500).send("Error Occured auth")
    console.error(error.message)
  }

})

module.exports = router