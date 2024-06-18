const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    phnNo:{type:Number,required:true,unique:true},
    password:{type:String,required:true},
    pic:{type:String,required:true,default:"https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623623_ERzQYfO4HHHyawYkJ16tREsizLyvcaeg.jpg"}
},{
    timestamps:true,
});



userSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});


const User=mongoose.model("User",userSchema);
module.exports=User;
