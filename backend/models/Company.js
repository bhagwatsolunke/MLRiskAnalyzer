const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    companyname:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
    industry: {
      type: String,
      max: 500,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);