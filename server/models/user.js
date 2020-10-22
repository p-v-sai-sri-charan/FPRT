import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required:true,
    default:"user"
  },
  pic:{
    type:String,
    default:"https://res.cloudinary.com/slyde/image/upload/v1593166367/avatar-default_sgnvcm.png"
  }
})

export default mongoose.model('User', userSchema)
