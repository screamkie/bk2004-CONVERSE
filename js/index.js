class Banner{
  constructor(ele) {
    this.ele = document.querySelector(ele)
    this.imgBox = this.ele.querySelector('.imgbox')
    this.change = this.ele.querySelector('.change')
    this.changeImg = this.ele.querySelector('.change_img > ol')
    this.leftSpan = this.ele.querySelector('.change_left>span')
    this.rightSpan = this.ele.querySelector('.change_right>span')
    this.index = 0
    this.timer = 0
    this.init()
  }

  init () {
    this.autoPlay()
    this.LeftRight()
    this.overOut()
    this.pointEvent()
    this.changePage()
  }

  changeOne (type) {
    this.imgBox.children[this.index].classList.remove('active')
    this.changeImg.children[this.index].classList.remove('active')
    if(type === true ){
      this.index++
    } else if(type === false) {
      this.index--
    }else {
      this.index = type
    }
    if (this.index >= this.imgBox.children.length) this.index = 0
    if (this.index < 0) this.index = this.imgBox.children.length - 1
  
    this.imgBox.children[this.index].classList.add('active')
    this.changeImg.children[this.index].classList.add('active')
  }

  autoPlay () {
    this.timer = setInterval(() => {
      // console.log('启用定时器')
      this.changeOne(true)
    },2000)
  }
  
  overOut () {
    this.ele.addEventListener('mouseover', () => clearInterval(this.timer))
    this.ele.addEventListener('mouseout', () => this.autoPlay())
  }

  LeftRight () {
    this.change.addEventListener('click', e =>{
      e = e || window.event
      const target = e.target || e.srcElement
      // console.log(target.className)
      if(target.className === 'change_left' || target.className === 'leftspan' ){
        this.changeOne(false)
      }
      
      if(target.className === 'change_right' || target.className === 'rightspan'){
        
        this.changeOne(true)

      }
    })
  }

  pointEvent () {
    for(let i = 0;i < this.changeImg.children.length;i++){
      this.changeImg.children[i].setAttribute('i', i)

    }
    this.changeImg.addEventListener('mouseover', e => {
      e = e || window.event
      const target = e.target || e.srcElement
      if(target.nodeName === 'LI'){
        // console.log('我执行了')
        const i = target.getAttribute('i') - 0
         this.changeOne(i)
      }
    })
  }

  changePage () {
    document.addEventListener('visibilitychange', () =>{
      const state = document.visibilityState
      if(state === 'hidden') clearInterval(this.timer)
      if(state === 'visible') this.autoPlay()
    })
  }



}

const searchUl = document.querySelector('.searchUl')
const searchInp = document.querySelector('.searchInp')


searchInp.addEventListener('input',function (){

  
  const value = this.value.trim()
  if(!value) {
    searchUl.classList.remove('active')
    return
  } 

  const script = document.createElement('script')
  
  const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
  script.src = url
  
  document.body.appendChild(script)
  script.remove()

})
function bindHtml(res) {
  


  if(!res.g) {
    searchUl.classList.remove('active')
    return
  }
  let str = ''
  for(let i = 0;i < res.g.length;i++) {
    
    str+=`
      <li>${ res.g[i].q }</li>
    `
  }
  searchUl.innerHTML = str
  searchUl.classList.add('active')

  }  





$('.man_menu').mouseenter( ()=>{
  $('.secondary_menu').stop().slideDown(500, 'linear')
})
$('.man_menu').mouseleave( () => {
  $('.secondary_menu').stop().slideUp(500, 'linear')
})

$('.women_menu').mouseenter(() => {
    $('.secondary_menu_2').stop().fadeIn(1000, 'linear')
  })

  $('.women_menu').mouseleave(() => {
    $('.secondary_menu_2').stop().fadeOut(500, 'linear')
  })

  $('.children_li').mouseenter( ()=>{
    $('.children_menu').stop().fadeIn(500, 'linear')
  })
  $('.children_li').mouseleave(() => {
    $('.children_menu').stop().fadeOut(500, 'linear')
  })

  $('.discount_li').mouseenter( ()=>{
    $('.discount_menu').stop().fadeIn(500, 'linear')
  })
  $('.discount_li').mouseleave(() => {
    $('.discount_menu').stop().fadeOut(500, 'linear')
  })

  // $('.search').click( () =>{
    
  //   $('.searchBox').stop().toggle(500,'linear')
  //   $('.searchSpan').css({display:'block'})
  // })
  $('.closeSea').click( () =>{
    console.log('我执行了')
    $('.searchBox').slideUp(500,'linear')
  })
  $('.search_1>input').click( () =>{
    $('.searchSpan').css({'display':'none'})
  })

  $('.searchSpan').click( () =>{
    $('.searchSpan').css({display:'none'})
  })
  // $('.log').click( () => {
  //   $('.searchBox').css({display:'none'})
  //   $('.login').stop().toggle(1000,'linear')
  // })
  // $('.user_img').click( () =>{
  //   $('.login').stop().toggle(1000,'linear')

  // })
  
 
   
  $(function () {
    const nickname = getCookie('nickname')

    // console.log(nickname)
  if(nickname) {
    $('.login_one').addClass('hide')
    $('.login_go').removeClass('hide').text(`欢迎您，${nickname}`)
    
    // setCartNum()
  }else {
    $('.login_one').removeClass('hide')
    $('.login_go').addClass('hide')
  }



  // 注册
 
      
    $('.register').click(() =>{
      console.log('10')

      $('.registerbox').stop().slideToggle()
      $('.login').css({'display':'none'})
      $('.searchBox').css({' display':'none'})
    })

        
    $('.log').click(() =>{
      console.log('11')

      $('.login').stop().slideToggle()
      $('.registerbox').css({'display':'none'})
      $('.searchBox').css({' display':'none'})

          
    })
      $('.search').click(() =>{
        console.log('12')
        $('.searchBox').stop().slideToggle()
        $('.registerbox').css({'display':'none'})
        $('.login').css({'display':'none'})
      })
})





$('.bigBox>.hotBox>div').mouseover(function () {
  // const hotBox = document.querySelector('.hotBox')
  
  $(this).parent().next().next().find('.hotBox_1')
  .removeClass('active')
  .eq($(this)
  .index())
  .addClass('active')

  
  // const sanj = $(this).parent().next().find('.sanj')
  // for(let i = 0;i < hotBox.children.length;i++){
  //   console.log(i)
    
  // }
  
// const div =$('.hotBox > div').siblings()
// console.log(div)
// div.forEach(item => {
//   console.log(item)
// })

})

$('.hotMan').mouseover( function () {
  $('.sanj').stop().animate({
    left:120
  })
})
$('.hotWomen').mouseover( function () {
  $('.sanj').stop().animate({
    left:360
  })
})
$('.clothes').mouseover( function () {
  $('.sanj').stop().animate({
    left:622
  })
})
$('.hai').mouseover( function () {
  $('.sanj').stop().animate({
    left:860
  })
})

// 注册




