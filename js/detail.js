$(function () {
  let info = null

  const id = getCookie('goods_id')

  // console.log(id)
  getGoodsInfo()

  async function getGoodsInfo() {
    const goodsInfo = await $.get('../server/goodsInfo.php',{ goods_id:id }, null, 'json')

    bindHtml(goodsInfo.info)

    info = goodsInfo.info


  }

  getHeader()

 function getHeader () {
  const nickname = getCookie('nickname')

  console.log(nickname)
if(nickname) {
  $('.login_one').addClass('hide')
  $('.login_go').removeClass('hide').text(`欢迎您，${nickname}`)
  
  // setCartNum()
}else {
  $('.login_one').removeClass('hide')
  $('.login_go').addClass('hide')
}
 }

 
  function bindHtml(info) {

   
    console.log(info)


    $('.content').html(`
    <div class="goodsname">
    <span class="por-name">${ info.goods_name }</span>
  <div class="goodsmoney">
    <i>价格</i>
    <span class="pro-money">${ info.goods_price }</span>
  </div>
  <div class="imgBox_1">

  <div class="bigBox"><img src="${ info.goods_big_logo}"></div>
    <div class="imgBox">
    <div class="enlarge"></div>
      <img src="${ info.goods_big_logo }" alt="">
    </div>
    <div class="goodsL">
      <span class="cur"><img src="${ info.goods_small_logo }"></span>
      <span><img src="${ info.goods_small_logo }"></span>
    </div>
    </div>
  </div>
    `

    )
    $('.goodsDesc').html(info.goods_introduce)
  }


// 数量+-
  $('.num1').on('click', '.subNum', function () {
    let num = $('.num1 > input').val() - 0

    if(num ===1) return
    $('.num1 > input').val(num - 1)
  })
  .on('click', '.addNum', function () {
    let num = $('.num1 > input').val() - 0
    $('.num1 > input').val(num + 1)
  })
 


// 加入购物车
  $('.cartbutton').on('click','.addcart',function() {
    const cart = JSON.parse(window.localStorage.getItem('cart'))||[]
    console.log(cart)

    const flag = cart.some(item => item.good_id === id)
    console.log(flag)
    if(flag) {
      const cart_goods = cart.filter(item => item.goods_id === id)[0]
      cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.num1>input').val() - 0)
    } else {
      info.cart_number =  $('.num1>input').val() - 0
      cart.push(info)
    }
    window.localStorage.setItem('cart',JSON.stringify(cart))
  })





$('.pay').click(() => {
  // const cart = JSON.parse(window.localStorage.getItem('cart'))||[]
  //   console.log(cart)

  //   const flag = cart.some(item => item.good_id === id)
  //   console.log(flag)
  //   if(flag) {
  //     const cart_goods = cart.filter(item => item.goods_id === id)[0]
  //     cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.num1>input').val() - 0)
  //   } else {
  //     info.cart_number =  $('.num1>input').val() - 0
  //     cart.push(info)
  //   }
  //   window.localStorage.setItem('cart',JSON.stringify(cart))
    window.location.href = './cart.html'
  
})


















$('.content').on('click','.goodsL > span', function () {
  // console.log(this)
$(this).addClass('cur').siblings().removeClass('cur')

})







  // 放大镜
 
  $('.content').on('mousemove', '.imgBox' ,function (ev) {

    $('.enlarge').css({'display':'block'})
    $('.bigBox').css({'display':'block'})
    
    let mLeft = ev.offsetX - 50
    let mTop = ev.offsetY - 100
    
    if(mLeft <= 0) { mLeft = 0 }
    if(mLeft >=400) { mLeft = 400 }
    if(mTop <= 0) { mTop = 0 }
    if(mTop >= 200) { mTop = 200 }
    $('.enlarge').css({left:mLeft, top:mTop})
    $('.bigBox > img').css({left:-2 * mLeft, top:-2 * mTop})
    
    $('.content').on('mouseout', '.imgBox', function() {
    
      $('.enlarge').css({'display':'none'})
    $('.bigBox').css({'display':'none'})
    })
    })
    
    
    




})