const { type } = require("os")
let {DataTypes,sequelize}=require("../lib/index2.js")


let user=sequelize.define("user",{
  name:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    unique:true,
    validate:{
      isEmail:true
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    }
  
  }
})

module.exports={user}