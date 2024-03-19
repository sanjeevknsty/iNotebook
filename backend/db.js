
const mongoose =  require('mongoose')
const URI = 'mongodb://localhost:27017/iNoteBook'


const connectionToMongoose = ()=>{
  mongoose.connect(URI).then(()=>{
    console.log("connected to Mongo")
  }).catch((err)=>{
    console.log(err)
  })

}


module.exports = connectionToMongoose