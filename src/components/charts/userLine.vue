<!-- 用户折线图 -->
<template>
  <div>
      <h3>用户统计折线图</h3>
      <div id="cLine"></div>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return{
    }
  },

  components: {},

  computed: {},
  mounted(){
    this.drawLine();
  },
  methods: {
        drawLine(){
        let myline = this.$echarts.init(document.getElementById('cLine'))
        myline.setOption({
            title: { text: '数量' },
            tooltip: {},
            xAxis: {
                data: ['2015年','2016年','2017年','2018年']
            },
            yAxis: {},
            series: [
            {
              name:'数量',
              type:'line',
              data:[30,40,70,60,66],
              smooth:true,
              hoverAnimation:false,
              symbol:'rect',
              itemStyle:{
                normal:{
                  color:"yellow"
                }
              },
              lineStyle:{
                normal:{
                  color:"yellow",
                  type:"solid"
                }
              },
              areaStyle:{
                normal:{
                  color:"yellow",
                  opacity:'0.3'
                }
              }
            }]
        });
    }
  }
}
</script>
<style scoped>
#cLine{
  width:300px;
  height: 300px;
}
h3{
  margin-top:10px;
  width: 300px;
}
</style>