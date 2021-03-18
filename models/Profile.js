const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    company:{
        type:String
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    status:{
        type:String
    },
    skills:{
        type:[String],
        required:true
    },
    githubusername:{
        type: String
    },
    bio:{
        type:String
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
            school:{
                type: String
            },
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
            },
            fieldofstudy:{
                type: String
            }
        }
    ],
    social:
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
    
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);