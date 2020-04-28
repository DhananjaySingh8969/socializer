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
                   console.log(data.data);
                   $('.post-container').prepend(newPost(data.data));
                }, 
                error: function(error){
                    console.log(error.responseText);
                }
            });
    
        });

    }
    // method to create a post in DOM
    function newPost(post){
       return $(`
       <div class="list-group-item list-group-item-action post-item">
            <div class="d-flex w-100 justify-content-between">
                <div class="m-1">
                    <h3 class="d-inline capitalize">${post.user.name}</h3>
                    <a class="btn btn-secondary btn-danger d-inline"  href="/post/destroy/${post._id}" role="button" aria-expanded="false" >
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
}