<template>
<!-- 商品类型模块 -->
    <div class="div1">
        <!-- 头部 -->
        <header> 
          <div class="spxq">  
              <!-- 第一行图标和文字 -->
              <h1>
                  <span>&#xe76f;</span>
                  商品类型
                  </h1>
          </div>
          <!-- 第二行线条 -->
          <div class="hx"></div>
        </header>
        <!-- 内容 -->
        <section>
            <div class="section1">
            <!-- 第一部分 -->
            <!-- 搜索框 -->
            <el-input placeholder="商品类型名称" style="width:170px;margin-left:-700px;font-size: 12px;" v-model="proName" clearable>
            </el-input>
            <!-- 状态选择框 -->
            <el-select v-model="proCondition" clearable placeholder="状态选择" style="margin-left:5px;width:170px;font-size: 12px;">
                <el-option label="生存" value="0"></el-option>
                <el-option label="死亡" value="1"></el-option>
            </el-select>
            <!-- 搜索按钮 -->
            <div class="anniu" @click="search()">搜索</div>
            <!-- 重置按钮 -->
            <div class="anniu2" @click="reset()">重置</div>
            <!-- 第二根线条 -->
            <div class="hx2"></div>
            <!-- 添加按钮 -->
            <div class="tianjia" @click="tankuang()"> 
             <i class="el-icon-circle-plus-outline"></i> 添加
            </div>
             <!-- 编辑按钮 -->
             <div class="bianji"  @click="editproductType()"> 
             <i class="el-icon-edit-outline"></i> 编辑
             </div>
             <!-- 表格部分 -->
             <div id="tab">
             <el-table :data="list.items" stripe border style="width:100%;font-size:14px;margin-top:24px;">
              <el-table-column  width="50px">
                <template slot-scope="scope">
                    <el-checkbox  @change="changeCheck(scope.$index, scope.row)"></el-checkbox>
                </template>
            </el-table-column>
              <el-table-column label="商品类型" >
              <template slot-scope="scope">{{scope.row.pro_type_name}}</template>
              </el-table-column>
              <el-table-column  prop="typeID" label="类型编号" >
              <template slot-scope="scope">{{scope.row.pro_type_id}}</template>
              </el-table-column>
              <el-table-column  prop="Adddate"  label="添加日期" >
                  <template slot-scope="scope">{{addtime[scope.$index]}}</template>
              </el-table-column>
              <el-table-column prop="state" label="生存状态" >
              <template slot-scope="scope">{{scope.row.pro_type_condition}}</template>
              </el-table-column>
            <el-table-column label="操作" width="260px">
            <template slot-scope="scope">
                <el-button  size="mini" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
            </el-table>
             </div>
            <!-- 分页部分 -->
            <el-pagination @current-change='handleCurrentChange' background  layout="prev, pager, next" :page-size="5" :total="parseInt(totalnum)" >
            </el-pagination>
             
            </div>
        </section>
        <!-- 添加按钮部分 -->
            <div class="zhezhao" v-show="isShow">
                 <!-- 弹出框 -->
             <div class="biaodan">
                 <!-- 商品名 -->
                <el-form :model="addRow"  label-width="110px" style="border:1px solid #F2F2F2;height:358px;" >
                <div style=" margin-top: 20px;">添加商品类型</div>
                <el-form-item label="商品类型" style="margin-top: 10px;margin-left: 5px;">
                    <el-input style="width:80%;margin-left:-50px;" v-model="addRow.pro_type_name"></el-input>
                </el-form-item>
                <!-- 日期 -->
                <el-form-item label="添加日期" required style="margin-left: 5px;">
                    <el-col :span="11" style="width:80%">
                    <el-form-item >
                        <el-date-picker type="date"  v-model="addRow.pro_type_addtime" placeholder="选择日期" style="width: 100%;margin-left:2px;"></el-date-picker>
                    </el-form-item>
                    </el-col>
                </el-form-item>
                <!-- 状态 -->
                 <el-form-item label="生存状态"  style="margin-left:5px">
                    <el-select v-model="addRow.pro_type_condition" placeholder="请选择状态" style="margin-left:-48px;width:80%">
                        <el-option label="生存" value="0"></el-option>
                        <el-option label="死亡" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="baocun" style=" margin-top: 20px;" @click="add">保存</div>
                    <div class="quxiao" @click="tankuang" style=" margin-top: 20px;">取消</div>
                </el-form>
             </div>
             </div>
       <!--编辑按钮部分 -->
            <div class="zhezhao" v-show="isShow2">
                 <!-- 弹出框 -->
             <div class="biaodan">
                 <!-- 商品名 -->
                <el-form :model="currentRow"  label-width="110px" style="border:1px solid #F2F2F2;height:358px;" >
                <div style=" margin-top: 20px;">编辑商品类型</div>
                <el-form-item label="商品类型"   style="margin-top: 10px;margin-left: 5px;">
                    <el-input v-model="currentRow.pro_type_name"  style="width:80%;margin-left:-48px;"></el-input>
                </el-form-item>
                <!-- ID -->
                <el-form-item label="类型编码" style="margin-left:5px;">
                    <el-input v-model="currentRow.pro_type_id" disabled style="width:80%;margin-left:-48px;"></el-input>
                </el-form-item>
                <!-- 日期 -->
                <el-form-item label="添加日期" required style="margin-left: 5px;">
                    <el-col :span="11" style="width:80%;margin-left:5px;">
                    <el-form-item>
                        <el-date-picker type="date" placeholder="选择日期" v-model="currentRow.pro_type_addtime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>
                </el-form-item>
                <!-- 状态 -->
                 <el-form-item label="商品状态"   style="margin-left:5px">
                    <el-select v-model="currentRow.pro_type_condition" placeholder="请选择状态" style="margin-left:-48px;width:80%">
                        <el-option label="生存" value="0"></el-option>
                        <el-option label="死亡" value="1"></el-option>
                    </el-select>
                    </el-form-item> 
                    <div class="baocun" style=" margin-top: 20px;" @click="update()">更新</div>
                    <div class="quxiao" @click="edit()" style=" margin-top: 20px;">取消</div>
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
    //  返回  
        return {
            list:[],//数据库中获取的数据
            totalnum:'',//数据库中数据总量
            current:1 ,//当前页码
            isShow:false,
            isShow2:false,
            proCondition:null,
            proName:'',
            status:[{'生存':0},{'死亡':1}],
            addtime:[],
            currentRow:{},//选中行
            currentRowIndex:'',//当前行的编号
            checkboxchecked:[false,false,false,false,false],//默认的所有复选框都未选中           
            addRow:{//添加
                pro_type_addtime:'',
                pro_type_addtime:'',
                pro_type_name:''
            }
        };
    },
    components: {},
    mounted() {
        this.gettotalNum()
        this.getData()
    },
    methods: {
        changeCheck(index,row){//判断复选框checkbox是否处于选中状态
            if(this.checkboxchecked[index]==false){
                this.checkboxchecked[index]=true;
                this.currentRow=row;
                this.currentRowIndex=index;
            }else{
                this.checkboxchecked[index]=false;
            }
        },
        gettotalNum:function(){
            let _this=this;
            this.$axios.post('http://localhost:9999/producttypenum.do')
            .then(function(res){
              _this.totalnum=res.data.items[0].num;
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
        tankuang(){
            if(this.isShow){//添加
                this.isShow=false;
            }else{
                this.isShow=true;
            }
        },
        edit(){//编辑弹框的显示
            if(this.isShow2){
                this.isShow2=false;
            }else{
                this.isShow2=true;
            }
        },
        update(){//修改商品类型信息
            let time=this.formatDate(this.currentRow.pro_type_addtime)
            console.log(time)
            let _this=this;
            let postData=qs.stringify({
                pro_type_addtime:time,
                pro_type_condition:this.currentRow.pro_type_condition,
                pro_type_name:this.currentRow.pro_type_name,
                pro_type_id:this.currentRow.pro_type_id
            })
            this.addtime[this.currentRowIndex]=time;
            this.$axios.post('http://localhost:9999/updateProductType.do',postData)
            .then(function(res){
                console.log(res.data.flag)
                if(res.data.flag==1){
                    _this.getData();
                     _this.edit()
                    _this.alert('修改成功');
                   
                }else{
                    _this.edit()
                    _this.alert('修改失败');
                }
            }).catch(function(err){
                console.log(err)
            })
        },
        add(){//增加商品类型
            let _this=this;
            let time=this.formatDate(this.addRow.pro_type_addtime)
            let postData=qs.stringify({
                pro_type_name:this.addRow.pro_type_name,
                pro_type_addtime:time,
                pro_type_condition:this.addRow.pro_type_condition
            })
            this.$axios.post('http://localhost:9999/addProductType.do',postData)
            .then(function(res){
                console.log(res.data)
                if(res.data.flag==1){
                    _this.getData();
                    _this.Message('success','添加成功');
                    _this.gettotalNum();
                }else{
                    _this.Message('info','修改失败');
                }
                _this.tankuang()
            }).catch(function(err){
                console.log(err)
            })
        },
        handleDelete(index,row){//删除商品类型
            let postData=qs.stringify({
                pro_type_id:row.pro_type_id
            })
            let _this=this;
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                _this.$axios.post('http://localhost:9999/deleteProductType.do',postData)
                .then(function(res){
                    if(res.data.flag==1){
                        _this.Message('success','删除成功！')
                        _this.current=1;
                        _this.getData();
                        _this.gettotalNum()
                    }else{
                        _this.getData();
                        _this.Message('success','删除失败！')
                    }
                    _this.getData()
                }).catch(function(err){
                    console.log(err)
                })
                
            }).catch(() => {
                _this.Message('info','取消删除！')
            });
            
        },
        Message(type1,message1){//操作的提示
            this.$message({
                type: type1,
                message:message1
            });
        },
        reset(){  //重置搜索框
            this.proCondition='';
            this.proName='';
        },
        search(){ 
            let postData=qs.stringify({
                    pro_type_condition:this.proCondition,
                    pro_type_name:this.proName
            });
            let _this=this;
             this.$axios.post('http://localhost:9999/searchProductType.do',postData)
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
        },
        handleCurrentChange(val){//点击按钮切换
            this.current=val;
            this.getData();
        },
        getData:function(){//获取当前页数据
            var _this=this;
            let postData=qs.stringify({
                size:5,
                current:_this.current
            })
            this.$axios.post('http://localhost:9999/productType.do',postData)
            .then(function(res){
                _this.list=res.data;
                for(var i=0;i<_this.list.items.length;i++){
                    var time=(new Date(_this.list.items[i].pro_type_addtime))
                    _this.addtime.push(_this.formatDate(time))
                }
            }).catch(function(err){
                console.log(err)
            })
        },
        editproductType:function(){//修改商品类型
            var j=0;
            for(var i=0;i<this.checkboxchecked.length;i++){
                if(this.checkboxchecked[i]==true){
                    j++;
                }
            }
            if(j==0){
                let str1="请选择需要编辑的数据"
                this.alert(str1)
            }else if(j==1){
                this.edit()
            }else if(j>1){
                let str2="选择数据过多，请选择一条数据"
                this.alert(str2)
            }
        },
        alert:function(str) {
            let _this=this;
            this.$alert(str, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                });
                }
            })
        },
        confirm() {
            let _this=this;
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
            }).then(() => {
            this.$message({
            type: 'success',
            message:'删除成功！'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message:'取消删除！'
            });
            });
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
.div1{
  width:1090px ;
  height: 570px;
  margin-top:90px;
  margin-left: 230px;
  background-color: white;

}
.el-form-item__label{
    text-align: left;
}
#tab{
    height: 330px;
}
.spxq{
  margin-left: 10px;
  width: 150px;
  height: 43px;
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
.hx{
  width: 1090px;
  /* height: 2px; */
  border: 0.5px solid #E3E3E3;
}
.section1{
  width: 1050px;
  height: 480px;
  margin: 20px auto;
  position: relative;
  
}
.anniu{
  width: 90px;
  height: 34px;
  background-color: #FF9600;
  color: white;
  line-height: 35px;
  border-radius: 3px;
  position: absolute;
  top: 3px;
  left: 360px;
  font-size: 12px;
}
.anniu:hover{
  background-color:#ff7800;
}
.anniu2{
  width: 90px;
  height: 34px;
  background-color: #FF9600;
  color: white;
  line-height: 35px;
  border-radius: 3px;
  position: absolute;
  top: 3px;
  left: 460px;
  font-size: 12px;
}
.anniu2:hover{
  background-color:#ff7800;
}
.tianjia{
  width: 90px;
  height: 34px;
  background-color: #4F9ACD;
  color: white;
  line-height: 35px;
  font-size: 12px;
  /* border-radius: 3px;
  position: absolute;
  top: 0px;
  left: 460px; */
}
.tianjia:hover{
  background-color:#FF9600;
}
.hx2{
  width: 1048px;
  margin: 10px auto;
  border: 0.5px solid #F2F2F2;
}
.bianji{
  width: 90px;
  height: 34px;
  background-color: #4F9ACD;
  color: white;
  line-height: 35px;
  font-size: 12px; 
  position: absolute;
  top: 62px;
  left: 100px; 
}
.bianji:hover{
  background-color:#FF9600;
  
}
.biaodan{
    width: 400px;
    height: 360px;
    float: left;
    background-color: white;
    position: absolute;
    top:100px; 
    left: 350px;
    border:1px solid rebeccapurple;
}
.zhezhao{
    width: 1090px;
    background-color:rgba(0, 0, 0, 0.5);
    height: 550px;
    position: absolute;
    top:90px;
    z-index: 999;
   
}
.baocun{
    width: 90px;
  height: 34px;
  background-color: #4F9ACD;
  color: white;
  line-height: 35px;
  font-size: 12px; 
  position: absolute;
  top:280px;
  left: 80px; 
}
.baocun:hover{
    background-color:#FF9600;
}
.quxiao{
    width: 90px;
  height: 34px;
  background-color: #4F9ACD;
  color: white;
  line-height: 35px;
  font-size: 12px; 
   position: absolute;
  top: 280px;
  left: 220px; 
}
.quxiao:hover{
    background-color:#FF9600;
}
</style>