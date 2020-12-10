$(function() {

  $('.cTips').click(() => {
    $('.tips').css({ 'display':'none'})
  })

  const nickname = getCookie('nickname')

  console.log(nickname)
  if(!nickname) return window.localStorage.href = './index.html'

  const cart = JSON.parse(window.localStorage.getItem('cart')) || []

  console.log(cart)


  if(!cart.length) {
    $('.payCart').addClass('hide')
    $('.emptyCart').removeClass('hide')
    // console.log('wozhixingl')
    return
  }
  

  $('.emptyCart').addClass('hide')
  $('.payCart').removeClass('hide')
  // console.log('我执行了')


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


  bindHtml()
  function bindHtml() {
    const selectAll = cart.every(item => item.is_select === '1')

    let total = 0
    let totalMoney = 0

    cart.forEach(item => {
      if(item.is_select === '1') {
        total += item.cart_number - 0
        totalMoney += item.cart_number * item.goods_price
       
      }
 
       
    })


    let str =`
    <div class="total">
    <p>您的购物车：${ total }件商品</p>
  </div>
  <div class="checked-box">
    <span>全选</span>
    <input type="checkbox" ${ selectAll ? 'checked' :''} class="qw" >
  </div>
  <ul class="cartul">
    `

    cart.forEach(item => {

      str+=`
      <li class="clearfix">
      <div class="Single clearfix">
        <input data-id="${ item.goods_id }" type="checkbox" ${ item.is_select === '0' ? '' : 'checked' } class="od">
        <i></i>
        <span class="cartDel btn btn-danger del" data-id="${ item.goods_id }">删除</span>
      </div>
      <div class="imgBox">
        <img src="${ item.goods_small_logo }">
      </div>
      <div class="goodsDesc">
      <p>${ item.goods_name }</p>
      </div>
      <div class="price">
        <span class="text-danger">${ item.goods_price }</span>

      </div>
      <div class="count">
        <button class="subNum" data-id="${ item.goods_id}">-</button>
        <input type="text" value="${ item.cart_number }">
        <button class="addNum" data-id="${ item.goods_id }">+</button>
      </div>
      <div class="xiaoj">
        
        <span class="text-danger">$${ (item.goods_price * item.cart_number).toFixed(2) }</span>
      </div>
    </li>
      `
    })
      str+=`
      </ul>


      <div class="cartfoot">
        <div class="cartfoot_r clearfix">
          <p class="col-sm-4 buyNum">物品数量：<span class="text-danger cartNum">${ total }</span>件</p>
          <p class="col-sm-4 buyMoney">商品金额：$<span>${ totalMoney.toFixed(2) }</span>元</p>
          <p class="col-sm-4 operate">
            <button class="btn btn-success"  ${ totalMoney === 0 ? 'disabled' : '' }>结算</button>
            <button class="btn btn-danger dels">清空</button>
            <button class="btn btn-primary shoping">继续购物</button>
          </p>
        </div>
      </div>
      `
      $('.payCart').html(str)
    
  }

  $('.payCart').on('click', '.od', function () {
    // console.log('我执行了')
    const type = this.checked

    const id = $(this).data('id')

    const info = cart.filter(item => item.goods_id == id)[0]

    info.is_select = type ? '1' : '0'
    bindHtml()

    window.localStorage.setItem('cart',JSON.stringify(cart))

  })
  $('.payCart').on('click', '.addNum', function () {
    const id = $(this).data('id')
    const info = cart.filter(item => item.goods_id == id)[0]
    info.cart_number = info.cart_number - 0 + 1

    bindHtml()

    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  $('.payCart').on('click', '.subNum', function () {
    const id = $(this).data('id')
    const info = cart.filter(item => item.goods_id == id)[0]

    if(info.cart_number === 1) return

    info.cart_number = info.cart_number - 0 - 1

    bindHtml()

    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  $('.payCart').on('click','.del', function() {
    const id = $(this).data('id')

    for(let i = 0; i < cart.length; i++) {
      if (cart[i].goods_id == id) {
        cart.splice(i,1)
        break
      }
    }
    bindHtml()

    window.localStorage.setItem('cart', JSON.stringify(cart))

    if (!cart.length) return window.location.reload()
  })


  //全选
  // 
  // 
  $('.payCart').on('click', '.qw', function() {
    console.log($('.Single > input'))
    if(this.checked === true) {
      for( let i = 0;i < $('.Single > input').length;i++){
        
      cart[i].is_select = '1'
       
      }
      $('.Single > input').attr('checked', this.checked)
      bindHtml()
      window.localStorage.setItem('cart',JSON.stringify(cart))
   } else {
     for(let i = 0;i < $('.Single > input').length; i++){
       cart[i].is_select = '0'
     }
     $('.Single > input').attr('checked', this.checked)
     bindHtml()
   }

  //  bindHtml()
  } )

  //清空购物车
  $('.payCart').on('click','.dels', function() {
    console.log('我清空了')
  cart.splice(0,cart.length)
  window.localStorage.setItem('cart',JSON.stringify(cart))
  
  if(!cart.length) {
    $('.payCart').addClass('hide')
    $('.emptyCart').removeClass('hide')
    return
  }
  
  })





})