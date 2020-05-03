const mongoose = require('mongoose');
const passwordResetTokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    isValid:{
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const PasswordResetTokenSchema= mongoose.model('passwordResetTokenSchema',passwordResetTokenSchema);

module.exports =PasswordResetTokenSchema;