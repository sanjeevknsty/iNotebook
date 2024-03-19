const mongoose =  require('mongoose')
const validator = require('validator');

const Schemas = new mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    unique : true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Enter valid Email")
      }
    }
  },
  password : {
    type : String,
    required : true,
  },
  setValue : {
    type : Number,
    // validate(value){
    //   if (value < 0){
    //     throw new Error("Enter valid Number")
    //   }
    // }
    }
  
})
const MongooseModel = mongoose.model('user',Schemas)
module.exports =MongooseModel