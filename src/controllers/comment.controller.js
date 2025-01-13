import mongoose from "mongoose";
import {Comment} from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async(req, res) => {
    //TODO: get all comments for a Video

    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
})

const addComment = asyncHandler(async(req, res) => {
    //TODO:add a comment to a video
})

const updateComment = asyncHandler(async(req, res) =>{
    //TODO: update the comment
})
const deleteComment = asyncHandler(async(req, res) =>{
    //TODO: delete the comment
})
export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}
