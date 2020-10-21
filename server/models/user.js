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
    required:true
  }
})

export default mongoose.model('User', userSchema)
