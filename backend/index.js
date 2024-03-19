const connectionToMongoose = require('./db')
const express = require('express')
connectionToMongoose()
const app = express( ) 
app.use(express.json())


// console.log(authRoute)

// app.get('/',(req,res)=>{
//   res.send('Hello World')
// })
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/note',require('./routes/note.js'))

app.listen(8000,()=>{
  console.log('listening')
})
