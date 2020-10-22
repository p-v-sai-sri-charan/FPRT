import mongoose from "mongoose"
const Schema = mongoose.Schema
const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stared: {
    type: Boolean,
    default: false
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  userId:{
    type:mongoose.Schema.ObjectId,
    ref:'User'
  }
})

export default mongoose.model('Board', boardSchema)
