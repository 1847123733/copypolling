<template>
<!--  <div>用户信息</div>-->
  <div class="wrapper">
    <div class="cx">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item class="form-item-select" label="用户名：">
          <el-input v-model="searchForm.username"  placeholder="请输入用户名"  clearable></el-input>
        </el-form-item>

        <el-form-item label="用户状态：" class="form-item-select">
          <el-select v-model="searchForm.disables" placeholder="请选择用户状态" @change="selectUnitName5" clearable>
            <el-option v-for="item in startss" :key="item.index" :label="item.label" :value="item.zt" ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="goon" icon="el-icon-search" @click="querySubmit" size="medium">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button   icon="el-icon-refresh-right" @click="beginAdd" size="medium">重置查询条件</el-button>
        </el-form-item>
        <el-form-item style="float: right;margin-right: 250px">
          <el-button type="primary"  icon="el-icon-plus" @click="beginAdds" size="medium">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="biaoge">
      <el-table
        :data="list"
        border
        :header-cell-style="{background:'rgb(203,227,251)',color:'rgb(76,164,255)'}"
        height="660px">
        <el-table-column label="序号" align="center" width="50">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="unitname" label="单位名称" align="center" width="190" show-overflow-tooltip></el-table-column>
        <el-table-column prop="userrole" label="用户角色" align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-user-solid" v-if="scope.row.userrole === 1">高级管理员</el-button>
            <el-button type="text" icon="el-icon-s-promotion" v-else-if="scope.row.userrole === 2" style="color: green">巡检人员</el-button>
            <el-button type="text" icon="el-icon-office-building" v-else-if="scope.row.userrole === 3" style="color: darkblue">地区代理</el-button>
            <el-button type="text" icon="el-icon-sell" v-else-if="scope.row.userrole === 4" style="color: red" >销售/商务人员</el-button>
            <el-button type="text" icon="el-icon-link" v-else style="color: sandybrown">暂无角色</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="openid" label="微信唯一标识" align="center" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="姓名" align="center" width="70"></el-table-column>
        <el-table-column prop="username" label="用户名" align="center" width="100"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center" width="100"></el-table-column>
        <el-table-column prop="idno" label="身份证明号码" align="center" width="150"></el-table-column>
        <el-table-column prop="disable" label="状态" align="center" width="100">
          <template slot-scope="scope">
            <div v-if=" scope.row.disable === 2">
              <el-popover placement="top" trigger="hover" >
                <div class="look" v-if="scope.row.note == '' || scope.row.note == null">
                  审核失败原因：无
                </div>
                <div class="look" v-else>
                  审核失败原因：{{ scope.row.note  }}
                </div>
                <el-tag slot="reference"  type="danger">审核不通过</el-tag>
              </el-popover>
            </div>
            <div v-else-if="scope.row.disable === 0">
              <el-tag  type="success">通过审核</el-tag>
            </div>
            <div v-else>
              <el-tag  type="warning">待审核</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="addtime" label="注册时间"  align="center" width="140" ></el-table-column>
        <el-table-column prop="updatetime" label="更新时间"  align="center" width="140" ></el-table-column>
<!--        <el-table-column prop="adduserid" label="注册人" align="center" ></el-table-column>-->
        <el-table-column prop="note" label="备注" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-edit" type="amend" @click="beginUpdate(scope.row)" >修改</el-button>
            <el-button size="mini" icon="el-icon-delete" type="danger" @click="beginRemove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="fenye">
      <el-pagination
        background
        @size-change="sizeChangeHandler"
        @current-change="currentChangeHandler"
        :current-page="pagination.pageNo"
        :page-sizes="[6, 8, 10, 20, 30, 40]"
        :page-size="pagination.length"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      ></el-pagination>
    </div>
    <div class="tanchuang">
      <el-dialog
        class="dialog-edit"
        :visible.sync="editDialog.isShow"
        :title="`用户 - ${ editDialog.mode ? '新增' : '修改' }`"
        width="650px">
        <!--用mode判断新增或修改，true表示新增，false表示修改-->
        <!--编辑对话框表单-->
        <el-form
          :model="editDialog.model"
          :rules="editDialog.rules"
          label-width="120px"
          ref="form"
        >
          <div style="float: left;width: calc(50% - 10px);margin-right: 10px">
            <el-form-item label="单位类型：" prop="unittype" v-if="editDialog.mode" style="margin-bottom: 30px">
              <el-select v-model="editDialog.model.unittype" placeholder="请选择单位类型" @change="selectUnitName8" clearable>
                <el-option v-for="(item,i) in utiltype" :key="i" :label="item.label" :value="item.index" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名：" prop="name" style="margin-bottom: 30px">
              <el-input v-model="editDialog.model.name" placeholder="请输入姓名" ></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="tel" style="margin-bottom: 30px">
              <el-input v-model="editDialog.model.tel" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="身份证明号码：" prop="idno" style="margin-bottom: 30px">
              <el-input v-model="editDialog.model.idno" placeholder="请输入身份证明号码"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="note" style="margin-bottom: 30px">
              <el-input v-model="editDialog.model.note" placeholder="请输入备注"></el-input>
            </el-form-item>
          </div>
          <div style="float: left;width: 50%;">
            <el-form-item label="单位名称：" prop="unitname" v-if="editDialog.mode" style="margin-bottom: 0px">
              <el-select v-model="editDialog.model.unitname" placeholder="请选择单位名称" @change="selectUnitName9" clearable :disabled="utilInfo.length == 0 ">
                <el-option v-for="(item,i) in utilInfo" :key="i" :label="item.unitname" :value="item.id" ></el-option>
              </el-select>
              <span style="color: red;" >请先选择单位类型</span>
<!--              <span style="display: block;height: 30px" v-else></span>-->
            </el-form-item>
            <el-form-item label="用户角色：" prop="userrole" style="margin-bottom: 30px">
              <el-select v-model="editDialog.model.userrole" placeholder="请选择用户角色" @change="selectUnitName7" clearable>
                <el-option v-for="item in juese" :key="item.index" :label="item.label" :value="item.index" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名：" prop="username" style="margin-bottom: 30px">
              <el-input v-model="editDialog.model.username" placeholder="请输入用户名" :disabled="!editDialog.mode" ></el-input>
            </el-form-item>
            <el-form-item label="用户状态：" prop="disable" style="margin-bottom: 30px" v-if="!editDialog.mode">
<!--              :disabled="!editDialog.mode"-->
              <el-select v-model="editDialog.model.disable" placeholder="请选择用户状态" @change="selectUnitName6" clearable >
                <el-option v-for="item in startss" :key="item.index" :label="item.label" :value="item.index" ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="clearfix"></div>
        </el-form>
        <!--编辑对话框底部按钮-->
        <div slot="footer">
          <el-button icon="el-icon-refresh-right"  @click="czsj">重置输入</el-button>
          <el-button icon="el-icon-check" type="primary" @click="save">保存</el-button>
          <el-button icon="el-icon-close" @click="editDialog.isShow = false"  type="info">取消</el-button>

        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  // 导入 网络请求
  import request from "@/utils/request";
  export default {
    name: 'index',
    data() {
      return {
        // 密码保存
        searchForm: { username: '',disables:'' },
        // 查询
        querySubmitForm: { username: "",disables:''},
        list: [],
        // 总条数     页数      每页的条数
        pagination: { total: 0, pageNo: 1, length: 8 },
        editDialog: {
          isShow: false,
          mode: true,
          id: 0,

          model: {
            unitname: "",
            userrole: "",
            name: "",
            username: "",
            tel: "",
            idno: "",
            disable: "",
            note: "",
            unitid: null,
            unittype:'',
            openid:""
          },
          rules: {
            unitname: [
              { required: true, message: "单位名称不能为空", trigger: "blur" }
            ],
            unittype: [
              { required: true, message: "单位类型不能为空", trigger: "blur" }
            ],
            userrole: [
              { required: true, message: "用户角色不能为空", trigger: "blur" }
            ],
            name: [
              { required: true, message: "姓名不能为空", trigger: "blur" }
            ],
            username: [
              { required: true, message: "用户名不能为空", trigger: "blur" }
            ],
            tel: [
              {
                validator: (rule, value, callback) => {
                  if (value === "") callback(new Error("手机号码不能为空"));
                  else if (!/^1[3456789]\d{9}$/.test(value))
                    callback(new Error("请输入正确的手机号码"));
                  else callback();
                },
                trigger: "blur",
                required: true,
              }
            ],
            idno: [
              {
                validator: (rule, value, callback) => {
                  if (value === "") callback(new Error("身份证号不能为空"));
                  else if (
                    !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(
                      value
                    )
                  )
                    callback(new Error("请输入正确的身份证号"));
                  else callback();
                },
                trigger: "blur",
                required: true,
              }
            ],
            disable: [
              { required: true, message: "用户状态不能为空", trigger: "blur" }
            ],

          }
        },
        // 用户状态
        startss:[
          { index:0,zt:'0',label:'正常' },
          { index:1,zt:'1',label:'待审核' },
          { index:2,zt:'2',label:'审核不通过' }
        ],
        // 用户角色
        juese:[
          { index:1,label:'高级管理员' },
          { index:2,label:'巡检人员' },
          { index:3,label:'地区代理' },
          { index:4,label:'销售/商务人员' },
        ],
        // 单位类型
        utiltype:[
          { index:'1',label:'代理商' },
          { index:'2',label:'车管所' },
          { index:'3',label:'驾校' },
          { index:'4',label:'医疗机构' },
        ],
        // 单位信息
        utilInfo:[]
      }
    },
    methods: {
      // 请求数据
      _getData(){
        let that = this;
      // ...that.searchForm,
        request({
          url: "base/sysUser/list",
          method: "get",
          params: {
            length: that.pagination.length,
            pageNo: that.pagination.pageNo,
            username: that.querySubmitForm.username,
            disable: that.querySubmitForm.disables,
          }
        })
          .then(function(response) {
            if (response.data.code === 20000) {
              that.list = response.data.data;
              that.pagination.total = response.data.recordsTotal;
            }
          })
          .catch(function(error) {
            console.log(error, "报错信息");
          });
      },
      // 请求单位数据
      _getUtilData(){
        let that = this;
        request({
          url: "base/sysUnit/getAllUnitList",
          method: "get",
          params: {
            unittype:that.editDialog.model.unittype
          }
        })
          .then(function(response) {
            if (response.data.code === 20000) {
              that.utilInfo = response.data.data;

            }
          })
          .catch(function(error) {
            console.log(error, "报错信息");
          });
      },
      // 查询按钮
      querySubmit(){
        this.querySubmitForm = Object.assign({}, this.searchForm);
        this._getData()
      },
      // 重置按钮
      beginAdd(){
        let that = this
        that.searchForm.username = ''
        that.searchForm.disables = ''
        that.querySubmitForm = Object.assign({}, this.searchForm);
        that._getData()
      },
      // 新增按钮
      beginAdds(){
        this.editDialog.mode = true;
        this.editDialog.isShow = true;
      },
      // 编辑
      beginUpdate(row){
        this.editDialog.mode = false;
        this.editDialog.isShow = true;

        this.editDialog.id = row.id;
        this.editDialog.model.unitname = row.unitname;
        this.editDialog.model.userrole = row.userrole;
        this.editDialog.model.openid = row.openid;
        this.editDialog.model.name = row.name;
        this.editDialog.model.username = row.username;
        this.editDialog.model.tel = row.tel;
        this.editDialog.model.idno = row.idno;
        this.editDialog.model.disable = row.disable;
        this.editDialog.model.note = row.note;

      },
      // 保存  编辑 - 修改
      save(){
        this.$refs.form
          .validate()
          .then(() => {
            if (this.editDialog.mode) {
              // 新增
              let that = this;
              request({
                url: "base/sysUser/add",
                method: "POST",
                data: {
                  unitid:that.editDialog.model.unitid,
                  unitname:that.editDialog.model.unitname,
                  userrole:that.editDialog.model.userrole,
                  openid:that.editDialog.model.openid,
                  name:that.editDialog.model.name,
                  username:that.editDialog.model.username,
                  tel:that.editDialog.model.tel,
                  idno:that.editDialog.model.idno,
                  disable:that.editDialog.model.disable,
                  note:that.editDialog.model.note,
                }
              })
                .then(function(response) {
                  if (response.data.code === 20000) {
                    // console.log(response)
                    that.editDialog.isShow = false;
                    // console.log(response)
                    that.$message({
                      showClose: true,
                      duration:0,
                      type: "success",
                      message: response.data.message,

                    });
                    that._getData();
                  }
                })
                .catch(function(error) {
                  console.log(error, "报错信息");
                });
            }
            else {
              // 修改
              let that = this;
              request({
                url: "base/sysUser/update",
                method: "PUT",
                data: {
                  id: that.editDialog.id,
                  userrole:that.editDialog.model.userrole,
                  name:that.editDialog.model.name,
                  username:that.editDialog.model.username,
                  tel:that.editDialog.model.tel,
                  idno:that.editDialog.model.idno,
                  disable:that.editDialog.model.disable,
                  note:that.editDialog.model.note,
                }
              })
                .then(function(response) {
                  if (response.data.code === 20000) {
                    that.editDialog.isShow = false;
                    that.$message({
                      type: "success",
                      message: "修改成功"
                    });
                    that._getData();
                  }
                })
                .catch(function(error) {
                  console.log(error, "报错信息");
                });

            }
          })
          .catch(() => {});
      },
      // 删除
      beginRemove(row){
        // console.log(typeof(row.id))
        this.$confirm(`确定要删除账号为 ‘ ${row.username} ’ 吗？`, "提示", {
          showClose: false,
          type: "warning"
        })
          .then(() => {
            let that = this;
            request({
              url: 'base/sysUser/delete',
              method: "DELETE",
              params:{
                id:row.id,
                username:row.username
              }
            })
              .then(function(response) {
                if (response.data.code === 20000) {
                  that.$message({
                    type: "success",
                    message: "删除成功"
                  });
                  that._getData();
                }
              })
              .catch(function(error) {
                console.log(error, "报错信息");
              });
          })
          .catch(() => {});
      },
      // 切换用户状态选项  条件
      selectUnitName5(val){
        // console.log(val,'选中的')
        if(val == null || val == '') return
        else {
          let obj = {};
          obj = this.startss.find(item => {
            return item.zt === val;
          });
          this.searchForm.disable = obj.zt;
          // console.log(typeof(this.searchForm.disable))
        }
      },
      // 切换用户状态选项  弹窗
      selectUnitName6(val){
        if(val == null || val == '') return
        else {
          let obj = {};
          obj = this.startss.find(item => {
            return item.zt === val;
          });
          this.editDialog.model.disable = obj.zt;
          // console.log(typeof(this.searchForm.disable))
        }
      },
      // 切换用户角色  弹窗
      selectUnitName7(val){
        if(val == null || val == '') return
        else {
          let obj = {};
          obj = this.juese.find(item => {
            return item.index === val;
          });
          this.editDialog.model.userrole = obj.index;
          // console.log(typeof(this.searchForm.disable))
        }
      },
      // 切换单位类型 弹窗
      selectUnitName8(val){
        // console.log(val)
        this.utilInfo = [];
        this.editDialog.model.unitname = "";
        if(val == null || val == '') return
        else {
          this.editDialog.model.unittype = val;
          this._getUtilData()
        }
      },
      // 切换单位名称  数据在单位类型改变 改变
      selectUnitName9(val){
        if(val == null || val == '') return
        else {
          let obj = {};
          obj = this.utilInfo.find(item => {
            return item.id === val;
          });
          this.editDialog.model.unitname = obj.unitname
          this.editDialog.model.unitid = obj.id
        }
      },
      // 重置数据  按钮
      czsj(){
        this.editDialog.model.unitname = '';
        this.editDialog.model.userrole = '';
        this.editDialog.model.openid = '';
        this.editDialog.model.name = '';
        this.editDialog.model.username = '';
        this.editDialog.model.tel = '';
        this.editDialog.model.idno = '';
        this.editDialog.model.disable = '';
        this.editDialog.model.note = '';

        this.utilInfo = [];

        this.$refs.form.resetFields();
      },
      // 换每页条数
      sizeChangeHandler(length) {
        this.pagination.length = length;
        this._getData();
      },
      // 换页
      currentChangeHandler(pageNo) {
        this.pagination.pageNo = pageNo;
        this._getData();
      },
    },
    watch: {
      "editDialog.isShow"(newValue) {
        if (!newValue) {
          // 关闭dialog时清空表单
          this.$refs.form.resetFields();
          this.editDialog.id = 0;
          this.editDialog.model.unitname = '';
          this.editDialog.model.userrole = '';
          this.editDialog.model.openid = '';
          this.editDialog.model.name = '';
          this.editDialog.model.username = '';
          this.editDialog.model.tel = '';
          this.editDialog.model.idno = '';
          this.editDialog.model.disable = '';
          this.editDialog.model.note = '';
          this.editDialog.model.unittype = '';
          this.utilInfo = [];

        }
      }
    },
    created() {
      this._getData()
      // this._getUtilData()
    },
  }
</script>

<style scoped>
  .wrapper{ width: 100%;height: 100%;background-color: #f0f0f0; }
  .demo-form-inline{ margin-left: 15px }
  .demo-form-inline>*{ padding-top: 15px;box-sizing: border-box }
  .fenye{ text-align: center; }
</style>
