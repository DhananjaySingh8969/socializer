

// const BOT_MSGS = [
//   "Hi, how are you?",
//   "Ohh... I can't understand what you trying to say. Sorry!",
//   "I like to play games... But I don't know how to play!",
//   "Sorry if my answers are not relevant. :))",
//   "I feel sleepy! :("
// ];

// Icons made by Freepik from www.flaticon.com
// const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
// const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
// const BOT_NAME = "BOT";
// const PERSON_NAME = "Sajad";




// function botResponse() {
//   const r = random(0, BOT_MSGS.length - 1);
//   const msgText = BOT_MSGS[r];
//   const delay = msgText.split(" ").length * 100;

//   setTimeout(() => {
//     appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
//   }, delay);
// }

// // Utils
// function get(selector, root = document) {
//   return root.querySelector(selector);
// }

// function formatDate(date) {
//   const h = "0" + date.getHours();
//   const m = "0" + date.getMinutes();

//   return `${h.slice(-2)}:${m.slice(-2)}`;
// }

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function chatBoxBtn()
{    
    var toggle=true;
    $('.chat-box-btn').click(function(ev){
        ev.preventDefault();
        if(toggle)
        {
          $('.chat-box').height('30rem');
          $(this).css({"bottom":"25rem","border-radius":"50%","z-index":"1"});
          $(this).text('X');
        }else{
          $('.chat-box').height('0rem');
          $(this).css({"bottom":"2rem","border-radius":"0%"});
          $(this).text('chat');
        }
        toggle=!toggle;
        // console.log($('.chat-box').height());
    })
}
chatBoxBtn();
