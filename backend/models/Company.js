const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    companyname:{
        type:String,
        require:true,
        minlength:3,
        maxlength:200,
        unique:true,
    },
    industry: {
      type: String,
      max: 500,
      default:""
    },
    symbol:{
      type:String,
      max:15,
      unique : true,
      default:""
    },
    listingDate:{
      type:String,
      default:""
    },
    founded:{
      type:String,
      default:""
    },
    listed:{
      type:String,
      default:""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);