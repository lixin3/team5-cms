<!-- 图表 -->
<template>
  <div>
    <m-echarts
      :echartStyle="s"
      :titleText="a"
      :tooltipFormatter="b"
      :opinion="c"
      :seriesName="d"
      :opinionData="e"
      v-on:currentEchartData="getEchartData"
    ></m-echarts>
  </div>
</template>
 
<script>
  import mEcharts from './circleEchart.vue'
  export default {
    name: 'Dialog',
    components: {
      mEcharts
    },
    data(){
      return {
        a:'统计',
        b:'数量',
        c:['产品数量','产品种类','订单数量','会员数量'],
        d:'数量统计',
        e:[
            {value:13, name:'产品数量'},
            {value:21, name:'产品种类'},
            {value:32, name:'订单数量'},
            {value:25, name:'会员数量'}
          ],
        s: {
          height: ''
        }
      }
    },
    created(){
      // 获取屏幕高度
      this.s.height = document.documentElement.clientHeight - 44 + 'px';
    },
    methods: {
      getEchartData(val){
        console.log(val);
      }
    }
  }
</script>
 
<style scoped>
</style>