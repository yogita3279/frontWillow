const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  price: {
    type: String,
    required:true
    
  },
  zipcode:{
    type: String,
    required:true  

  },
  garageSqft:{
    type: String,
    required:true  

  },
  basementSqft:{
    type: String,
    required:true  

  },
  finishedSqft:{
    type: String,
    required:true  

  },
  fullBaths:{
    type: String,
    required:true  

  },
  beds:{
    type: String,
    required:true  

  },
  lotSizeInSqft:{
    type: String,
    required:true  

  },
  yearBuilt:{
    type: String,
    required:true  

  },
  structureRemodelYear:{
    type: String,
    required:true  

  },
  hoa:{
    type: String,
    required:true  

  },
  address:{
    type: String,
    required:true  

  },
  location:{
    type: String,
    required:true  

  },
  phoneNumber:{
    type: String,
    required:true  

  },
  description:{
    type: String,
    required:true  

  },
  locality:{
    type: String,
    required:true  

  },  lat:{
    type: String,
    required:true  

  },  lng:{
    type: String,
    required:true  

  },

 
})

module.exports = mongoose.model('userSchema', userSchema)
