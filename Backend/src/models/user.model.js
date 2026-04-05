const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is mandatory"],
        minlength: 3,
        maxlength: 25,
        trim: true
    },
    email:{
        type:String,
        unique:[true,"Email should be unique"],
        required:[true,"email is required"],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },
    password:{
        type:String,
        required:[true,"password is mandatory"],
        minlength: 6
    },
    phoneno:{
        type:String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }},{
        timestamps:true
    }
);
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    const bcrypt = require("bcrypt");
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

UserSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const usermodel=mongoose.model("users",UserSchema);

module.exports=usermodel;