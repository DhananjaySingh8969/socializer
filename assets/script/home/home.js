{   
    // console.log('heello');
    function toggleFriendsHelper(link)
    {   
        // console.log(link);
        $(link).click(function(ev){
            // console.log('clicked');
            ev.preventDefault();

            $.ajax({
                type: 'POST',
                url:$(link).prop('href'),
                success: function(data){
                    console.log('json response:',data);
                    let frnd=$(`#ft${data.data.from_friend._id}`);
                    console.log('frnd:-',frnd);
                    $(`#ft${data.data.from_friend._id}`).remove();
                    let tgleBtn=$('.toggle-frnd-btn',frnd);
                    if(data.data.addFriend)
                    {   
                        
                        $(tgleBtn).removeClass('btn-primary');
                        $(tgleBtn).addClass('btn-danger');
                        $(tgleBtn).text('Remove Friend');
                        $('.friends-contianer ol').prepend(frnd);
                        successMsg('now you are friend with '+data.data.from_friend.name+' !');
                    }else{
                        $(tgleBtn).removeClass('btn-danger');
                        $(tgleBtn).addClass('btn-primary');
                        $(tgleBtn).text('Add Friend');
                        $('.users-container ol').prepend(frnd);
                        successMsg(data.data.from_friend.name+' successfully removed from your friend list');
                    }
                    toggleFriendsHelper(tgleBtn);
                    // $(`#post-item${data.data}`).remove();
                    // successMsg('post deleted successfully!');
                }, 
                error: function(error){
                    console.log('error in toggleFriendsHelper',error);
                    errorMsg(error.responseText);
                }
            });
        });
    }
    function toggleFriends(){
        let frndToggleBtn=$('.toggle-frnd-btn');
        // console.log('fsafsaf',frndToggleBtn);
        for(let btn of frndToggleBtn)
        {
            toggleFriendsHelper(btn);
        }
    }
    function createFriendDom(friend)
    {
        return `
        <li class="blue custom-text li-style-numeric" id="ft${friend.id}">
            <a class="friend" href="/users/profile/${friend.id}">
                <div class="ellipsis inline-block" style="width:90%;color: blue;"><i class="far fa-id-badge blue "></i>${friend.name}</div>
            </a>
            <a href="/users/friend-toggle/?id=${friend.id}" type="button" class="btn btn-danger inline-block toggle-frnd-btn" style="font-size: 50%;width:20%;padding: 1px;">Remove friend</a>
       </li>`
    }
    toggleFriends();
}