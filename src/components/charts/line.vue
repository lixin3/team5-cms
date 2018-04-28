<!--  -->
<template>
  <div>
      <h2>折线图</h2>
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
            title: { text: '统计' },
            tooltip: {},
            xAxis: {
                data: ['2015年','2016年','2017年','2018年']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: [50, 20, 36, 3,30],
                smooth:true,
                areaStyle: {normal:{
                  // color:"blue"
                }},
                itemStyle: {
                  normal: {
                    // color:"blue"
                },
                areaStyle:{
                  normal:{
                    // color:"blue"
                  }
                }
              }
            },
            {
              name:'产品',
              type:'line',
              data:[70,50,30,100,90],
              smooth:true,
              hoverAnimation:false,
              symbol:'rect',
              itemStyle:{
                normal:{
                  color:"#4ba6f9"
                }
              },
              lineStyle:{
                normal:{
                  color:"#4ba6f9",
                  type:"solid"
                }
              },
              areaStyle:{
                normal:{
                  color:"#4ba6f9",
                  opacity:'0.3'
                }
              }
            },
            {
              name:'订单',
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
            }],
            legend:{
              show:true,
              name: '销量',
              orient:'horizontal'// vertical
              // borderWidth:2
            }
        });
    }
  }
}
</script>
<style scoped>
#cLine{
  width: 500px;
  height: 400px;
  margin:0px auto;
}
</style>