const asyncHandler = require("../../helpers/asyncHandler");
const { getDateFormatForPost, extractTime } = require("../../helpers/dateTime");
const { insertIntoSubHistory } = require("../../helpers/history");
const { openToken } = require("../../helpers/jwt");
const { getNextOffset, paginateData } = require("../../helpers/pagination");
const { getProofs, deleteProofById } = require("../../helpers/proof");
const { getUniqueID } = require("../../helpers/uniqueID");
const { editUserById } = require("../../helpers/user");
const fs = require("fs");
const path = require("path");

exports.adminProofGet = asyncHandler(async (req, res, next) => {
    const limit = req.query.limit || parseInt(process.env.LIMIT),currentPage = parseInt(req.query.page)|| 1;
    
    //Pagination VAR
    let paginationArr,link,prevBtn = null, nextBtn = null;

    const history = await getProofs(limit, getNextOffset(currentPage, limit));
    
    await history.map(h => {
        h.time = extractTime(h.pr_created_at,"hh:mm A");
        h.date = getDateFormatForPost(h.pr_created_at)
    });

    //Pagination
    const pageData = await getProofs(9999999999, 0);
    paginationArr = paginateData(limit, pageData.length);
  
    //Prev
    if (currentPage > 1) {
        prevBtn = currentPage - 1;
    }

    //Next
    if (currentPage !== "" && paginationArr[paginationArr.length - 1] > currentPage) {
        nextBtn = currentPage + 1
    };

    //Pagination Link
    link = `/admin/proof?`

    res.render("admin/pages/proof", {
        title: "Proof History",
        history,
        link,
        prevBtn,
        nextBtn
    })
})


exports.adminProofPut = asyncHandler(async (req, res, next) => {

    
    if (req.body.type === "mark_all") {
        
        await req.body.data.map(async d => {
            
            //Change Status To Done
            await editUserById(d.userId, { 
                plan_id: d.planId, 
                plan_name: d.planName,
                p_daily_withdrawal_limit: 0,
                p_total_withdrawal_limit: 0
            });

            await insertIntoSubHistory({
                ref: "TRX" + getUniqueID(),
                amount: d.planPrice,
                plan_name: d.planName,
                plan_id: d.planId,
                user_id: d.userId
            });

            //Delete Proof
            await deleteProofById(d.id)

            fs.unlinkSync(path.join(__basedir,"public",d.proof))

            
        });

        //Response To User
        res.json({status:true,message:`Good Job, You Completed ${req.body.data.length} Upgrades`});

        

    }
    //One By One Approved
    else {
        
        //Change Status To Done
        await editUserById(req.body.userId, { 
            plan_id: req.body.planId, 
            plan_name: req.body.planName,
            p_daily_withdrawal_limit: 0,
            p_total_withdrawal_limit: 0
        });

        await insertIntoSubHistory({
            ref: "TRX" + getUniqueID(),
            amount: req.body.planPrice,
            plan_name: req.body.planName,
            plan_id: req.body.planId,
            user_id: req.body.userId
        });

        
        //Delete Proof
        await deleteProofById(req.body.id)

        //Response To User
        res.json({ status: true, message: `Good Job, You Completed This Upgrade` });

        fs.unlinkSync(path.join(__basedir,"public",req.body.proof))
        
    }

})

exports.adminProofDelete = asyncHandler(async (req, res, next) => {

    
    if (req.body.type === "mark_all") {
        
        await req.body.data.map(async d => {
            

            //Delete Proof
            await deleteProofById(d.id)

            fs.unlinkSync(path.join(__basedir,"public",d.proof))
        });

        //Response To User
        res.json({status:true,message:`${req.body.data.length} Upgrades Deleted`});

        

    }
    //One By One Approved
    else {
        //Delete Proof
        await deleteProofById(req.body.id)

        //Response To User
        res.json({ status: true, message: `Upgrade Deleted` });

        fs.unlinkSync(path.join(__basedir,"public",req.body.proof))
        
    }

})