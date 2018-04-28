<!-- 商品折线图 -->
<template>
  <div>
      <h3>商品数量折线图</h3>
      <div id="pLine"></div>
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
    this.drawpLine();
  },
   methods: {
        drawpLine(){
        let myline = this.$echarts.init(document.getElementById('pLine'))
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
              data:[150,110,200,305,230],
              smooth:true,
              hoverAnimation:false,
              symbol:'rect',
              itemStyle:{
                normal:{
                  color:"blue"
                }
              },
              lineStyle:{
                normal:{
                  color:"blue",
                  type:"solid"
                }
              },
              areaStyle:{
                normal:{
                  color:"blue",
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
#pLine{
  width:300px;
  height: 300px;
}
h3{
  margin-top:10px;
  width: 300px;
}
</style>