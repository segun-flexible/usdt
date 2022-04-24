const asyncHandler = require("../../helpers/asyncHandler")
const { createNewPackage, updatePackage, getAllPackages, deletePackageById } = require("../../helpers/packages")

exports.adminPackageListPost = asyncHandler(async (req, res, next) => {
    //Insert Package Into Db
    await createNewPackage(req.body);
    
    res.json({ status: true, message: "New Package Created!" })
    
})

//Package List
exports.adminPackageListGet = asyncHandler(async (req, res, next) => {
    const packages = await getAllPackages();

    res.render("admin/pages/plan", {
        title: "Plans",
        packages
    })
})


//EDIT PACKAGE
exports.adminPackageListPut = asyncHandler(async (req, res, next) => {

    await updatePackage(req.body,req.query.id)
    
    return res.send({status:true,message:"Package Updated"})
})


//DELETE PACKAGE CONTROLLER
exports.adminPackageListDelete = asyncHandler(async (req, res, next) => {
    await deletePackageById(req.query.id);
    res.send({ status: true, message: "Package Deleted" })
    
})