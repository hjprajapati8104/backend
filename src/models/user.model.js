import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
      username : {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
            index: true
        },
        username : {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
            index: true
        },
        fullname : {
            type: String,
            required: true,
           
            trim: true,
            index: true
        },
        email : {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
           
        },
        avtar: {
            type: String,
            required: true,  
        },
        coverImage: {
            type: String,//cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String,
        },
       
    },
    {
        timestamps:true
    },
)

export const User = mongoose.model("User", userSchema)