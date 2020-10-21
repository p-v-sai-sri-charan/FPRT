import mongoose from "mongoose"
const Schema = mongoose.Schema

const tableItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  position: {
    type: Number
  },
  tableId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Table'
  }
})

export default mongoose.model('TableItem', tableItemSchema)
