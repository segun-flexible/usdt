const asyncHandler = require("../../../helpers/asyncHandler");
const { getDateFormatForPost, extractTime } = require("../../../helpers/dateTime");
const {  getUserReferralHistory } = require("../../../helpers/history");
const { openToken } = require("../../../helpers/jwt");
const { getNextOffset, paginateData } = require("../../../helpers/pagination");

exports.userReferralHistoryGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    const limit = req.query.limit || parseInt(process.env.LIMIT),currentPage = parseInt(req.query.page)|| 1;
    
    //Pagination VAR
    let paginationArr,link,prevBtn = null, nextBtn = null;

    const history = await getUserReferralHistory("", id, limit, getNextOffset(currentPage, limit), "ASC");
    
    await history.map(h => {
        h.time = extractTime(h.created_at,"hh:mm A");
        h.date = getDateFormatForPost(h.created_at)
    });

    //Pagination
    const pageData = await getUserReferralHistory("", id, 9999999999, 0, "ASC");
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
    link = `/user/referral?`

    res.render("user/pages/history/referralHistory", {
        title: "Refer And Earn",
        history,
        paginationArr,
        link,
        currentPage,
        prevBtn,
        nextBtn
    })
})