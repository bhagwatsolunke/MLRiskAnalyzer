const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        default:""
    },
    designation:{
        type: String,
        default:""
        },
    email:{
        type: String,
        required: true,
        unique: true
    },
    organization:{
        type: String,
        default:""
    },
    location:{
        type:String,
        default:""
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    watchlist:{
        type:Array,
        default:[]
     },
  });

  const User = mongoose.model('user', UserSchema);
  module.exports = User;