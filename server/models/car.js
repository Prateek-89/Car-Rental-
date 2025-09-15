import mongoose, { Mongoose } from "mongoose";
const{ObjectId}= mongoose.Schema.Types
const carSchema =new mongoose.Schema({
    owner :{ type:  ObjectId,ref:'User'},
    brand :{ type:  String,required:true},
    model :{ type:  String,required:true},
    image :{ type:  String,required:true},
    fuel_type :{ type:  String,required:true},
    transmission :{ type:  String,required:true},
    location :{ type:  String,required:true},
    description :{ type:  String,required:true},
    isAvailable :{ type:  Boolean,default:true},
    year :{ type: Number,required:true},
    category :{ type:String,required:true},
    seating_capacity :{ type:  Number,required:true},
    pricePerDay :{ type:Number,required:true},
},{timestamps:true})

const car=mongoose.model('Car',carSchema)

export default car