<template>
<!-- 单件商品详情内容 -->
 <div class="bk">
   <div class="conttent_bk" id="product">
        <!-- 页头标题 -->
      <header class="header">
        <!-- 订单管理标题 -->
        <div class="bt">
          <div class="bt_icon"><span>&#xe63b;</span></div>
          <h3>{{msg}}</h3>
        </div>
      </header>
      <!-- 商品详细参数 -->
      <section class="proContent">
        <!-- 商品名称标题 -->
        <div class="product">
          <h1>{{resData.pro_name}}</h1>
        </div>
        <!-- 产品图片+参数1 -->
        <div class="pro1">
          <!-- <img :src="resData.pro_img_url" width="340px" height="240px" alt=""> -->
          <img src="./../../static/images/vaseProduct/xq_hp2.jpg" width="340px" height="240px" alt="">
          <!-- 表格 -->
          <table class="proArguments">
            <tr class="proArguments_cs">
              <td colspan="2">商品详细参数</td>
            </tr>
            <tr >
              <td>商品编号</td>
              <td>{{resData.pro_id}}</td>
            </tr>
            <tr>
              <td>商品类型</td>
              <td>{{resData.pro_type_name}}</td>
            </tr>
            <tr>
              <td>商品成交量</td>
              <td>{{resData.pro_deal_amount}}</td>
            </tr>
            <tr>
              <td>商品折扣</td>
              <td>{{resData.pro_discount}}</td>
            </tr>
            <tr>
              <td>商品规格</td>
              <td>{{resData.pro_size}}</td>
            </tr>
            <tr>
              <td>商品入库时间</td>
              <td>{{resData.pro_storetime}}</td>
            </tr>
          </table>
        </div>
        <!-- 参数2 -->
        <div class="pro2">
            <table class="proArguments_name">
              <tr>
                <td>商品名称</td>
                <td>{{resData.pro_name}}</td>
              </tr>
              <tr>
                <td>商品价格</td>
                <td>{{resData.pro_price}}</td>
              </tr>
              <tr>
                <td style="width: 259px;height: 50px">商品描述</td>
                <td style="padding: 15px">{{resData.pro_info}}</td>
              </tr>
            </table>
        </div>
      </section>
      <!-- 用户评论 -->
      <section class="comment">
        <div class="comment_bt">用户评论</div>
        <div class="comment_contentAll">
          <!-- 评论1 -->
          <div v-for="(proC,key,index) in proComments" v-bind:key="proC.pro_id">
          <div class="com_content1">
            <div class="content_pl">
              <!-- <img :src="'http://localhost:9099/static/'+proC.user_pic" width="80" height="76" alt=""> -->
              <img src="./../../static/images/vaseProduct/xq_hp2.jpg" width="80" height="76" alt="">
              <div class="content_pl_right">
                <h1>{{proC.user_name}}</h1>
                <p>{{proC.com_message_date}}</p>
                <p class="text">{{proC.com_message_count}}</p>
              </div>
              <!-- 按钮 -->
              <div class="button" v-if="proC.com_reply">                 
                <button @click="delete_pl(proC.com_id)">删除</button>
              </div>
              <div class="button" v-else>
                <button @click="clicBtn_hf(index)">回复</button>
                <button @click="delete_pl(proC.com_id)">删除</button>
              </div>
              <!-- 历史回复 -->
              <div class="reply" v-if="proC.com_reply">
                <p>历史回复：</p>
                <div>{{proC.com_reply}}</div>
              </div>
              <div class="reply" :ref="'reply_'+index" hidden v-else>
                    <p>回复内容：</p>
                    <el-input
                        style="font-size:12px;color: #747474;"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="textarea3">
                    </el-input>
                    <div class="button">
                        <button class="button_submit">提交</button>
                    </div>
                </div>
            </div>
          </div>
          <div class="line"></div>
          </div>
            
        </div>
      </section>
      <footer>
      </footer>
   </div>
 </div>
</template>

<script>
 import qs from 'qs'
 export default {
   name:'product',
   data:function () {
     return {
      msg:"商品详情",
      name:"青瓷莲花茶具",
      textarea3: '',
      resData:"",//商品参数
      proComments:[] //评论
     }
    },
    methods:{ 
      //请求数据
       clicBtn_hf:function(w){//点击回复弹出回复框
         var tar="reply_"+w;
         console.log(tar)
         console.log(this.$refs);
          
        this.$refs[tar][0].hidden=!this.$refs[tar][0].hidden;
      },
      delete_pl:function(com_id) {//删除评论
         
        //console.log(this)
          this.$confirm('此操作将删除该评论, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {   
            let postdata = qs.stringify({com_id:com_id});
            var delmsg="删除成功";
            this.$axios.post('/api/deleteComments.do',postdata).then(function(resDatac){
              console.log(resDatac.data) 
              delmsg="删除成功";
            }).catch(function(err){              
              console.log(err)
              delmsg="删除失败";
            });
            this.$message({
                   type: 'success',
                   message: delmsg
            });      
            this.getpldata();             
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        getpldata:function(){//获取商品详细参数和评论数据
            var _this=this;
            let pro_id = 17 ;
            let postdata = qs.stringify({pro_id:pro_id});
            this.$axios.post('http://localhost:9999/productContent.do',postdata).then(function(resData){
              console.log(resData.data[0])
              _this.resData=resData.data[0];
              
            }).catch(function(err){
              console.log(err)
            })
            
            this.$axios.post('http://localhost:9999/productComments.do',postdata).then(function(resDatac){
              console.log(resDatac.data)
              _this.proComments=resDatac.data;
              console.log(_this.proComments);
            }).catch(function(err){
              console.log(err)
            }) 
        }

    },
    // props:{
    //   pro_id:{
    //     type:Number,
    //     required:true
    //   }
    // }
    created:function(){
        this.getpldata();
    }
  }
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
@font-face {
  font-family: 'iconfont';  /* project id 642232 */
  src: url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.eot');
  src: url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.woff') format('woff'),
  url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.svg#iconfont') format('svg');
}
/* .bk{
  width: 1349px;
  height: 700px;
  background-color: #000;
  padding: 30px 30px 0 30px; 
} */
.conttent_bk{
  background-color: #fff;
  width: 1106px;
  height: 530px;
}
.header .bt{
  width: 1090px;
  height: 43px;
  border-bottom: 1px solid #E3E3E3;
  text-align: center;
  line-height: 43px;
}
.bt_icon{
  margin-top: 10px;
  margin-left: 20px;
  float: left;
  width: 24px;
  height: 24px;
  background-color:#2da3d1;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  
}
.bt_icon span{
   color: white;
   font-family: 'iconfont';
   font-size: 12px;
   line-height: 26px;
   display: block;
}
.bt img{
  float: left;
  margin-top: 10px;
  margin-left: 20px;
}
.bt h3{
  float: left;
  color: #0078A8;
  font-size: 16px;
  font-family:微软雅黑;
  line-height: 43px;
  margin-left: 10px;
}
.proContent{
  float: left;
  width: 630px;
  padding-left: 20px;
}
.product h1{
  margin-top: 18px;
  font-size: 24px;
  color: #224D83;
}
.proArguments{
  float: left;
  margin-left: 20px;
  border-collapse:collapse;
  width: 270px;
  height: 240px;
  text-align: center;
  font-size: 12px;
}
.proArguments td{
  border: 1px #E3E3E3 solid;
}
.proArguments tr td:first-child{
font-weight: bold;
background-color: #f9f9f9;
}
.proArguments_cs{
  color: #224D83;
  font-size: 14px;
}
.pro1{
  margin-top: 15px;
}
.pro1 img{
float: left;
}
.pro2{
  clear: both;
padding-top: 15px;
}
.proArguments_name{
  width: 630px;
  height: 135px;
  border-collapse:collapse;
  text-align: center;
  font-size: 12px;
}
.proArguments_name tr td:first-child{
font-weight: bold;
background-color: #f9f9f9;

}
.proArguments_name td{
  border: 1px #E3E3E3 solid;
}
.comment{
  float: left;
  width: 365px;
  height: 427px;
  border: 1px #E3E3E3 solid;
  margin: 25px 0 0 55px;
}
.comment_bt{
  height: 35px;
  border-bottom: 1px solid #e3e3e3;
  text-align: center;
  color: #224D83;
  font-size: 14px;
  line-height: 35px;
  font-weight: bold;
  background-color: #f9f9f9;
}
.comment_contentAll{
  height:391px;
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
}
.reply p{
  color: #273B5E;
  margin: 8px auto 5px;
}
.button button.button_submit{
  margin: 10px 0 0 ;
}
.display_none{
  display: none;
}
</style>
