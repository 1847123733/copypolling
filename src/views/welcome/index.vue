<template>
  <div class="wrapper">
    <img src="./huanying.png" alt="">
  </div>
</template>



<script type="text/ecmascript-6">
export default {
    name:'index',
    data(){
        return{

        }
},
    methods:{},
    // 对象创建完成
    created() { },

}
</script>

<style scoped>
  .wrapper{
    width: 100%;height: 100%;
    display: flex;justify-content: center;align-items: center;
    /*background-color: #f0f0f0;*/
    background-color: rgb(239,241,244);
    background: url("../../../static/login/beijing.png" ) no-repeat center;
    background-size: 101% 101%;
  }
</style>
