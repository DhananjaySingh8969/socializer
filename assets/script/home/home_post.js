{   
    // method to submit the form data for new post using AJAX
    function successMsg(msg){
        new Noty({
            theme:'relax',
            text: msg,
            type:'success',
            layout:'topRight',
            timeout:1500
        }).show();
    }
    function errorMsg(msg){
        new Noty({
            theme:'relax',
            text: msg,
            type:'error',
            layout:'topRight',
            timeout:1500
        }).show();
    }
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
             e.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                   let newPost=creatNewPost(data.data);
                   $('.post-container').prepend(newPost);
                   $('textarea',newPostForm).val('');
                   successMsg('post created successfully!'); 
                   addComment($(`.comment-section #newCmt${data.data._id} form`,newPost));
                   deletePostHelper($('.dlt-btn-container a',newPost));
                   postLikeBtn($(`.comment-section p .postLikeBtn`,newPost));
                  
                }, 
                error: function(error){
                    console.log('ERROR in creating post',error.responseText);
                    errorMsg(error.responseText);
                }
            });
    
        });

    }
    let deletePostHelper=function(deleteLink){
        $(deleteLink).click(function(ev){
           console.log('gotCliced',deleteLink,$(deleteLink));
           ev.preventDefault();
            $.ajax({
                type: 'GET',
                url:$(deleteLink).prop('href'),
                success: function(data){
                    // console.log(data.data);
                    $(`#post-item${data.data}`).remove();
                    successMsg('post deleted successfully!');
                }, 
                error: function(error){
                    console.log('error in deletePostHelper',error);
                    errorMsg(error.responseText);
                }
            });
       });
    }
    //method to add click events on a delete btn
    function deletePost(){
        let deleteBtns=$('.dlt-btn-container a');
        for(let btn of deleteBtns)
        {
            deletePostHelper(btn);
        }
    }
    // method to create a post in DOM
    function creatNewPost(post){
       return $(`
       <div class="list-group-item list-group-item-action post-item" id="post-item${post._id}">
            <div class="d-flex w-100 justify-content-between">
                <div class="m-1  dlt-btn-container">
                    <small class="user-profile-image">
                        <img src="${post.user.avatar}">
                    </small>
                    <h3 class="d-inline capitalize">${post.user.name}</h3>
                    <a class="btn btn-secondary btn-danger d-inline " href="/post/destroy/${post._id}" role="button" aria-expanded="false" >
                            Delete
                    </a>
                </div>
                <small>${post.createdAt}</small>
            </div>
            <p class="mb-1 overflow-auto inset-text">${post.content}</p>
            <div class="comment-section">
                <p class="btn-group" role="group">
                    <a href="/likes/toggle/?id=${post._id}&type=Post" type="button" class="btn btn-secondary postLikeBtn"><i class="fas fa-thumbs-up w-like"></i> <span>${post.likes.length}</span> Likes</a>
                    <a class="btn btn-secondary comments-drop-down" data-toggle="collapse" href="#post${post._id}" role="button" aria-expanded="false" aria-controls="post${post._id}">
                        comments
                    </a>  
                </p>
                <div class="collapse show" id="post${post._id}">
                    <div class="create-comment">
                        <p>
                            <a class="btn btn-outline-primary add-comment-btn" data-toggle="collapse" href="#newCmt${post._id}" role="button" aria-expanded="false" aria-controls="newCmt${post._id}">
                            add comment+
                            </a>
                        </p>
                        <div class="collapse" id="newCmt${post._id}">
                            <form method="POST" action="/comment/create">
                                <div class="mb-3">
                                    <textarea name="content" class="form-control"  placeholder="comment here.." required></textarea>
                                    <input type="hidden" name="postId" value="${post._id}">
                                    <button class="btn btn-dark comment-submit-btn" type="submit">submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="comments-contianer">
                        <ol>
                        </ol>
                    </div> 
                </div>
            </div> 
       </div>
       `);
    } 
    
    createPost();
    deletePost();
}