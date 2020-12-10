 // login功能
 $(function () {
  $('#login').validate({
  //   rules: {
  //     username:{
  //     required:true,
  //     minlength:5,
  //     maxlength:20
  //   },
  //   password: {
  //     required:true,
  //     minlength:6,
  //     maxlength:12
  //   }

  // },
  // messages: {
  //   username: {
  //     // required:'请填写用户信息',
  //     minlength:'最少5个字符',
  //     maxlength:'最多15个字符'
  //   },
  //   password: {
  //     // required:'密码太短',
  //     maxlength:'最多6字符',
  //     minlength:'最少10字符'

  //   }
  // },

    submitHandler (form) {
      
      const info = $(form).serialize()
      console.log(info)

      $.post('../server/login.php', info, null,'json').then(res => {
          console.log(res)

          if(res.code === 0) {
            
            $('.error').css({'display':'block'})
            
          }else if (res.code === 1) {
            setCookie('nickname',res.nickname)
            console.log('我执行了')
            
            window.location.href = '../html/index.html'
          }
      })
    }
    
  })
})

