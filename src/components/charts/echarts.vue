<template>
  <div>
      <div id="myChart" :style="{width:'400px',height:'400px'}"></div>
      <div id="pie" :style="{width:'400px',height:'400px'}">></div>
  </div>
</template>
<script>
export default {
  name: 'demo',
  data () {
    return {
    
    }
  },
  mounted(){
    this.drawLine()
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '统计' },
            tooltip: {},
            xAxis: {
                data: ["会员","产品","订单","产品类型"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10],
            }]
            ,
            legend:{
              show:true,
                name: '销量',
              orient:'horizontal',
              // borderColor:'#df3434',
              borderWidth:2
              // data:['蒸发量','降水量','最低气温']
            }
        });
        let mypie = this.$echarts.init(document.getElementById('pie'))
        mypie.setOption({
          series:[{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            itemStyle: {
            normal: {
              shadowBlur: 200,// 阴影的大小
              shadowOffsetX: 0, // 阴影水平方向上的偏移
              shadowOffsetY: 0,// 阴影垂直方向上的偏移
              shadowColor: 'rgba(0, 0, 0, 0.5)'// 阴影颜色
            }
            },
            data:[
              {value:400, name:'会员数量'},
              {value:335, name:'产品数量'},
              {value:10, name:'产品类型'},
              {value:100, name:'订单数量'},
              {value:1000, name:'成交数量'}
            ]
          }],
          legend:{
            show:true,
            name: '访问来源',
            orient:'horizontal',
            borderWidth:2
          }
        })
    }
  }
}
</script>
<style scoped>
#line{
  border: 1px solid saddlebrown
}
</style>
