import mongoose from "mongoose"
const Schema = mongoose.Schema

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: Number
  },
  boardId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Board'
  },
  items: [{
    type: mongoose.Schema.ObjectId,
    ref: 'TableItem'
  }]
})

export default mongoose.model('Table', tableSchema)
