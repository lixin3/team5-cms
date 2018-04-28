<!-- 会员详情 -->
<template>
  <div id="userdetails">
      <div id="content">
        <div id="title">
            <span class="i">&#xe643;</span><h3>会员基本信息</h3>
            <!-- {{user_id}}{{$route.params.user_id}} -->
            </div>
        <div id="left">
          <div id="lefttop">
            <div id="userinfo">
                <h4>{{user_name}}</h4>
                <img src="./../../../static/user1.jpeg" alt="">
            </div>
            <div id="useraddress">
                <ul>
                    <li @click="setaddress(0)">收货地址1</li>
                    <li @click="setaddress(1)">收货地址2</li>
                    <li @click="setaddress(2)">收货地址2</li>
                </ul>
                <div>
                    <div>
                        <label for="name">收件人：</label>
                        <p>{{address_person}}</p>
                    </div>
                    <div>
                        <label for="tel">电话：</label>
                        <p>{{address_tel}}</p>
                    </div>
                    <div>
                        <label for="address">地址:</label>
                        <p>{{address_addr}}</p>
                    </div>
                </div>
            </div>
          </div>
          <div id="leftbottom">
              <div id="divtab">
                <table >
                  <tr>
                      <td colspan="6">最近购买</td>
                  </tr>
                  <tr>
                      <td>时间</td>
                      <td>商品名称</td>
                      <td>价格</td>
                      <td>件数</td>
                      <td>支付方式</td>
                      <td>状态</td>
                  </tr>
                  <tr v-for="item in orderlist">
                      <td>{{item.order_time}}</td>
                      <td>{{item.pro_name}}</td>
                      <td>￥{{item.order_price}}</td>
                      <td>{{item.order_detail_amount}}</td>
                      <td>{{item.order_paymethod}}</td>
                      <td>{{item.order_status}}</td>
                  </tr>
              </table>
              </div>
              <el-pagination id="page" background :page-size="5" layout="prev, pager, next" :total="parseInt(totolnum)"></el-pagination>  
          </div>
        </div>
        <div id="right">
               <!-- 用户评论 -->
   <section class="comment">
     <div class="comment_bt">用户评论</div>
     <div class="comment_contentAll">
       <!-- 评论1 -->
       <div class="com_content1" v-for="(item,index) in commentlist">
         <div class="content_pl">
           <img :src="require('./../../../static/images/'+imgurl[index])" alt="">
           <div class="content_pl_right">
             <h1>{{item.pro_name}}{{index}}</h1>
             <p>{{(item.com_message_date).substring(0,10)}}</p>
             <p class="text">{{item.com_message_count}}</p>
           </div>
           <!-- 按钮 -->
           <div class="button">
             <!-- <button>回复</button>
             <button>删除</button> -->
           </div>
           <!-- 历史回复 -->
           <div class="reply">
             <p>历史回复：</p>
             <div>{{item.com_reply}}</div>
           </div>
         </div>
         <div class="line"></div>
       </div>
     </div>
   </section>
  </div>
</div>
      
  </div>
</template>

<script type="text/javascript">
import qs from 'qs'
export default {
  data () {
    return {
        list:[],
        textarea3: '',
        user_id:'',//用户编号
        orderlist:[],//订单信息
        user_name:'',//会员姓名
        user_tel:'',//会员电话
        totolnum:'',//订单总数
        current:1,//当前页码
        commentlist:[], //用户评论,
        imgurl:[],//图片
        addresslist:[],//地址
        address:[],
        address_person:'',
        address_tel:'',
        address_addr:''
    };
  },

  components: {},

  computed: {
      id:function(){
          return this.$route.params.user_id;
      }
  },
  mounted() {
      this.getUserDetails();
      this.getUserOrderNumber();
      this.getUserOrder();
      this.getComment();
      this.getAddress();
  },

methods: {
    getUserDetails(){//获取会员个人信息
        var _this=this;
        let postData=qs.stringify({
            user_id:this.id
        })
        this.$axios.post('http://localhost:9999/userdetails.do',postData)
        .then(function(res){
            _this.list=res.data;
            // console.log(_this.list)
            _this.user_name=res.data[0].user_name
            _this.user_tel=res.data[0].user_tel;
        }).catch(function(err){
            console.log(err)
        })
    },
    getUserOrder(){//获取用户订单
        var _this=this;
        let postData=qs.stringify({
            user_id:this.id,
            size:5,
            current:_this.current,
        })
        this.$axios.post('http://localhost:9999/userorder.do',postData)
        .then(function(res){
            _this.orderlist=res.data.data;
            // console.log(_this.orderlist)
        }).catch(function(err){
            console.log(err)
        })
    },
    getUserOrderNumber(){//获取用户订单总数
        var _this=this;
        let postData=qs.stringify({
            user_id:this.id
        })
        this.$axios.post('http://localhost:9999/userordernumber.do',postData)
        .then(function(res){
            // console.log(res.data)
            _this.totolnum=res.data.items[0].num;
        }).catch(function(err){
            console.log(err)
        })
    },
    getComment(){//获取会员评论
        var _this=this;
        let postData=qs.stringify({
            user_id:this.id
        })
        this.$axios.post('http://localhost:9999/usercomment.do',postData)
        .then(function(res){
            _this.commentlist=res.data.items;
            // console.log(_this.commentlist)
            for(var i=0;i<_this.commentlist.length;i++){
                var str='images/';
                var img=(_this.commentlist[i].pro_img_url).split(',',1)
               if(img[0].substring(0,7)==str){
                   img=img[0].substr(7);
                    _this.imgurl.push([img])
               }else{
                   _this.imgurl.push(img)
               }       
            }
        }).catch(function(err){
            console.log(err)
        })
    },
    getAddress(index){//获取地址
         var _this=this;
        let postData=qs.stringify({
            user_id:this.id
        })
        this.$axios.post('http://localhost:9999/useraddress.do',postData)
        .then(function(res){
            _this.addresslist=res.data.items;
            // console.log(_this.addresslist)
            _this.setaddress(0)
        }).catch(function(err){
            console.log(err)
        })
    },
    clicBtn_hf:function(w){
       var tar="reply_"+w;
       console.log(this.$refs);
       this.$refs[tar].hidden=!this.$refs[tar].hidden;
    },
    delete_pl:function() {
        this.$confirm('此操作将删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
        }).then(() => {
        this.$message({
            type: 'success',
            message: '删除成功!'
        });
        }).catch(() => {
        this.$message({
            type: 'info',
            message: '已取消删除'
        });
        });
    },
   setaddress:function(index){
        if(index==null){
            index=0
        }
        this.address_person=this.addresslist[index].addr_person;
        this.address_addr=this.addresslist[index].addr_pro+this.addresslist[index].addr_city+
        this.addresslist[index].addr_area+this.addresslist[index].addr_detail;
        this.address_tel=this.addresslist[index].addr_tel;
        }
  }
}

</script>
<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 642232 */
  src: url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.eot');
  src: url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.woff') format('woff'),
  url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.svg#iconfont') format('svg');
}
.i{
    font-family: iconfont;
    color:#224D83;
    font-size:35px;
    margin-left: 20px;
}
#title{
    height: 40px;
    border-bottom: 1px solid #f5f5f5;
    line-height: 40px;
    border-radius: 5px;
    text-align: left;
}
#content h3{
    display: inline;
    color: #224D83;
    margin-left: 10px;
    border-radius: 5px;
    font-size: 16px;
}
template{
    position: relative;
}
#userdetails{
  position: absolute;
  left: 200px;
  top:68px;
  height:590px;
  width: 1149px;
}
#content{
    background-color: white;
    margin-left: 30px;
    width: 1106px;
    margin-top:30px;
    height:560px;
}
#userinfo,#lefttop{
    height: 265px;
}
#lefttop{
    width: 630px;
}
#userinfo,#useraddress{
    float: left;
}
#userinfo{
    width: 270px;
}
#useraddress{
    border:1px solid #f5f5f5;
    width: 358px;
    height: 180px;
    margin-top:70px;
}
#useraddress>ul{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f5f5f5;
}
#useraddress>ul>li{
    list-style: none;
    float: left;
    width: 118px;
    font-size:14px;
    font-weight: bold;
}
#useraddress>ul>li:nth-child(1),#useraddress>ul>li:nth-child(2){
    border-right: 1px solid #f5f5f5;
}
#useraddress>div{
    text-align: left;
    padding: 20px 20px;
}
#useraddress>div>div{
    margin-top: 10px;
}
#useraddress>div>div>p{
    display: inline;
}
#userinfo>h4{
    font-size: 24px;
    text-align: left;
    margin-top:10px;
    margin-left: 20px;
}
#userinfo>img{
    width: 200px;
    height: 200px;
    margin-top:5px;
    border-radius: 100px;
}
#leftbottom{
    height: 250px;
    width: 630px;
}
#divtab>table td{
    border: 1px solid #c2c0c0;
    height: 29px;
    width: 101px;
    font-size: 12px;
}
#divtab>table td:nth-child(1){
    font-size: 14px;
}
#divtab>table{
    border-collapse:collapse;
    margin-left: 20px;
}
#divtab>table tr:nth-child(1){
    color: #224D83;
}
#divtab>table tr:nth-child(1),#divtab>table tr:nth-child(2){
    font-weight: bold;
}
#useraddress>div{
    font-size:14px;
}
#page{
    margin-top: 5px;
}
#left,#right{
    float: left;
}
#right{
    height: 510px;
    width:460px;
}

.comment{
  float: left;
  width: 365px;
  height: 505px;
  border: 1px #E3E3E3 solid;
  margin: 10px 0 0 88px;
}
.comment_bt{
  height: 35px;
  border-bottom: 1px solid #e3e3e3;
  text-align: center;
  color: #224D83;
  font-size: 14px;
  line-height: 35px;
  font-weight: bold;
}
.comment_contentAll{
  height: 470px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.com_content1{
  clear: both;
  width: 330px;
  margin: 12px 0 0 12px;
}
.content_pl img{
  float: left;
}
.content_pl_right{
  width: 240px;
  float: left;
  padding: 0px 0 0 10px;
}
.content_pl_right h1{
  float: left;
  color: #224D83;
  font-size: 14px;
}
.content_pl_right p.text{
  padding-top: 5px;
  width: 240px;
  clear: both;
  color: #747474;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
  text-indent: 2em;
  margin: 0;
}
.content_pl_right p{
  float: right;
  color: #A2A2A2;
  font-size: 12px;
}
.button{
  text-align: right;
  display: block;
  clear: both;
  margin-bottom: 10px;
}
.button button{
  border-radius: 5px;
  width: 60px;
  height: 22px;
  background-color: #DFDFDF;
  border: none;
  color:#686868;
  font-size: 12px;
  outline: none;
}
.button button:hover{
  background-color: #52A7E1;
  color: #ffffff;
}
.line{
  height: 1px;
  border-bottom: 1px solid #E3E3E3;
  overflow: hidden;
  width: 100%;
}
.reply{
  border-top: 1px dashed #e4e4e4;
  font-size: 12px;
  color: #747474;
  padding-bottom: 10px;
  line-height: 18px;
  margin-top: 10px; 
  text-align: left;
    text-indent: 2em;
}

.reply p{
  color: #273B5E;
  margin: 8px auto 5px;
  text-indent: 0;
}
.button button.button_submit{
  margin: 10px 0 0 ;
}
.display_none{
  display: none;
}
.content_pl>img{
    width: 80px;
    height:76px;;
}
#divtab{
    height: 210px;
}
</style>