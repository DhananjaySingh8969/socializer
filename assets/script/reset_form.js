{
    // console.log('hello');
    // console.log($('#reset-password-form'));
    $('#reset-password-form').submit(function(e){
        // console.log('sdfsd');
        if($('#reset-password1').val()!=$('#reset-password2').val())
        {
            e.preventDefault();
            // console.log('got1');
            alert('confirm didnt match,please try again');
        }
    });
}