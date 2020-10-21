import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
    boardname:{
        type:String,
        required:true,
        trim:true
    },
    list:[{ type: Schema.Types.ObjectId, ref: "List" }],
},{timestamps:true})

export default mongoose.model("Board", BoardSchema);
