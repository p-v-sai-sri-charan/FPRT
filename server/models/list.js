import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    card:[{ type: Schema.Types.ObjectId, ref: "Cards" }],
},{timestamps:true})

export default mongoose.model("List", BoardSchema);
