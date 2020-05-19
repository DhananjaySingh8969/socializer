 
    class chatEngine{
        constructor(user,msger)
        {
            // this.chatBoxId=$(`#${chatBoxId}`);
            this.user=user;
            this.msger= msger; 
            this.socket=io.connect('http://18.223.98.253/:5000');
            if(this.user.email)
            {
                this.connectionHandler();
            }
        }
        connectionHandler()
        {   
            let self=this;
            this.socket.on('connect',function(){
                // console.log('connection established using socket..!');

                // self.socket.emit('join_room',{
                //     user_email:self.userEmail,
                //     chatroom:'socializer'
                // });
                
                // self.socket.on('user_joined',function(data){
                //     console.log('a user_joined',data);
                // });
                $(self.msger.form).submit(function(event){
                    event.preventDefault();
                    const msgText = $(self.msger.input).val();

                    if (!msgText) return;
                    self.socket.emit('send_messege',{
                        chatroom:'socializer',
                        user:self.user,
                        msg:msgText
                    });
                    self.appendMessage(user.name,user.avatar,"right", msgText);
                    $(self.msger.input).val('');
                    self.socket.on('received_messege',function(data){
                        console.log(data);
                        if(data.user.email==self.user.email)
                        {
                            self.appendMessage(data.user.name,data.user.avatar,"left",data.msg);
                            console.log(data);
                        }
                        
                    });
                });
            });
        }
        appendMessage(name, img, side, text) {
            //   Simple solution for small apps
            const msgHTML = `
              <div class="msg ${side}-msg word-break">
                <div class="msg-img" style="background-image: url(${img})"></div>
          
                <div class="msg-bubble">
                  <div class="msg-info">
                    <div class="msg-info-name">${name}</div>
                    <div class="msg-info-time">${this.formatDate(new Date())}</div>
                  </div>
          
                  <div class="msg-text word-break">${text}</div>
                </div>
              </div>
            `;
          
            $(msger.chat).append(msgHTML);
            // msger.chat.scrollTop += 500;
            // $(msger.chat).scrollTop($(msger.chat).prop("scrollHeight"));
            $(msger.chat).animate({ scrollTop: $(msger.chat).prop("scrollHeight")}, 1000);
            // $('html, body').animate({
            //     scrollTop: $(msger.chat).offset().down
            // },$(msgHTML).height());
        }
        formatDate(date) {
          const h = "0" + date.getHours();
          const m = "0" + date.getMinutes();
          return `${h.slice(-2)}:${m.slice(-2)}`;
        }
    }
