import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
title:{
    type:String,
    required:true
},
rating:{
    type:String,
    required:true
},
imgUrl:{
    type:String,
    required:true,
},
caption:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
}
},{
    timeseries:true
});


const review = mongoose.model("Review", reviewSchema);


export default review;