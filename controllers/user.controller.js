import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const userRegister = async (req, res) => {
  const { username, email, fullname, password } = req.body;

  if (!username || !email || !password || !fullname) {
    throw new ApiError(400, "All fields are require");
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existedUser)
    throw new ApiError(409, "username and password already exist");

  console.log("req.files", req.files);

  const avatarlocalpath = req.files?.avatar[0]?.path;
  const coverimagelocalpath = req.files?.coverImage[0]?.path;
  if (!avatarlocalpath) throw new ApiError(400, "avatar is require");

  const avatarResponse = await uploadOnCloudinary(avatarlocalpath);
  const coverImageResponse = await uploadOnCloudinary(coverimagelocalpath);

  if (!avatarResponse) throw new ApiError(400, "avatar is require again");

  const user = await User.create({
    fullname,
    avatar: avatarResponse?.url,
    email,
    password,
    username,
    coverImage: coverImageResponse?.url,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser)
    throw new ApiError(500, "something went wrong while registering the user");

  return res.status(201).json(new ApiResponse(200, createdUser, "ok"));
};

export { userRegister };
