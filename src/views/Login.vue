<template>
  <div class="wrapper">
      <div class="box-wrapper">
        <div class="tp-box">
            <el-image src="../../static/login/bj.143c039.png"></el-image>
        </div>
        <div class="srk-box">
          <div class="srk-title">
            <b>巡检系统</b>
          </div>
          <div class="srk-wrapper">
            <el-form class="login" :model="model" ref="form" :rules="rules" status-icon>
              <el-form-item prop="username">
                <el-input type="text" placeholder="请输入账号" v-model="model.username"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="model.password"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button class="btn-log" type="danger" @click="login">登录</el-button>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import request from "@/utils/request";
  export default {
    name:'',
    data(){
        return{
          model: {
            username: "",
            password: ""
          },
          rules: {
            username: [
              { required: true, message: "账号不能为空..", trigger: "blur" },
              { max: 20, min: 3, message: "账号长度3 - 20之间..", trigger: "blur" }
            ],
            password: [
              { required: true, message: "密码不能为空..", trigger: "blur"},
              { max: 20, min: 5, message: "账号长度5 - 20之间..", trigger: "blur"}
            ]
          }
        }
    },
      methods:{
        login() {
          this.$refs.form
            .validate()
            .then(flag => {
              // 前台输入验证成功
              if (flag) {
                return request({
                  url: "auth/login",
                  method: "get",
                  params: this.model
                })
                  .then(function(response) {
                    if (response.data.code === 20000) {
                      // console.log(response,999)
                      let username = response.data.data.username;
                      localStorage.setItem("username", username);
                      localStorage.setItem("menuRouter", "welcome");
                      localStorage.setItem("crumbs", "");
                      localStorage.setItem("id", response.data.data.id);

                      localStorage.setItem("addtime", response.data.data.addtime);
                      localStorage.setItem("disable", response.data.data.disable);
                      localStorage.setItem("idno", response.data.data.idno);
                      localStorage.setItem("tel", response.data.data.tel);
                      localStorage.setItem("unitname", response.data.data.unitname);
                      localStorage.setItem("userrole", response.data.data.userrole);
                    }
                  });
              }
              // 验证失败
              else return new Promise(() => {});
            })
            .then(() => {
              this.$router.replace("/home");
            })
            .catch(() => {}); // 消除失败的promise在浏览中报的警告
        }
      },
      // 监听
      watch:{},
      created() {
        let that = this;
        document.onkeypress = function(e) {
          let keycode = document.all ? event.keyCode : e.which;
          if (keycode == 13) {
            that.login(); // 登录方法名
            return false;
          }
        };
        if(localStorage.getItem('id')) {
          this.$router.replace("/home");
        }
      },

  }
</script>
<style scoped>
  .wrapper{
    width: 100%;height: 100%;
    background: url("../../static/login/beijing.png") no-repeat center center;
    background-size: 101% 101%;
    display: flex;justify-content: center;align-items: center;
  }
  .box-wrapper{
    width: 45%;height: 45%;
    padding: 50px;box-sizing: border-box;
    background-color: rgba(255,255,255,0.5);
    display: flex;
  }
  .tp-box{ width: 50%;flex-shrink: 0;margin: 0 auto;display: flex;justify-content: center }
  .el-image{ width: 60%;height: 100% }
  .srk-box{ width: 50%;flex-shrink: 0;display: flex;flex-direction: column;padding-left: 10px;box-sizing: border-box }
  .srk-title{ height: 25%;display: flex;align-items: center;justify-content: center }
  .srk-title>b{ font-size: 30px;color: white;letter-spacing:17px }
  .srk-wrapper{ height: 75%;padding:0px 20px;box-sizing: border-box  }
  .btn-log{ width: 100% }
  .login{ display: flex;flex-direction: column;justify-content: space-around;height: 60% }
  .srk-wrapper{ display: flex;flex-direction: column;justify-content: space-around }
</style>
