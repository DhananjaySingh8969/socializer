const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //this defines the object id of liked object
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    //this field defines the type of like object since its a dynamic ref
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
}, {
    timestamps: true
});


const Like = mongoose.model('Like',likeSchema);

module.exports = Like;