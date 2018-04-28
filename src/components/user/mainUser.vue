<!-- 主页面最新用户 -->
<template>
  <div id="newuser">
    <h5><span></span>最新用户</h5>
    <hr>
      <ul>
        <li v-for='item in list'>
            <img class='imgs' :src="item.imgurl" />
            {{item.name}}
        </li>
      </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
        list:[
          {name:'krystal',imgurl:'static/user1.jpeg'},
          {name:'jimin',imgurl:'static/user2.jpg'},
          {name:'krystal',imgurl:'static/user1.jpeg'},
          {name:'jimin',imgurl:'static/user2.jpg'},
          {name:'krystal',imgurl:'static/user1.jpeg'},
          {name:'jimin',imgurl:'static/user2.jpg'},
          {name:'krystal',imgurl:'static/user1.jpeg'},
          {name:'jimin',imgurl:'static/user2.jpg'}
        ]
    };
  }
}

</script>
<style scoped>
.imgs{
  width: 80px;
  height:80px;
  border-radius: 40px;
}
ul>li{
  list-style: none;
  float: left;
  width: 80px;
  margin-top:20px;
  margin-left:40px;
}
ul>li:nth-child(1){
  margin-left: 20px;
}
#newuser{
  width: 1000px;
  background-color:rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  height: 150px;
}
h5{
  text-align: left;
  padding-left: 20px;
  padding-top:5px;
}
hr{
  border: white 1px solid
}
</style>