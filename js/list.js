



$(function () {

  let list = null

  const list_info = {
    cat_one: 'all',
    sort_method: '默认',
    sort_type:'ASC',
    current:1,
    pagesize:15
    
  }




  // 渲染头部
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

// 渲染分类列表
  getCatOne()

  async function getCatOne() {
    const cat_one_list = await $.get('../server/cateOne.php',null, null, 'json')

    let str = ` <li data-type="all">CHUCK 70<img src="http://v.icbc.com.cn/userfiles/Resources/ICBC/shouye/images/2017/nav_liW.png"></li>
    
    `
    
    cat_one_list.list.forEach(item => {
      str +=`<li data-type="${ item.cat_one_id }">${ item.cat_one_id}</li>

      `

    })
    $('.screen_2').html(str)
  }


  getTotalPage()
  async function getTotalPage() {
    // 2-1. 请求分页数据
    const totalInfo = await $.get('../server/totalPage.php', list_info, null, 'json')

    // 2-2. 渲染分页内容
    // jquery-pagination 插件
    $('.pagination').pagination({
      pageCount: totalInfo.total,
      callback (index) {
        list_info.current = index.getCurrent()
        // 从新请求商品列表
        getGoodsList()
      }
    })
  }



  getGoodsList()
  async function getGoodsList() {
    const goodsList = await $.get('../server/goodsList.php', list_info, null, 'json')

    list = goodsList.list
    
    let str = ''
    goodsList.list.forEach(item => {
      str += `
      <dl data-id="${ item.goods_id }">
      <dt><img src="${ item.goods_big_logo }"></dt>
      <dd class="p_name" data-id="${ item.goods_id }">${ item.goods_name}</dd>
      <dd class="p_b">¥${ item.goods_price}</dd>
      <dd class="p_c">¥${ item.goods_price}</dd>
    
    </dl>
      `
      $('.commodity').html(str)
    })

  }

  $('.screen_2').on('click', 'li', function () {

    // console.log('我执行')
    $(this).addClass('active').siblings().removeClass('active')
    
    const type = $(this).data('type')

    list_info.current = 1
    list_info.cat_one = type
    getTotalPage()
    getGoodsList()

    
  })

  $('.commodity').on('click','dl', function () {
    const id = $(this).data('id')
    console.log(id)

    setCookie('goods_id', id)
    window.location.href = './detail.html'


  })
  // 排序
  $('.sort-list').on('click','a',function () {
    console.log('12')
    const method = $(this).attr('data-method')
    const type = $(this).attr('data-type')
    
    list_info.sort_method = method
    list_info.sort_type = type

    console.log(list_info.sort_method)
    getTotalPage()
    getGoodsList()

    $(this)
    .attr('data-type', type === 'ASC' ? 'DESC' : 'ASC')
    .siblings()
    .attr('data-type', 'ASC')
  })


 


})



// 树状菜单
$('.screen_1>ul>li').click(function () {
  $(this).toggleClass('active').siblings().removeClass('active')

  $(this)
  .find('ol')
  .stop()
  .slideToggle(500)
  .parent()
  .siblings()
  .find('ol')
  .slideUp(500)
})
$('.screen_1>ul>li>ol>li').click(e => e.stopPropagation())
$('.screen_1>ul>li>ol').click(e => e.stopPropagation())

$('.sort-list').on('click','a',function () {

  $(this).addClass('active').siblings().removeClass('active')

})