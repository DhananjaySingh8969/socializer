{    
    // console.log('home_like');
    function postLikeBtn(btn)
    {
        $(btn).click(function(ev){
            ev.preventDefault();
            $.ajax({
                method:'Post',
                url:$(btn).prop('href'),
                success:function(data){
                    // console.log(data);
                    // console.log($('i',btn));
                    // console.log(data.data);
                    if(data.data && data.data.deleted)
                    {
                        $('i',btn).addClass("w-like");
                        $('i',btn).removeClass("like");
                    }else{
                        $('i',btn).addClass("like");
                        $('i',btn).removeClass("w-like");
                    }
                    $('span',btn).html(data.data.likeCount);
                },
                error: function(error){
                    console.log('error in postLikeBtn',error);
                    errorMsg(error.responseText);
                }
             });
            
            // console.log('like+ cmt');
        });
    }
    function cmtLikeBtn(btn)
    {
        //  let toggle=false;
        //  console.log(btn);
         $(btn).click(function(ev){
            ev.preventDefault();
            $.ajax({
                method:'Post',
                url:$(btn).prop('href'),
                success:function(data){
                    // console.log(data);
                    if(data.data && data.data.deleted)
                    {
                        $('i',btn).addClass("g-like");
                        $('i',btn).removeClass("like");
                    }else{
                        $('i',btn).addClass("like");
                        $('i',btn).removeClass("g-like");
                    }
                    $('span',btn).html(data.data.likeCount);
                },
                error: function(error){
                    console.log('error in cmtLikeBtn',error);
                    errorMsg(error.responseText);
                }
             });
            
            // console.log('like+ cmt');
        });
    }
    
    function likeBtnHandler(){
        
        let toggleCmtLike=false;
        let postLikeBtns=$('.postLikeBtn');
        let cmtLikeBtns=$('.cmtLikeBtn');
        for(let btn of postLikeBtns)
        {
            postLikeBtn(btn);
        }
        for(let btn of cmtLikeBtns)
        {
            cmtLikeBtn(btn);
        }
    }
    likeBtnHandler();
}