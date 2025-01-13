import mongoose from "mongoose";
import Mongoose ,{Scema} from "mongoose";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: true,

        },
        thumbnail: {
            type: String,
            required:true
        }
    },
    {
        timestamp: true
    }
)

export const Video = mongoose.model("Video", videoSchema)