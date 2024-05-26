const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  afterAccuracy:{
    type:String,
    default:"",
  },
  beforeAccuracy:{
    type:String,
    default:"",
  },
  time:{
    type:String,
    default:"",
  },
  scores: [{
    origin: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    }
  }]
});

const CompanyAnalysisSchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
      unique: true,
    },
    companyname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
    },
    symbol: {
      type: String,
      maxlength: 15,
      default: "",
    },
    sentimentScore: {
      type: String,
      default: "",
    },
    modelScores: {
      type: [ScoreSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CompanyAnalysis", CompanyAnalysisSchema);

