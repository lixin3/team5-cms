<template>
      <!-- 商品详情模块 -->
    <div class="div1">
      <!-- 头部 -->
        <header>
          <div class="spxq">
              <h1><span>&#xe76f;</span> 商品详情 </h1>
          </div>
          <div class="hx"></div>
        </header>
        <!-- 内容 -->
        <section> 
            <div class="section1">
              <!-- 搜索框 -->
              <el-input placeholder="商品名称" v-model="proName" style="width:170px;margin-left:-660px;margin-top:5px;font-size: 12px;" clearable ></el-input>
              <el-select v-model="proCondition" clearable placeholder="状态选择" style="margin-left:5px;width:170px;font-size: 12px;">
                <el-option label="生存" value="0"></el-option>
                <el-option label="死亡" value="1"></el-option>
              </el-select>
            <!-- 搜索按钮 -->
            <div class="anniu" @click="search()">搜索</div>
            <!-- 重置按钮 -->
            <div class="anniu2" @click="reset()">重置</div>
            <!-- 第二个线条 -->
            <div class="hx2"></div>
            <!-- 添加按钮 -->
            <div class="tianjia" @click="tankuang()"> 
             <i class="el-icon-circle-plus-outline" ></i> 添加
             </div>
             <!-- 编辑按钮 -->
             <div class="bianji"  @click="tankuang2()"> 
             <i class="el-icon-edit-outline" ></i> 编辑
             </div>
             <!-- 删除 -->
             <div class="delete" @click="handleDelete()"> <i class="el-icon-edit-outline" ></i>删除</div>
             <!-- 表格部分 -->
            <el-table :data="list.items"  stripe border style="width:100%;margin-left:20px;font-size:14px;margin-top:60px" >
              <!-- <el-table-column  type="selection"  width="37" >
              </el-table-column> -->
              <el-table-column  width="37px">
              <template slot-scope="scope">
                  <el-checkbox @change="changeCheck(scope.$index, scope.row)"></el-checkbox>
              </template>
              </el-table-column>
              <el-table-column prop="name"  label="商品名称"  width="120px" >
              <template slot-scope="scope">{{scope.row.pro_name}}</template>
              </el-table-column>
              <el-table-column prop="ID" label="编号"  width="50" >
              <template slot-scope="scope">{{scope.row.pro_id}}</template>
              </el-table-column>
              <el-table-column prop="baokuan" label="爆款"  width="50" >
              <template slot-scope="scope">{{scope.row.pro_bao}}</template>
              </el-table-column>
              <el-table-column prop="xstate" label="新旧"  width="50" >
              <template slot-scope="scope">{{scope.row.pro_new}}</template>
              </el-table-column>
              <el-table-column prop="standard" label="规格" width="90" >
              <template slot-scope="scope">{{scope.row.pro_size}}</template>
              </el-table-column>
              <el-table-column  prop="supply" label="供货量"  width="74">
              <template slot-scope="scope">{{scope.row.pro_amount}}</template>
              </el-table-column>
              <el-table-column  prop="inventory" label="库存" width="60" >  </el-table-column>
              <el-table-column prop="sales" label="销量" width="60"> </el-table-column>
              <el-table-column prop="discount" label="折扣" width="60">
                <template slot-scope="scope">{{scope.row.pro_discount}}</template>
              </el-table-column>
              <el-table-column prop="cost" label="成本价格" width="80" >
               <template slot-scope="scope">{{scope.row.pro_price}}</template>
              </el-table-column>
              <el-table-column prop="trading" label="成交量" width="74">
               <template slot-scope="scope">{{scope.row.pro_deal_amount}}</template>
              </el-table-column>
              <el-table-column prop="price"  label="今日售价" width="80" >
              </el-table-column>
              <el-table-column prop="dates"  label="添加日期" width="100" >
               <template slot-scope="scope">{{addtime[scope.$index]}}</template>
              </el-table-column>
              <el-table-column prop="state" label="状态" width="64" >
              <template slot-scope="scope">{{scope.row.pro_condition}}</template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div id="page">
              <el-pagination  background :page-size="5"
              @current-change='handleCurrentChange' layout="prev, pager, next" :total="totalnum.num"></el-pagination>   
            </div>
            </div>
            
        </section>
        <!-- 添加按钮部分 -->
      <div id="beijing" v-show="isShow">
        <div id="tjbd">
          <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div style=" margin-top: 20px;">添加商品</div>
                <el-form-item label="商品名称" prop="name" style=" margin-top: 20px;">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                 <el-form-item label="商品编号" prop="ID" style=" margin-top: 20px;">
                  <el-input v-model="ruleForm.ID"></el-input>
                </el-form-item>
                 <el-form-item label="爆款状态" prop="region">
                  <el-select v-model="ruleForm.region" placeholder="请选择爆款状态">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="新旧状态" prop="oldnew">
                  <el-select v-model="ruleForm.oldnew" placeholder="请选择新旧状态">
                    <el-option label="新款" value="shanghai"></el-option>
                    <el-option label="旧款" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品规格" prop="specification">
                  <el-input v-model="ruleForm.specification "></el-input>
                </el-form-item>
                <el-form-item label="供货量" prop="supply">
                  <el-input v-model="ruleForm.supply "></el-input>
                </el-form-item>
                <el-form-item label="库存量" prop="inventory">
                   <el-input v-model="ruleForm.inventory "></el-input>
                   </el-form-item>
                <el-form-item label="销量" prop="volume">
                   <el-input v-model="ruleForm.volume "></el-input>
                   </el-form-item>
                 <el-form-item label="折扣" prop="discount">
                   <el-input v-model="ruleForm.discount "></el-input>
                   </el-form-item>
                <el-form-item label="成本价格" prop="cost">
                   <el-input v-model="ruleForm.cost"></el-input>
                   </el-form-item>
                <el-form-item label="成交量" prop="turnover">
                   <el-input v-model="ruleForm.turnover "></el-input>
                   </el-form-item>
                <el-form-item label="今日售价" prop="price">
                   <el-input v-model="ruleForm.price "></el-input>
                   </el-form-item>
                <el-form-item label="创建时间" required style=" margin-left:18px;">
                  <el-col :span="21">
                    <el-form-item prop="date1">
                      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="状态" prop="state" style=" margin-left:-42px;">
                  <el-select v-model="ruleForm.state" placeholder="请选择状态">
                    <el-option label="生存" value="shanghai"></el-option>
                    <el-option label="死亡" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="tankuang()">取消</el-button>
                  </el-form-item>
              </el-form>
        </div>
        </div>
    <!-- 编辑按钮部分 -->
      <div id="beijing2" v-show="isShow2">
        <div id="tjbd2">
          <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div style=" margin-top: 20px;">编辑商品</div>
                <el-form-item label="商品名称" prop="name" style=" margin-top: 20px;">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                 <el-form-item label="商品编号" prop="ID" style=" margin-top: 20px;">
                  <el-input v-model="ruleForm.ID"></el-input>
                </el-form-item>
                 <el-form-item label="爆款状态" prop="region">
                  <el-select v-model="ruleForm.region" placeholder="请选择爆款状态">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="新旧状态" prop="oldnew">
                  <el-select v-model="ruleForm.oldnew" placeholder="请选择新旧状态">
                    <el-option label="新款" value="shanghai"></el-option>
                    <el-option label="旧款" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品规格" prop="specification">
                  <el-input v-model="ruleForm.specification "></el-input>
                </el-form-item>
                <el-form-item label="供货量" prop="supply">
                  <el-input v-model="ruleForm.supply "></el-input>
                </el-form-item>
                <el-form-item label="库存量" prop="inventory">
                   <el-input v-model="ruleForm.inventory "></el-input>
                   </el-form-item>
                <el-form-item label="销量" prop="volume">
                   <el-input v-model="ruleForm.volume "></el-input>
                   </el-form-item>
                 <el-form-item label="折扣" prop="discount">
                   <el-input v-model="ruleForm.discount "></el-input>
                   </el-form-item>
                <el-form-item label="成本价格" prop="cost">
                   <el-input v-model="ruleForm.cost"></el-input>
                   </el-form-item>
                <el-form-item label="成交量" prop="turnover">
                   <el-input v-model="ruleForm.turnover "></el-input>
                   </el-form-item>
                <el-form-item label="今日售价" prop="price">
                   <el-input v-model="ruleForm.price "></el-input>
                   </el-form-item>
                <el-form-item label="创建时间" required  style=" margin-left:18px;">
                  <el-col :span="21">
                    <el-form-item prop="date1">
                      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="状态" prop="state" style=" margin-left:-42px;">
                  <el-select v-model="ruleForm.state" placeholder="请选择状态">
                    <el-option label="生存" value="shanghai"></el-option>
                    <el-option label="死亡" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
                    <el-button @click="tankuang2()">取消</el-button>
                  </el-form-item>
              </el-form>
        </div>
        </div>
    </div>
</template>
<script>
import qs  from 'qs'
export default {
  name: "",
  data() {
    return {
      list:[],//数据库中获取的数据
      totalnum:{},//数据库中数据总量
      current:1 ,//当前页码
      isShow:false,
      isShow2:false,
      proCondition:null,
      proName:'',
      currentSearch:1,//搜索列表页面
      currentRowIndex:'',//当前行的编号
      checkboxchecked:[false,false,false,false,false],//默认的所有复选框都未选中     
      addtime:[],
      options:[{
            value: '选项1',
            label: '生存'
          },
          {
            value: '选项2',
            label: '死亡'
          }],
      ruleForm: {
        name: '',
        ID:'',
        region:'',
        oldnew:'',
        specification:'',
        supply:'',
        inventory:'',
        volume:'',
        discount:'',
          cost:'',
          turnover:'',
        price:'',
        date1: '',
        state:''
        },
        rules: {
            name: [
              { required: true, message: '请输入商品名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            ID: [
              { required: true, message: '请输入商品编号', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
              region: [
                { required: true, message: '请选择爆款状态', trigger: 'change' }
              ],
              oldnew: [
                { required: true, message: '请选择新旧状态', trigger: 'change' }
              ],
              specification: [
              { required: true, message: '请输入商品规格', trigger: 'blur' },
              { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
            ],
            supply:[
              { required: true, message: '请输入供货量', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
            ],
            inventory:[
              { required: true, message: '请输入库存量', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
            ],
            volume:[
              { required: true, message: '请输入销量', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
            ],
            discount:[
              { required: true, message: '请输入折扣', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
            ],
              cost :[
              { required: true, message: '请输入成本价格', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3  到 10个字符', trigger: 'blur' }
            ],
            turnover:[
              { required: true, message: '请输入成交量', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
            ],
            price:[
              { required: true, message: '请输入今日售价', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
            ],
            date1: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            state: [
                { required: true, message: '请选择状态', trigger: 'change' }
            ],

            }
          };
        },
        components: {},
        mounted() {
          this.gettotalData()
          this.getData()
        },
          methods: {
              reset(){  //重置搜索框
                this.proCondition='';
                this.proName='';
              },
              changeCheck(index,row){//判断复选框checkbox是否处于选中状态
                if(this.checkboxchecked[index]==false){
                    this.checkboxchecked[index]=true;
                    this.currentRow=row;
                    this.currentRowIndex=index;
                }else{
                    this.checkboxchecked[index]=false;
                }
              },
              handleCurrentChange(val){
                this.current=val;
                this.getData();
              },
              gettotalData:function(obj){//获取数据总量
                var _this=this;
                this.$axios.post('http://localhost:9999/getProductNum.do')
                .then(function(res){
                  console.log(res.data.items[0])
                    _this.totalnum=res.data.items[0];
                    console.log(_this.totalnum)
                }).catch(function(err){
                    console.log(err)
                })
              },
              getData:function(){//获取当前页数据
                var _this=this;
                let postData=qs.stringify({
                  size:5,
                  current:_this.current
                })
                this.$axios.post('http://localhost:9999/productDetails.do',postData)
                .then(function(res){
                    _this.list=res.data;
                     for(var i=0;i<_this.list.items.length;i++){
                    var time=(new Date(_this.list.items[i].pro_storetime))
                    _this.addtime.push(_this.formatDate(time))
                  }
                }).catch(function(err){
                    console.log(err)
                })
              },
            handleDelete(){//删除商品
              let _this=this;
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                  center: true
              }).then(() => {
              for(var i=0;i<_this.list.items.length;i++){
                if(_this.checkboxchecked[i]==true){
                  let postData=qs.stringify({
                    pro_id:this.list.items[i].pro_id
                  })
                  _this.$axios.post('http://localhost:9999/deleteProduct.do',postData)
                  .then(function(res){
                  if(res.data.flag==1){
                      _this.Message('success','删除成功！')
                      _this.current=1;
                      _this.getData();
                      _this.gettotalData();
                      _this.initChecked()
                  }else{
                      _this.getData();
                      _this.Message('success','删除失败！')
                  }
                  }).catch(function(err){
                      console.log(err)
                  })
                }
              }
                      
              }).catch(() => {
                  _this.Message('info','取消删除！')
              });
                
            },
            initChecked(){//对复选框进行初始化
            console.log(12)
              this.checkboxchecked=[false,false,false,false,false]
              console.log(this.checkboxchecked)
            },
            Message(type1,message1){//操作的提示
                this.$message({
                    type: type1,
                    message:message1
                });
            },
            search(){ 
              let postData=qs.stringify({
                pro_condition:this.proCondition,
                pro_name:this.proName,
                size:5,
                current:this.currentSearch
              });
              let _this=this;
              this.$axios.post('http://localhost:9999/searchProduct.do',postData)
              .then(function(res){
                  if(res.data.flag==1){
                      _this.list=res.data;
                      for(var i=0;i<_this.list.items.length;i++){
                      var time=(new Date(_this.list.items[i].pro_type_addtime))
                      _this.addtime.push(_this.formatDate(time))
                      }
                  }
              }).catch(function(err){
                  console.log(err)
              })
              let postData1=qs.stringify({
                pro_condition:this.proCondition,
                pro_name:this.proName,
              });
              this.$axios.post('http://localhost:9999/getSearchProductNum.do',postData1)
                .then(function(res){
                    _this.totalnum=res.data.items[0];
                }).catch(function(err){
                    console.log(err)
                })
        },
        formatDate:function (date) { //日期转换 
            var y = date.getFullYear()
            var m = date.getMonth() + 1;  
            m = m < 10 ? '0' + m : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            return y + '-' + m + '-' + d;  
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        tankuang(){
          if(this.isShow){
              this.isShow=false;
          }else{
              this.isShow=true;
          }
        },
        tankuang2(){
          if(this.isShow2){
              this.isShow2=false;
          }else{
              this.isShow2=true;
          }
        },
        qingkong(){
          if(this.input10!=""||value4!=""){
            this.input10="";
            this.value4="";
          }
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
template{
  position:relative;
}
.div1{
  position: absolute;
  width:1090px ;
  height: 570px;
  top:90px;
  left:230px;
  background-color:white;
}
.section1{
  width: 1050px;
  height: 520px;
  /* border: 1px solid red; */
  position: relative;
}
.spxq{
  width: 150px;
  height: 43px;
  margin-left: 10px;
  /* border: 1px solid salmon; */
}
.spxq>h1{
  font-size: 16px;
  line-height: 0px;
  float: left;
  margin-left: 10px;
  margin-top:23px;
  color: #0078A8;
  font-family: 'iconfont';
}
.spxq>h1>span{
  font-size: 16px;
}
.hx{
  width: 1090px;
  border: 0.5px solid #E3E3E3;
}

.anniu{
  width: 90px;
  height: 34px;
  background-color: #FF9600;
  color: white;
  line-height: 35px;
  border-radius: 3px;
  position: absolute;
  top: 6px;
  left: 375px;
  font-size: 12px;
}
.anniu2{
  width: 90px;
  height: 34px;
  background-color: #FF9600;
  color: white;
  line-height: 35px;
  border-radius: 3px;
  position: absolute;
  top: 6px;
  left: 470px;
  font-size: 12px;
}
.anniu2:hover,.anniu:hover{
  background-color:#ff7800;
}
.tianjia,.bianji,.delete{
  width: 90px;
  height: 34px;
  background-color: #4F9ACD;
  color: white;
  line-height: 35px;
  font-size: 12px;
  position: absolute;
  top: 60px;
}
.tianjia{
  left:20px;
}
.tianjia:hover,.bianji:hover,.delete:hover{
  background-color:#FF9600;
}
.hx2{
  width: 1048px;
  margin: 10px auto;
  border: 0.5px solid #F2F2F2;
}
.bianji{
  left: 120px; 
}
.delete{
  left: 220px; 
}
#beijing,#beijing2{
  width: 1090px;
  background-color:rgba(0, 0, 0, 0.5);
  height: 565px;
  position: absolute;
  top:0px;
  z-index: 999;
}
#tjbd,#tjbd2{
  width:700px;
  height: 540px;
  float: left;
  background-color: white;
  position: absolute;
  top:15px; 
  left: 180px;
}
#page{
  position: absolute;
  top:490px;
  width: 100%;
}
</style>