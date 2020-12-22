<template>
  <!--  <div>用户信息</div>-->
  <div class="wrapper">
    <div class="cx">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item class="form-item-select" label="设备编号：">
         <!-- <el-select clearable v-model="searchForm.deviceno" placeholder="请选择设备编号" >
            <el-option  v-for="(item, i) in util" :key="i" :label="item" :value="item"></el-option>
          </el-select>-->
          <el-input v-model="searchForm.deviceno"  placeholder="请输入设备编号"  clearable></el-input>
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
        <el-table-column prop="unitname" label="单位名称" align="center" min-width="150" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="deviceno" label="设备编号" align="center" width="110"></el-table-column>
        <el-table-column prop="province" label="省名称" align="center" width="100"></el-table-column>
        <el-table-column prop="city" label="市名称" align="center" width="100" ></el-table-column>
        <el-table-column prop="area" label="区/县名称" align="center"  width="100"></el-table-column>
        <el-table-column prop="address" label="详细地址" align="center" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mainter" label="负责人" align="center"  width="100"></el-table-column>
        <el-table-column prop="tel" label="电话" align="center"  width="100"></el-table-column>
        <el-table-column prop="disable" label="是否禁用" align="center">
          <template slot-scope="scope">
            <el-tag  type="info" v-if=" scope.row.disable === 1">禁用</el-tag>
            <el-tag  type="success" v-if="scope.row.disable === 0">正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="addtime" label="创建时间"  align="center" minWidth="120">
          <template slot-scope="scope">
            <span>{{ scope.row.addtime| sjian}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="note" label="备注" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-menu" type="info" @click="weiz(scope.row)">查看位置</el-button>
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
        :title="`设备地址 - 设备编号为： ${editDialog.model.deviceno} `"
        width="700px">
        <el-amap
          vid="amapDemo"
          :center="center"
          :zoom="zoom"
          class="amap-demo"
          :events="events">
          <el-amap-marker v-for="(marker,i) in markers" :key="i"></el-amap-marker>
        </el-amap>
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
      let that = this;
      return {
        // 密码保存
        searchForm: { deviceno: '' },
        // 查询
        querySubmitForm: { deviceno: "" },
        list: [],
        // 总条数     页数      每页的条数
        pagination: { total: 0, pageNo: 1, length: 8 },
        editDialog: {
          isShow: false,
          id: 0,
          model: {
            deviceno: "",
          },
          rules: {  }
        },
        // 高德 地图
        zoom: 12,
        center: [],
        address: '',
        events: {
          click(e) {
            let { lng, lat } = e.lnglat;
            that.lng = lng;
            that.lat = lat;
            that.isshow =  false
          }
        },
        // 存放点击的坐标
        markers: [],
        util:[]
      }
    },
    methods: {
      // 请求数据
      _getData(){
        let that = this;
        that.util = []
        // ...that.searchForm,
        request({
          url: "base/device/list",
          method: "get",
          params: {
            length: that.pagination.length,
            pageNo: that.pagination.pageNo,
            deviceno:that.querySubmitForm.deviceno
          }
        })
          .then(function(response) {
            if (response.data.code === 20000) {
              that.list = response.data.data;
              that.pagination.total = response.data.recordsTotal;
              for (let i = 0; i < that.list.length; i++) {
                  let utils = that.list[i].deviceno;
                  that.util.push(utils);
              }
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
        that.searchForm.deviceno = ''
        that.querySubmitForm = Object.assign({}, this.searchForm);
        that._getData()
      },
      // 查看 设备地址
      weiz(row){
        let that = this;
        if (row.location == '' || row.location == null) {
          this.$message({
            message: `当前设备编号为 ${row.deviceno} 的没有经纬度，正在更新`,
            type: 'warning'
          });
        }else {
          that.editDialog.isShow = true
          that.editDialog.model.deviceno = row.deviceno;
          let str = row.location
          let arr = str.split(",")
          that.center = arr;
          that.markers.splice(0,1,row.location);
        }

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
  .amap-demo { height: 500px; }
</style>
