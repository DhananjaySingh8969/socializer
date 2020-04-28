{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
             e.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                //    console.log(data.data);
                   let newPost=creatNewPost(data.data);
                   $('.post-container').prepend(newPost);
                   deletePostHelper($('.dlt-btn-container a',newPost));
                }, 
                error: function(error){
                    console.log('ERROR',error.responseText);
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
                }, 
                error: function(error){
                    console.log("ERROR",error.responseText,);
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
                    <h3 class="d-inline capitalize">${post.user.name}</h3>
                    <a class="btn btn-secondary btn-danger d-inline " href="/post/destroy/${post._id}" role="button" aria-expanded="false" >
                            Delete
                    </a>
                </div>
                <small>${post.createdAt}</small>
            </div>
            <p class="mb-1 overflow-auto inset-text">${post.content}</p>
       </div>
       `);
    } 
    createPost();
    deletePost()
}