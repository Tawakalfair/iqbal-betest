import mongoose from 'mongoose';
 
// Buat Schema
const User = mongoose.Schema({
    userName:{
        type: String,
        unique:true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    accountNumber:{
        type: Number,
        unique:true,
        required: true
    },
    emailAddress:{ 
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
      },
    identityNumber:{
        type:Number,
        required:true,
        unique:true
    }
});
 

export default mongoose.model('Users', User);