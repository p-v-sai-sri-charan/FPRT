import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    cardtext:{
        type:String,
        required:true
    },
},{timestamps:true})

export default mongoose.model("Cards", CardSchema);
