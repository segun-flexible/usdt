const asyncHandler = require("../../helpers/asyncHandler");

exports.homePage = asyncHandler(async (req, res, next) => {
    
    res.redirect("/user/dashboard")
})

