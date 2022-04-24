const asyncHandler = require("../../../helpers/asyncHandler");
const { saveSettings } = require("../../../helpers/settings");
const fs = require("fs");

//WEB SETTINGS
exports.adminWebSettingsGet = asyncHandler(async (req, res, next) => {
    res.render("admin/pages/settings/webSettings", {
        title: "Web Settings"
    })
})

//SOCIAL SETTINGS
exports.adminSocialSettingsGet = asyncHandler(async (req, res, next) => {
    res.render("admin/pages/settings/socialSettings", {
        title: "Social Media Settings"
    })
})

//RECURRING SETTINGS
exports.adminRecurringSettingsGet = asyncHandler(async (req, res, next) => {
    res.render("admin/pages/settings/recurringSettings", {
        title: "Recurring Settings"
    })
})

//WITHDRAWAL SETTINGS
exports.adminWithdrawalSettingsGet = asyncHandler(async (req, res, next) => {
    res.render("admin/pages/settings/withdrawalSettings", {
        title: "Withdrawal Settings"
    })
})

//REFERRAL SETTINGS
exports.adminReferralSettingsGet = asyncHandler(async (req, res, next) => {
    res.render("admin/pages/settings/referralSettings", {
        title: "Referral Settings"
    })
})

//IDENTITY SETTINGS
exports.adminIdentitySettingsGet = asyncHandler(async (req, res, next) => {
    res.render("admin/pages/settings/identitySettings", {
        title: "Identity Settings"
    })
})


//ADMIN SETTING SAVED (POST)
exports.adminSettingsPost = asyncHandler(async (req, res, next) => {
    if (!req.imageName) {
      await saveSettings(req.body);  
    } else {

        await req.files.forEach(async img => {
            
            await saveSettings({[img.fieldname]:""}); 
            await saveSettings({ [img.fieldname]: `/img/identity/${img.filename}` });
            
        });
        
        
    }
    
    return res.json({status:true,message:"Changes Saved"})
})