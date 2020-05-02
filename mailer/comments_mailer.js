const nodemailer=require('../config/nodemailer');

//this is another way to exporting method
exports.newComment=(comment)=>{
     console.log('inside new comment mailer');
     let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
     nodemailer.transporter.sendMail({
        from:'singhdhananjay8969@gmail.com',
        to:comment.user.email,
        subject:'new comment published',
        html:htmlString
     },(err,info)=>{
            if(err){
                console.log('error in comment mailer',err);
                return ;
            }
            console.log('mail sent!',info);
            return ;
     });
}