<!--  -->
<template>
  <div id="userManage">
      <ul>
          <li><span class='i'>&#xe641;</span><p>活跃人数</p></li>
          <li><span class='i'>&#xe663;</span><p>会员总数</p></li>
          <li><span class='i'>&#xe695;</span><p>上升比例</p></li>
      </ul>
      <div id="tab">
        <div id="tabcontent">
          <el-table id='usertable' stripe :data="list.items" border style="width: 930px">
            <el-table-column label="会员编号"  width="200px">
            <template slot-scope="scope">{{scope.row.user_id}}</template>
            </el-table-column>
            <el-table-column  label="会员姓名"  width="234px">
            <template slot-scope="scope">{{ scope.row.user_name }}</template>
            </el-table-column>
             <el-table-column  label="会员性别"  width="235px">
            <template slot-scope="scope">{{ scope.row.user_sex }}</template>
            </el-table-column>
            <el-table-column label="操作" width="260px">
            <template slot-scope="scope">
                <!-- <el-button  size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                <el-button size='mini' ><router-link :to="'/userdetail/'+scope.row.user_id">查看</router-link></el-button>
                <el-button  size="mini" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        </div>
         <el-pagination  background :page-size="5"
         @current-change='handleCurrentChange' layout="prev, pager, next" :total="totalnum.num"></el-pagination>        
      </div>
      <!-- <el-button type="text" @click="open6">点击打开 Message Box</el-button> -->
      <!-- <div id="formdiv" v-show="isShow">
        <el-form id="form" :model="currentRow" label-width="100px" class="demo-ruleForm">
          <h3>编辑会员</h3>
          <el-form-item label="会员编号：">
            <el-col :span="20"><el-input v-model="currentRow.user_id" disabled></el-input></el-col>
          </el-form-item>
          <el-form-item label="会员姓名：">
            <el-col :span="20"><el-input v-model="currentRow.user_name"></el-input></el-col>
          </el-form-item>
          <el-form-item label="会员性别：">
            <el-col :span="20">
            <el-radio-group v-model="currentRow.user_sex">
              <el-radio label="男" value='男'></el-radio>
              <el-radio label="女" value='女'></el-radio>
            </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-col :span="20"><el-input v-model="currentRow.user_tel"></el-input></el-col>
          </el-form-item>
          <el-form-item label="出生日期:">
            <el-col :span="20">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="currentRow.user_birth" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span='20'>
            <el-button type="primary" @click="handleChange(currentRow)">更新</el-button>
            <el-button @click="handleQuitChange">取消</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </div> -->
  </div>
</template>

<script type="text/javascript">
import qs  from 'qs'
export default {
  data () {
    return {
        list:[],//数据库中获取的数据
        totalnum:'',//数据库中数据总量
        current:1 //当前页码
        // isShow:false,
        // currentRow:{}
        // deletemessage:'删除成功！'
    };
  },
  components: {},
  mounted() {
    this.gettotalData()
    this.getData()
  },
  methods: {
      // handleEdit(index, row) {
      //   if(this.isShow==false){
      //     this.isShow=true;
      //   }
      //   this.currentRow=row;
      // },
      handleDelete(index, row) {
        let postData=qs.stringify({
          user_id:row.user_id
        })
        let _this=this;
        this.$axios.post('http://localhost:9999/userCancellation.do',postData)
        .then(function(res){
          console.log(res.data)
        }).catch(function(err){
          console.log(err)
        })
        this.confirm()
        this.getData()
      },
      handleCurrentChange(val){
        this.current=val;
        this.getData();
        this.gettotalData();
      },
      // handleQuitChange(){
      //   if(this.isShow==true){
      //     this.isShow=false;
      //   }
      // },
      // handleChange(val){
      //   let postData=qs.stringify({
      //     user_id:val.user_id,
      //     user_tel:val.user_tel,
      //     user_birth:val.user_birth,
      //     user_name:val.user_name,
      //     user_sex:val.user_sex
      //   })
      //   this.$axios.post('http://localhost:9999/edituser.do',postData)
      //   .then(function(res){
          
      //   }).catch(function(err){
      //     console.log(err)
      //   })
      // },
      gettotalData:function(){//获取数据总量
        var _this=this;
        this.$axios.post('http://localhost:9999/userpage.do')
        .then(function(res){
            _this.totalnum=res.data;
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
        this.$axios.post('http://localhost:9999/user.do',postData)
        .then(function(res){
            _this.list=res.data;
        }).catch(function(err){
            console.log(err)
        })
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
  src: url('//at.alicdn.com/t/font_642232_l5g5cygats6k1emi.eot');
  src: url('//at.alicdn.com/t/font_642232_l5g5cygats6k1emi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_642232_l5g5cygats6k1emi.woff') format('woff'),
  url('//at.alicdn.com/t/font_642232_l5g5cygats6k1emi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_642232_l5g5cygats6k1emi.svg#iconfont') format('svg');
}
template{
  position: relative;
}
#userManage{
  position:absolute;
  left: 200px;
  top:68px;
  height:570px;
  width: 1149px;
  overflow: auto;
}
ul{
    margin-top:20px;
    margin-left: 80px;
    height: 150px;
}
ul>li{
    list-style: none;
    float: left;
    width: 270px;
    height: 120px;
    margin-left: 62px;
    color: white;
}
ul>li:nth-child(1){
    margin-left: 10px;
    background-color: #F06868;
}
ul>li:nth-child(2){
    background-color: #07B38B;
}
ul>li:nth-child(3){
    background-color: #018ADA;
}
#tab{
  width: 930px;
  height: 380px;
  margin-left:83px;
  padding: 10px 10px;
  background-color:white;
}
#tabcontent{
  height: 330px;
}
.i{
  font-family:iconfont;
  color:white;
  font-size:60px;
  position: relative;
  top:20px;
}
ul>li>p{
  position: relative;
  top:20px;
}
#formdiv{
  position: absolute;
  width:1100px;
  top:0px;
  /* border:1px solid red; */
  background-color: #f5f5f5bd;
  height: 640px;
}
#form{
  padding-top: 20px;
  margin: 150px auto;
  width:300px;
  height:410px;
  background-color: white;
  border-radius: 5px;
}
#form h3{
  margin-bottom: 20px;
}
a:-webkit-any-link{
  text-decoration:none;
  color:black;
}
</style>