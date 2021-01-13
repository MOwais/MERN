const mongoose = require('mongoose');

const Profile = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    company:{
        type: String
    },
    website:{
        type: String
    },
    location:{
        type: String
    },
    status:{
        type: String
    },
    skills:{
        type:[String],
        required:true
    },
    githubusername:{
        type: String
    },
    experience:[
        {
            title:{
                type: String,
                required: true
            },
            company:{
                type: String,
                required:true
            },
            location:{
                type: String
            },
            to:{
                type: Date
            },
            from:{
                type: Date
            },
            current:{
                type: Boolean,
                required:true
            }
        }
    ],
    education:[
        {
            degree:{
                type: String
            },
            to:{
                type: Date
            },
            from:{
                type: Date
            },
            current:{
                type: Boolean,
                required:true
            }
        }
    ],
    social:[
        {
            twitter:{
                type: String
            },
            youtube:{
                type: String
            },
            facebook:{
                type: String
            },
            instagram:{
                type: String
            },
            linkedin:{
                type: String
            }
        }
    ]
});

module.exports = Profile = monggose.model('profile', ProfileSchema);