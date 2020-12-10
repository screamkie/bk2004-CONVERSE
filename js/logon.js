$(function () {

  $('.regform').validate({

    submitHandler(form){
      const info =$(form).serialize()
      $.post('../server/logon.php',info,null,'json').then(res =>{

        console.log(res)
        if(res == 1){
          setCookie('nickname',res.nickname)

          $('.registerbox').addClass('activ')
          $('.login').removeClass('activ')
        }
      })
    }




  })



})