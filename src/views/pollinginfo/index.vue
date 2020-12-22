<template>
  <!--  <div>用户信息</div>-->
  <div class="wrapper">
    <div class="cx">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item class="form-item-select" label="设备编号：">
          <el-input v-model="searchForm.deviceno"  placeholder="请输入设备编号"  clearable></el-input>
        </el-form-item>
        <el-form-item class="form-item-select" label="巡检人：">
          <el-input v-model="searchForm.name"  placeholder="请输入巡检人"  clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="goon" icon="el-icon-search" @click="querySubmit" size="medium">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button   icon="el-icon-refresh-right" @click="beginAdd" size="medium">重置查询条件</el-button>
        </el-form-item>
<!--        <el-form-item style="float: right;margin-right: 250px">-->
<!--          <el-button type="primary"  icon="el-icon-plus" @click="beginAdds" size="medium">新增</el-button>-->
<!--        </el-form-item>-->
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
        <el-table-column prop="deviceno" label="设备编号" align="center" min-width="100"></el-table-column>
        <el-table-column prop="name" label="巡检人员姓名" align="center" min-width="100"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column prop="result" label="巡检结果" align="center" min-width="100">
          <template slot-scope="scope">
            <el-button type="text"  v-if="scope.row.result === 0" icon="el-icon-link" style="color: green">合格</el-button>
            <el-button type="text" v-else icon="el-icon-connection" style="color: red">不合格</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="addtime" label="创建时间"  align="center" width="150" ></el-table-column>
        <el-table-column prop="abnormalmsg" label="异常说明"  align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" width="130">
          <template slot-scope="scope">
            <el-button  size="mini" icon="el-icon-tickets" type="info" @click="beginLock(scope.row)">详情信息</el-button>
<!--            <el-button size="mini" icon="el-icon-edit" type="amend" @click="beginUpdate(scope.row)" >修改</el-button>-->
<!--            <el-button size="mini" icon="el-icon-delete" type="danger" @click="beginRemove(scope.row.id)">删除</el-button>-->
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
        title="详情信息"
        width="600px">
        <div class="zhaopian">
          <div style="float: left;width: 50%;display: flex;flex-direction: column">
            <div style="text-align: center">设备图片：</div>
            <div v-if="editDialog.model.devicephoto != ''|| editDialog.model.devicephoto != null" class="tup">
              <img src="./zw.jpg"  width="80%" >
            </div>
            <div v-else  class="tup">
              <img :src="editDialog.model.devicephoto" width="80%">
            </div>
          </div>
          <div style="float: left;width: 50%">
            <div style="text-align: center">设备地址图片：</div>
            <div v-if="editDialog.model.scenephoto != ''|| editDialog.model.scenephoto != null"  class="tup">
              <img src="./zw.jpg" alt="" width="80%" >
            </div>
            <div v-else  class="tup">
              <img :src="editDialog.model.scenephoto" width="80%">
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="xx">
          <div style="float: left;width: 50%;;padding-left: 50px;box-sizing: border-box" >
            <div style="margin-bottom: 30px">设备编号：{{editDialog.model.deviceno}}</div>
            <div style="margin-bottom: 30px">巡检人员：{{editDialog.model.name}}</div>
          </div>
          <div style="float: left;width: 50%;padding-left: 50px;box-sizing: border-box">
            <div style="margin-bottom: 30px">地址：{{editDialog.model.address}}</div>

            <div style="margin-bottom: 30px">巡检时间：{{editDialog.model.addtime}}</div>
            <div style="margin-bottom: 30px">异常说明：{{editDialog.model.abnormalmsg}}</div>
          </div>
          <div class="clearfix"></div>
        </div>
        <!--编辑对话框底部按钮-->
        <div slot="footer">
<!--          <el-button type="primary" @click="save">保存</el-button>-->
          <el-button @click="editDialog.isShow = false">取消</el-button>
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
        searchForm: { deviceno: '',name:"" },
        querySubmitForm: { deviceno: "",name:"" },
        list: [],
        // 总条数     页数      每页的条数
        pagination: { total: 0, pageNo: 1, length: 8 },
        editDialog: {
          isShow: false,
          id: 0,
          model: {
            devicephoto: "",
            scenephoto: "",
            deviceno: "",
            name: "",
            address: "",
            addtime: "",
            abnormalmsg: "",
          },
          rules: {  }
        }
      }
    },
    methods: {
      // 请求数据
      _getData(){
        let that = this;
        // ...that.searchForm,
        request({
          url: "base/patrol/list",
          method: "get",
          params: {
            length: that.pagination.length,
            pageNo: that.pagination.pageNo,
            deviceno:that.querySubmitForm.deviceno,
            name:that.querySubmitForm.name,
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
      // 查询按钮
      querySubmit(){
        this.querySubmitForm = Object.assign({}, this.searchForm);
        this._getData()
      },
      // 重置按钮
      beginAdd(){
        let that = this
        that.searchForm.name = ''
        that.searchForm.deviceno = ''
        that.querySubmitForm = Object.assign({}, this.searchForm);
        that._getData()
      },
      // 查看图片
      beginLock(row){
        this.editDialog.isShow = true
        this.editDialog.model.scenephoto = row.scenephoto
        this.editDialog.model.devicephoto = row.devicephoto
        this.editDialog.model.deviceno = row.deviceno
        this.editDialog.model.name = row.name
        this.editDialog.model.address = row.address
        this.editDialog.model.addtime = row.addtime
        this.editDialog.model.abnormalmsg = row.abnormalmsg
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
                url: "/patrol/base/sysUser/add",
                method: "post",
                data: {
                  /*  ...that.editDialog.model,
                    roleIds: that.roleIds,
                    date: Date.parse(new Date())*/
                }
              })
                .then(function(response) {
                  if (response.data.code === 20000) {
                    that.editDialog.isShow = false;
                    // console.log(response)
                    // that.$message({
                    //   type: "success",
                    //   message: "新增成功"
                    // });
                    // that.getData();
                  }
                })
                .catch(function(error) {
                  console.log(error, "报错信息");
                });
            }else {
              // 修改
            }
          })
          .catch(() => {});
      },
      // 删除
      beginRemove(id){

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
    watch: {},
    //存放 过滤器
    filters: {
      sjian(val){
          // console.log(val[1])
          return val[0] +'-'+ val[1].toString().padStart(2,'0')+'-'+val[2].toString().padStart(2,'0')+' '+val[3].toString().padStart(2,'0')+':'+val[4].toString().padStart(2,'0')+':'+val[5].toString().padStart(2,'0')
      }
    },
    created() {
      this._getData()
    },
  }
</script>

<style scoped>
  .wrapper{ width: 100%;height: 100%;background-color: #f0f0f0; }
  .demo-form-inline{ margin-left: 15px }
  .demo-form-inline>*{ padding-top: 15px;box-sizing: border-box }
  .fenye{ text-align: center }
  .tup{ display: flex;justify-content: center; }
</style>
