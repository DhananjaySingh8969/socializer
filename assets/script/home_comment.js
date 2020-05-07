{
   
    //method to add comment
   function addComment(cmtForm){
         let addCommentForm=cmtForm;
        if(!addCommentForm){
            addCommentForm=$('.cmt-form');
        }
        for(let form of addCommentForm)
        {   
            $(form).submit(function(ev){
                ev.preventDefault();
                $.ajax({
                    type: 'POST',
                    url: '/comment/create',
                    data: $(form).serialize(),
                    success: function(data){
                        // console.log(data);
                        $('div textarea',form).val('');
                        let commentsContianer=$(`#post-item${data.data.post} .comment-section .comments-contianer ol`);
                        let newComment=createCommentDom(data.data);
                        $(commentsContianer).prepend(newComment);
                        successMsg('comment added successfully!');
                        deleteCommentHelper($('.dlt-cmt-btn',newComment));
                        //console.log($('.cmtLikeBtn',newComment));
                        cmtLikeBtn($('.cmtLikeBtn',newComment));
                    }, 
                    error: function(error){
                        console.log('ERROR in add comment',error.responseText);
                         errorMsg(error.responseText);
                    }
                });
            });
        }
    }
    //created comment DOM
    function createCommentDom(comment){
           
            return $(`
                <li id=comment-item${comment._id}>
                    <a  href="/likes/toggle/?id=${comment._id}&type=Comment"  class="g-like cmtLikeBtn" ><i class="far fa-thumbs-up"></i><span>${comment.likes.length}</span> likes</a>
                    <p class="comment-content d-inline">${comment.content}</p>
                    <small class="alert-link d-inline">
                        ${comment.user.name}
                    </small>
                    <a class="d-inline dlt-cmt-btn" href="/comment/destroy/${comment._id}"><i class="fas fa-trash fa-xs danger-color"></i></a>
                </li>
            `);
    }
    //method to delete comment
    function deleteCommentHelper(deleteLink){
          $(deleteLink).click(function(ev){
                ev.preventDefault();
                $.ajax({
                    type: 'GET',
                    url:$(deleteLink).prop('href'),
                    success: function(data){
                        // console.log(data.data);
                        $(`#comment-item${data.data}`).remove();
                        // console.log()
                        successMsg('comment  deleted successfully!');
                    }, 
                    error: function(error){
                        console.log('error in deleteCommentHelper',error);
                        errorMsg(error.responseText);
                    }
                });
          });
    }
    function deleteComment(){
        let commentDeleteBtns=$('.comments-contianer ol li .dlt-cmt-btn');
        for(let btn of commentDeleteBtns){
            deleteCommentHelper(btn);
        }
    }
    addComment();
    deleteComment();
}