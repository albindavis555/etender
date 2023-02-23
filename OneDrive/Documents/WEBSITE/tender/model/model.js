const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    WARD:{
        type:String,
    },
    ID:{
        type:String,
    },
    PROJECT:{
        type:String,
    },
    SBD_PREPARATION:{
        type:String,
    },
    TENDER_PUBLISHED:{
        type:String,
    },
    TENDER_OPEN:{
        type:String,
    },
    POST_TENDER:{
        type:String,
    },
    TENDER_NEGOTIATION:{
        type:String,
    },
    LOA_PREPARATION:{
        type:String,
    },
    AGREEMENT_APPROVED:{
        type:String,
    },
    EMD_RELEASE:{
        type:String,
    },
    SITE_HANDOVER:{
        type:String,
    },
    BIDDER:{
        type:String,
    },
});

module.exports = mongoose.model('User',UserSchema);

 