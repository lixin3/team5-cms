<!-- 主页面 -->
<template>
  <div>
    <div id="top">

    </div>
    <div id="left">

    </div>
    <div id="main">
      <div id="totalNumber">
        <Diagram id="diagram" style="background-color:white"/>
      </div>
      <ul>
        <li>
          <router-link to="/user">
          <span class="i"> &#xe663;</span><p>会员管理</p>
          </router-link>
        </li>
        <li>
          <router-link to="/productManage">
          <span class="i">&#xe656;</span><p>商品管理</p>
          </router-link>
        </li>
        <li><span class="i">&#xe6bd;</span><p>订单管理</p></li>
        <li>
          <router-link to="/producttype">
          <span class="i">&#xe605;</span><p>商品类型管理</p>
          </router-link>
        </li>
        <li><span class="i">&#xe627;</span><p>内容管理</p></li>
        <li><span></span></li>
      </ul>
      <div id="totalLines">
        <userLine id='userline'/>
        <productLine id="productline"/>
        <orderLine id='orderline'/>
      </div>
      <mainUser></mainUser>
  </div>
  </div>
  
</template>

<script type="text/javascript">
import userLine from './charts/userLine'
import Diagram from './charts/Diagram'
import productLine from './charts/productLine'
import orderLine from './charts/orderLine'
import mainUser from './user/mainUser'
export default {
  data () {
    return {
    };
  },
  components: {
    Diagram,
    userLine,
    productLine,
    orderLine,
    mainUser,
  }
}

</script>
<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 642232 */
  src: url('//at.alicdn.com/t/font_642232_wvg05pxrfb0rudi.eot');
  src: url('//at.alicdn.com/t/font_642232_wvg05pxrfb0rudi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_642232_wvg05pxrfb0rudi.woff') format('woff'),
  url('//at.alicdn.com/t/font_642232_wvg05pxrfb0rudi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_642232_wvg05pxrfb0rudi.svg#iconfont') format('svg');
}
.i{
  font-family: iconfont;
  color:white;
  font-size:45px;
}
template{
  position: relative;
}
#main{
  position: absolute;
  width: 1069px;
  left: 280px;
  top:100px;
  height: 540px;
  overflow:auto;
}
#top{
  height: 60px;
  width: 100%;
  position: absolute;
  top: 0px;
  border: 1px solid black;
}
#left{
  height: 400px;
  border: 1px solid red;
  width: 200px;
}
ul>li{
  list-style: none;
  width: 170px;
  height: 86px;
  float: left;
  margin-left: 80px;
  margin-top:50px;
  color:white
}
ul>li:nth-child(1),ul>li:nth-child(3),ul>li:nth-child(5){
 margin-left:130px;
}
ul>li:nth-child(1){
  background-color: #F06868;
  margin-top:0px;
}
ul>li:nth-child(2){
  margin-top:0px;
  background-color: #07B38B;
}
ul>li:nth-child(3){
  background-color: #018ADA;
}
ul>li:nth-child(4){
  background-color:#61a0a8;
}
ul>li:nth-child(5){
  background-color: #d48265;
}
ul>li:nth-child(6){
  background-color: #334b5c;
}
#totalNumber{
  float: left;
  margin: 0 auto;
}
ul{
  margin-left: 350px;
}
#diagram{
  background-color: white;
  padding: 0 45px;  
  border-radius: 10px;
}
#totalLines{
  clear: both;
  height:420px;
  /* border: 1px solid red; */
}
#productline,#userline,#orderline{
  width:300px;
  float: left;
  margin-top: 50px;
  background-color:white;
  border-radius: 10px;
}
#productline,#orderline{
  margin-left: 50px;
}
a:-webkit-any-link{
  color:white;
  text-decoration:none;
}
</style>