const nodemailer=require('../config/nodemailer');

//this is another way to exporting method
exports.resetLink=(user)=>{
    //  console.log('inside new comment mailer');
     let htmlString=nodemailer.renderTemplate({user:user},'/password_reset/password_reset_mail.ejs');
     nodemailer.transporter.sendMail({
        from:'singhdhananjay8969@gmail.com',
        to:user.email,
        subject:'password reset link',
        html:htmlString
     },(err,info)=>{
            if(err){
                console.log('error in resetLink mailer',err);
                return ;
            }
            // console.log('mail sent!',info);
            // req.flash('success','a reset link has been sent to your email');
            return ;
     });
}