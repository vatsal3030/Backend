import asyncHandler from "../utils/asyncHandler";

export const verifyJwt = asyncHandler(async (req, resizeBy, next) => {
    req.cookies?.accessToken || req.header("Authorization")
})