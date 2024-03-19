const mongoose =  require('mongoose')


const Schemas = new mongoose.Schema({
  user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'user'
  },
  tittle : {
    type : String,
    required : true,
  },
  description : {
    type : String,
    required : true,
  },
  // email : {
  //   type : String,
  //   validate(value){
  //     if(!validator.isEmail(value)){
  //       throw new Error("Enter valid Email")
  //     }
  //   }
  // },
  tags : {
    type : String,
    // validate(value){
    //   if (value < 0){
    //     throw new Error("Enter valid Number")
    //   }
    // }
    }
  
})
const MongooseModel = mongoose.model('notes',Schemas)
module.exports =MongooseModel