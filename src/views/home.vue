<template>
  <el-container class="wrapper">
    <el-aside width="250px" :class="isShow ? 'yc' : ''">
      <div class="fhshouye curs bloack" @click="fhzy" >
<!--        <img src="../../static/home/logo.png" alt="">-->
<!--  黑色系列 -->
        <img src="../../static/home/tosunLOGO.png" style="width: 80%;height: 60%">
        <span class="wenzi-hei bkwenzi">巡检系统</span>
      </div>
      <div class="caidan bloack">
        <el-menu
          :default-active="activeTabName"
          class="hide-scroll-bar bloack"
          @select="addTab"
          text-color="#fff"
          background-color="black"
          active-text-color="#ffd04b"
          >
<!--          unique-opened-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="useradmin">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span>用户管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="userinfoapproval">
                <template slot="title">
                  <i class="el-icon-s-claim"></i>
                  <span>用户审批</span>
                </template>
              </el-menu-item>
              <el-menu-item index="unitadmin">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>单位管理</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-cooperation"></i>
              <span>设备管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="equipmentinfo">
                <template slot="title">
                  <i class="el-icon-s-order"></i>
                  <span>设备信息管理</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-promotion"></i>
              <span>巡检管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="pollinginfo">
                <template slot="title">
                  <i class="el-icon-s-management"></i>
                  <span>巡检信息</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-operation"></i>
              <span>可视化</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="equipmentmap">
                <template slot="title">
                  <i class="el-icon-s-grid"></i>
                  <span>设备分布图</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-help"></i>
              <span>营收</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="revenueReportAgent">
                <template slot="title">
                  <i class="el-icon-s-marketing"></i>
                  <span>营收报表(代理商)</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="revenueReportBusiness">
                <template slot="title">
                  <i class="el-icon-s-marketing"></i>
                  <span>营收报表(商务)</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
<!--                    <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-help"></i>
              <span>统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="pollingstat">
                <template slot="title">
                  <i class="el-icon-s-marketing"></i>
                  <span>巡检统计</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->
        </el-menu>
      </div>
    </el-aside>
    <el-container>
<!--      :class="activeTabName == 'welcome'? 'block' :''"-->
      <el-header :class="activeTabName == 'welcome'? 'block' :''">
        <div class="zhankai " >
          <i :class="isShow ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="zhankai" class="curs"></i>
          <span>当前位置：</span>
          <span v-if="activeTabName == 'welcome'">首页</span>
          <span separator-class="el-icon-arrow-right" v-if="activeTabName != 'welcome'">
            <span  style="font-size: 15px" @click="shouye" class="curss">首页</span>
            <span> > </span>
            <span  v-if="currentMenu" style="font-size: 15px" >{{currentMenu}}</span>
          </span>
        </div>
        <div class="box-xx">
          <div class="sjian-box">
            <i style="background: url('../../static/home/时间.svg') no-repeat center;width: 16px;height: 16px;display: inline-block;background-size: 100%"></i>
            {{date | formatDate}}
          </div>
          <div>|</div>
          <div class="sfen-box">
            <i class="el-icon-user-solid"  style="font-size: 16px;"></i>
            您好， {{username}}
          </div>
          <div>|</div>
          <el-badge is-dot class="item">
<!--            :class="activeTabName == 'welcome'? 'bkwenzi' :''"-->
            <el-dropdown trigger="click" @command="handleCommand" :class="activeTabName == 'welcome'? 'bkwenzi' :''">
              <span class="curs">
                <i class="el-icon-s-home" style="font-size: 16px;"></i>
                个人中心
              </span>
              <el-dropdown-menu slot="dropdown" class="marpad0">
                <el-dropdown-item command="logOut"><i class="el-icon-upload2"></i> 注销</el-dropdown-item>
                <el-dropdown-item command="beginUpdatePassword"><i class="el-icon-edit"></i>修改密码</el-dropdown-item>
                <el-dropdown-item command="fullScreen"><i class="el-icon-full-screen"></i>全屏显示</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-badge>
        </div>
      </el-header>
      <el-main v-for="tab in tabs" :key="tab">
        <component :is="tabsMap[tab].component" ></component>
      </el-main>
    </el-container>
    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormPassword"
      width="600px"
    >
      <el-form :model="passwordModel" label-width="100px" ref="form" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="passwordModel.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="原密码">
          <el-input v-model="passwordModel.password" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item prop="newpassword" label="新密码">
          <el-input v-model="passwordModel.newpassword" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormPassword = false">取 消</el-button>
        <el-button type="primary" @click="savePassword">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>


<script type="text/ecmascript-6">
  // 全屏显示插件
  import screenfull from 'screenfull';
  // 全局导入 网络请求
   import request from "@/utils/request";
  import {Message, MessageBox} from "element-ui";
  export default {
    name: '',
    data() {
      let validatePass2 = (rule, value, callback) => {
        if (value !== this.passwordModel.newPwd1) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        isShow:false,                  // 图标 左边菜单 切换
        date: new Date(),              // 当前时间
        timer:null,                    // 定时器
        activeTabName:'',              // 激活的
        tabs:[''],                     // 显示的
        tabsMap: {               // 所有的可能的会显示的选项卡
          welcome: {
            label: '首页',
            component: resolve => require(['./welcome/index.vue'], resolve)
          },
          useradmin:{
            label: '用户管理',
            component: resolve => require(['./useradmin/index.vue'], resolve)
          },
          userinfoapproval:{
            label: '用户审批',
            component: resolve => require(['./userinfoapproval/index.vue'], resolve)
          },
          unitadmin:{
            label: '单位管理',
            component: resolve => require(['./unitadmin/index.vue'], resolve)
          },
          equipmentinfo:{
            label: '设备信息管理',
            component: resolve => require(['./equipmentinfo/index.vue'], resolve)
          },
          pollinginfo:{
            label: '巡检信息',
            component: resolve => require(['./pollinginfo/index.vue'], resolve)
          },
          pollingstat:{
            label: '巡检统计',
            component: resolve => require(['./pollingstat/index.vue'], resolve)
          },
          equipmentmap:{
            label: '设备分布图',
            component: resolve => require(['./equipmentmap/index.vue'], resolve)
          },
          revenueReportAgent:{
            label: '营收报表(代理商)',
            component: resolve => require(['./revenueReportAgent/index.vue'], resolve)
          },
          revenueReportBusiness:{
            label: '营收报表(商务)',
            component: resolve => require(['./revenueReportBusiness/index.vue'], resolve)
          },
        },                // 路由
        dialogFormPassword: false,     // 密码修改弹窗
        passwordModel: {
          username: "",
          password: "",
          newpassword: ""
        },// 密码保存
        rules: {
          username: [
            { required: true, message: "账号不能为空..", trigger: "blur" }
          ],
          password: [
            { required: true, message: "原密码不能为空", trigger: "blur" },
            { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
          ],
          newpassword: [
            { required: true, message: "新密码不能为空", trigger: "blur" },
            { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
          ]
        },                  // 表单验证
        isFullscreen: false,           // 全屏显示
        currentMenu:null,              // 面包屑 - 二级标题
        username:localStorage.getItem("username"),// 当前的管理员
      }
    },
    methods: {
      // 菜单展开 图标切换
      zhankai() {
        this.isShow = !this.isShow
      },
      // 当前时间变化
      shuaxin(){
        let that = this
        that.timer = setInterval(function () {
          that.date = new Date()//修改数据让他可以实时更新
        }, 1000);
      },
      // 个人中心  修改密码弹窗 - 弹出登陆 - 全屏显示
      handleCommand(command){
        if (command === "logOut") {
          let that = this;
          this.$confirm("确定要退出登录吗？", "提示", {
            showClose: false,
            type: "warning"
          })
            .then(() => {
              // console.log(1111)
              request({
                url: "auth/logout",
                method: "get"
              })
                .then(function (response) {
                  if (response.data.code === 20000) {
                    // this.$cookies.remove('token');                        // 清除cookie中残留的过期的token
                    // localStorage.removeItem("id");
                    localStorage.clear(); // 清空localStorage
                    that.$router.replace("/login"); // 跳转到登录页
//                      localStorage.clear(); // 清空sessionStorage

                    return new Promise(() => {
                    }); // 返回一个永远是pending的promise对象
                  }
                })
                .catch(function (error) {
                  console.log(error, "报错信息");
                });

            })
            .catch(() => {})
        }
        if (command === "beginUpdatePassword") {
          this.dialogFormPassword = true;
        }
        if (command === "fullScreen") {
          screenfull.toggle();
          this.isFullscreen = true;
        }
      },
      // 是否全屏并按键ESC键的方法
      checkFull() {
        let isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
        // to fix : false || undefined == undefined
        if (isFull === undefined) {
          isFull = false;
        }
        return isFull;
      },
      // 切换菜单 - 面包屑
      addTab(index, indexPath){
        let that = this
        that.tabs.splice(0,1,index);
        that.activeTabName = index;
        localStorage.setItem("menuRouter", index);
        let a = indexPath[1]
        let arr = Object.values(that.tabsMap)
        let arrs = Object.keys(that.tabsMap)
        let res =  arrs.indexOf(a)
        that.currentMenu = arr[res].label;
        localStorage.setItem("crumbs", that.currentMenu);
      },
      // 点击图片 返回主页 面包屑
      fhzy(){
        localStorage.setItem("menuRouter", "welcome");
        this.tabs.splice(0,1,'welcome');
        this.activeTabName = 'welcome';
        this.$router.replace("/"); // 跳转到主页
        this.currentMenu = null
      },
      // 点击面包屑
      shouye(){
        localStorage.setItem("menuRouter", "welcome");
        this.tabs.splice(0,1,'welcome');
        this.activeTabName = 'welcome';
        this.$router.replace("/"); // 跳转到主页
        this.currentMenu = null
      },
      // 密码修改 弹窗
      savePassword(){
        let that = this;
        that.$refs.form
          .validate()
          .then(flag => {
            if (flag){
              return request({
                url: "auth/changePassword",
                method: "POST",
                params: {
                  username: that.passwordModel.username,
                  password: that.passwordModel.password,
                  newpassword: that.passwordModel.newpassword
                }
              })
                .then(function (response) {
                  // console.log(25122121);
                  // console.log(response);
                  if (response.data.code === 20000) {
                    that.dialogFormPassword = false;
                    MessageBox.alert(
                      "密码修改成功，请重新登录",
                      "提示",
                      {
                        confirmButtonText: "确定",
                        type: "warning"
                      }
                    ).then(() => {
                      // localStorage.removeItem("id");
                      // localStorage.removeItem("menus");
                      // localStorage.removeItem("menuRouter");
                      // localStorage.removeItem("rolesId");
                      // localStorage.removeItem("units");
                      // localStorage.removeItem("username");
                      localStorage.clear(); // 清空localStorage
                      that.$router.replace("/login"); // 跳转到登录页
                    });
                  }
                  return Promise.resolve(response);
                })
                .catch(function (error) {
                  console.log(error, "报错信息");
                });

            }
            // 验证失败
            else return new Promise(() => {});
          })
        .catch(() =>{})
      },
    },
    watch: {
      // 弹窗 关闭 清除
      dialogFormPassword(newValue) {
        if (!newValue) {
          // 关闭dialog时清空表单
          this.passwordModel.oldpwd = "";
          this.passwordModel.newPwd1 = "";
          this.passwordModel.newPwd2 = "";
          this.$refs.form.resetFields();
        }
      }
    },
    filters: {
      // 时间过滤器
      formatDate(val) {
        let Y = val.getFullYear();
        let M = (val.getMonth() + 1).toString().padStart(2,'0');
        let D = val.getDate().toString().padStart(2,'0');
        let H = val.getHours().toString().padStart(2,'0');
        let MI = val.getMinutes().toString().padStart(2,'0');
        let S = val.getSeconds().toString().padStart(2,'0');
        return Y + "年" + M + "月" + D + "日" +' ' + H + ":" + MI + ":" + S
      }
    },
    created() {
      this.activeTabName = localStorage.getItem("menuRouter");
      this.tabs[0] = localStorage.getItem("menuRouter");
      this.currentMenu = localStorage.getItem("crumbs");

      // 当前时间
      this.shuaxin()
      // 判断是否需要重新登陆
      if (localStorage.getItem("id") === null) {
        this.$router.replace("/");
      }
    },
    mounted() {
      window.onresize = () => {
        // 全屏下监控是否按键了ESC
        if (!this.checkFull()) {
          // 全屏下按键esc后要执行的动作
          this.isFullscreen = false
        }
      }
    },
    beforeDestroy: function () {
      // 清除定时器
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  }
</script>

<style scoped>
  .wrapper{ width: 100%;height: 100%;}
  /* 白色系列 */
  /*.el-aside{ display: flex;flex-direction: column;border-right: 1px solid black }*/
  .el-aside{ display: flex;flex-direction: column; }
  .fhshouye{
    height: 18%;border-bottom: 1px solid black;
    display: flex;flex-direction: column;
    justify-content: space-around;align-items: center;
    padding: 10px;box-sizing: border-box
  }
  .fhshouye>span{ font-size: 30px;letter-spacing:8px }
  .caidan{ flex-grow: 1; }
  .el-submenu{ width: 250px }
  .el-header{ border-bottom: 1px solid black;display: flex;justify-content: space-between;align-items: center }
  .zhankai{ width: 450px;height: 100%;display: flex;align-items: center; }
  .zhankai>i{ font-size: 25px;margin-right: 50px }
  .box-xx{ width: 652px;height: 100%;display: flex;align-items: center;justify-content: space-around;margin-right: 50px; }
  .sjian-box{  }
  .sfen-box{  }
  .el-main{ padding: 0 }
  .yc{ display: none }
  .curss{ cursor: pointer; }
  .curss:hover{ color: #42b983; }
</style>
