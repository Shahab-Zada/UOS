import mongoose,{Schema} from 'mongoose';
const schema=new Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true,lowercase:true,trim:true},password:{type:String,required:true},role:{type:String,default:'student'}},{timestamps:true});
export default mongoose.models.User||mongoose.model('User',schema);
