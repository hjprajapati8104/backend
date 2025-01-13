import { asyncHandler} from "../utils/asyncHandler";


const registerUser = asyncHandler(async(req, res) => {
    //get user details from user
    //validation - not empty
    //check if user already existed: username, email
    //if available upload them to cloudinary, avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response
    
    const { fullName, email, username, password} =req.body;
    console.log("email:", email);
    //validation
    //basic code 
    //if(fullName === ""){
    //  throw new ApiError(400,"fullname is Required");
    //}

    //advanced code 
    if(
        [fullName, email, username, password].some((field) => field.trim() === "")
    ){
        throw new ApiError(400, "All fields are required");
    }

    //check if user already exists: username, email
    const existedUser = await UserActivation.findOne({
        $or: [{username}, {email}],
    });

    if(existedUser){
        throw new ApiError(400, "username or email is already exists");

    }
    //check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path; //todo:log this req.files
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(
        req.files &&
        Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 
    ){
        coverImageLocalPath = req.files.coverImage;
    }

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required"
        );
    }
    //create user object create entry in db
    const user = await UserActivation.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    });
    //remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registring the user");
    }
    return res
    .status(201)
    .json(new ApiResponse(200, createdUser,"User Registered Successfully"));
});

const loginUser =  asyncHandler(async(req, res) => {
    //req body -> data
    //username or email
    //find the user 
    //check password
    //if password correct, provide access and refresh tokens
    //send cookies

    const { email, username, password} = req.body;

    if(!(username || email)){
        throw new ApiError(400, "Username or email is required");
    }
    const user = await User.findOne({
        $or: [{username}, {email}],
    });
    if(!user){
        throw new ApiError(404, "User does not exists");
    }
    await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid user credentials");
    }
    const{accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
            .json(new ApiResponse(200, {}, "User Logged Out"));
});
const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave :false});

        return{accessToken, refreshToken};
    }catch(error){
        throw new ApiError(500, "Something went wrong while generating Refresh And Access Tokens");
    }
};
export{registerUser, loginUser,};