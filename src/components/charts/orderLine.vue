<!-- 订单折线图 -->
<template>
  <div>
      <h3>订单数量折线图</h3>
      <div id="oLine"></div>
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
    this.drawoLine();
  },
   methods: {
        drawoLine(){
        let myorderline = this.$echarts.init(document.getElementById('oLine'))
        myorderline.setOption({
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
              data:[20,80,110,98,120],
              smooth:true,
              hoverAnimation:false,
              symbol:'rect',
              itemStyle:{
                normal:{
                  color:"pink"
                }
              },
              lineStyle:{
                normal:{
                  color:"pink",
                  type:"solid"
                }
              },
              areaStyle:{
                normal:{
                  color:"pink",
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
#oLine{
  width:300px;
  height: 300px;
}
h3{
  margin-top:10px;
  width: 300px;
}
</style>