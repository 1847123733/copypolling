<template>
    <div class="wrapper">
      <div class="shuzixx">
        <div class="biaoti" style="padding-bottom: 5px;box-sizing: border-box">
          <span>昨日营收汇总：</span>
        </div>
        <div class="yingshouxx">
          <div class="sheb">
            <div class="tup">
              <img src="../../../static/revenueReportAgent/sbslpng.png" height="60%" style="margin-top: 2px">
              <div>
                <b>设备数量</b>
              </div>
            </div>
            <div class="shebxx">
              <div>
                <div><b>辖区设备数：</b></div>
                <h3 class="shebyanse ztiyanse">100台</h3>
              </div>
              <div>
                <div><b>单台平均：</b></div>
                <h3 class="shebyanse ztiyanse">1台</h3>
              </div>
            </div>
          </div>
          <div class="sheb tiyan">
            <div class="tup">
              <img src="../../../static/revenueReportAgent/tyrs.png" height="60%" style="margin-top: 2px">
              <div><b>体检人数</b></div>
            </div>
            <div class="shebxx">
              <div>
                <div><b>体检人数(辖区)：</b></div>
                <h3 class="tijianyanse ztiyanse">100台</h3>
              </div>
              <div>
                <div><b>体检人数：</b></div>
                <h3 class="tijianyanse ztiyanse">1台</h3>
              </div>
            </div>
          </div>
          <div class="sheb paizhao">
            <div class="tup">
              <img src="../../../static/revenueReportAgent/pzp.png" height="60%" style="margin-top: 2px">
              <div><b>拍照数量</b></div>
            </div>
            <div class="shebxx">
              <div>
                <div><b>拍照人数(辖区)：</b></div>
                <h3 class="pzhaoyanse ztiyanse">100台</h3>
              </div>
              <div>
                <div><b>拍照人数：</b></div>
                <h3 class="pzhaoyanse ztiyanse">1台</h3>
              </div>
            </div>
          </div>
          <div class="sheb zsr">
            <div class="tup">
              <img src="../../../static/revenueReportAgent/zsr.png" height="60%" style="margin-top: 2px">
              <div><b>总收益</b></div>
            </div>
            <div class="shebxx">
              <div>
                <div><b>总收入(辖区)：</b></div>
                <h3 class="zsryanse ztiyanse">100台</h3>
              </div>
              <div>
                <div><b>总收入：</b></div>
                <h3 class="zsryanse ztiyanse">1台</h3>
              </div>
            </div>
          </div>

        </div>
        <div class="xunjianqx" style="padding-top: 5px;box-sizing: border-box">
          <div class="xunjianbiaoti" style="padding-bottom: 5px;padding-top: 5px;box-sizing: border-box">
            <span>昨日设备巡检情况：</span>
          </div>
          <div class="xunjianxx">
            <ul class="xunjian-wrapper">
              <li>
                <div style="letter-spacing:8px"><b>辖区设备数</b></div>
                <div class="xunjianyanse">
                  <i class="el-icon-s-data"></i><b>50台</b>
                </div>
              </li>
              <li>
                <div style="letter-spacing:8px"><b>已巡检</b></div>
                <div style="font-size: 25px;color: #42b983">
                  <i class="el-icon-circle-check"></i><b>50台</b>
                </div>
              </li>
              <li>
                <div style="letter-spacing:8px"><b>未巡检</b></div>
                <div style="font-size: 25px;color: #ffba00">
                  <i class="el-icon-circle-close"></i><b>50台</b>
                </div>
              </li>
              <li>
                <div style="letter-spacing:8px"><b>合格</b></div>
                <div style="font-size: 25px;color: #5daf34">
                  <i class="el-icon-check"></i><b>50台</b>
                </div>
              </li>
              <li>
                <div style="letter-spacing:8px"><b>不合格</b></div>
                <div style="font-size: 25px;color: #dd6161">
                  <i class="el-icon-close"></i><b>50台</b>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="biaogexx">
        <!--<div class="cx">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item class="form-item-select" label="日期：">
              <el-input v-model="searchForm.username"  placeholder="请选择查询日期"  clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="goon" icon="el-icon-search" @click="querySubmit" size="medium">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button   icon="el-icon-refresh-right" @click="beginAdd" size="medium">重置查询条件</el-button>
            </el-form-item>
          </el-form>
        </div>-->
        <div class="dailissr">
          <div class="dailissrbiaoti" style="padding-bottom: 5px;box-sizing: border-box">
            <span>昨日代理商收入情况：</span>
          </div>
          <div class="dailissrbiao">
            <el-table
              :data="list"
              border
              :header-cell-style="{background:'rgb(203,227,251)',color:'rgb(76,164,255)'}"
                height="212px">
              <el-table-column label="序号" align="center" width="50">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column prop="xx1" label="设备编号" align="center"></el-table-column>
              <el-table-column prop="xx2" label="设备投放地点" align="center"></el-table-column>
              <el-table-column prop="xx3" label="体检人数" align="center"></el-table-column>
              <el-table-column prop="xx4" label="拍照人数" align="center"></el-table-column>
              <el-table-column prop="xx5" label="总收入" align="center"></el-table-column>
            </el-table>
            <div class="fy" style="text-align: center">
              <el-pagination
                class="el-pagination"
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
          </div>
        </div>
        <div class="lisxunjian">
          <div class="dailissrbiaoti" style="padding-bottom: 5px;box-sizing: border-box">
            <span>昨日历史巡检：</span>
          </div>
          <div class="dailissrbiao">
            <el-table
              :data="list1"
              border
              :header-cell-style="{background:'rgb(203,227,251)',color:'rgb(76,164,255)'}"
              height="212px">
              <el-table-column label="序号" align="center" width="50">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column prop="xx1" label="设备编号" align="center"></el-table-column>
              <el-table-column prop="xx2" label="设备投放地点" align="center"></el-table-column>
              <el-table-column prop="xx3" label="结果" align="center"></el-table-column>
              <el-table-column prop="xx4" label="详情" align="center"></el-table-column>
              <el-table-column prop="xx5" label="巡检时间" align="center"></el-table-column>
              <el-table-column prop="xx6" label="巡检人" align="center"></el-table-column>
              <el-table-column prop="xx7" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" icon="el-icon-menu" type="info" >查看图片</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="fy" style="text-align: center">
              <el-pagination
                class="el-pagination"
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
          </div>
        </div>
      </div>
    </div>
</template>



<script type="text/ecmascript-6">
export default {
    name:'index',  // 代理商
    data(){
      return{
        searchForm:{ username:'' },
        list:[
          { xx1:'tjjsbbh150521',xx2:'广东省深圳市南山区某驾校',xx3:'10',xx4:'70',xx5:'2000' },
          { xx1:'tjjsbbh150522',xx2:'山东省聊城市临清市某驾校',xx3:'10',xx4:'70',xx5:'2000' },
          { xx1:'tjjsbbh150523',xx2:'山东省青岛市城阳区某驾校',xx3:'10',xx4:'70',xx5:'2000' },
        ],
        list1:[
          { xx1:'tjjsbbh150521',xx2:'广东省深圳市南山区某驾校',xx3:'合格',xx4:'无',xx5:'2020-08-20 14:00:00',xx6:'李超' },
          { xx1:'tjjsbbh150522',xx2:'山东省聊城市临清市某驾校',xx3:'不合格',xx4:'xxxxxxxxx',xx5:'2020-08-21 14:00:00',xx6:'王世伟' },
          { xx1:'tjjsbbh150523',xx2:'山东省青岛市城阳区某驾校',xx3:'合格',xx4:'无',xx5:'2020-08-22 14:00:00',xx6:'阿萨德' },
        ],
        // 总条数     页数      每页的条数
        pagination: { total: 100, pageNo: 1, length: 8 },
      }
    },
    methods:{
      querySubmit(){},
      beginAdd(){},
      // 换每页条数
      sizeChangeHandler(length) {
        this.pagination.length = length;
        // this._getData();
      },
      // 换页
      currentChangeHandler(pageNo) {
        this.pagination.pageNo = pageNo;
        // this._getData();
      },
    },
    filters: {},
    watch:{},
    created() { },
    mounted() {
    }
}
</script>

<style scoped>
  .wrapper{
    width: 100%;height: 100%;
    background-color: #f0f0f0;
    display: flex;flex-direction: column;
    padding: 15px;box-sizing: border-box;
  }
  .shuzixx{ height: 30%;display: flex;flex-direction: column; }
  .biaoti{ height: 10%; }
  .yingshouxx{ height: 50%;display: flex;justify-content: space-around; }
  .yingshouxx>div{ width: 18%;background-color:white;display: flex;border-radius: 10px;box-shadow: 0 5px 5px 0 rgba(0, 0, 0, .25); transition: all .2s ease-in-out  }
  .yingshouxx>div>div{ width: 50%; }
  .tup{ display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around; }

  .shebxx{ display: flex;flex-direction: column;justify-content: space-around;align-items: center }
  .shebxx>div{ display: flex;flex-direction: column;justify-content: space-around;align-items: center }
  .shebyanse{ color: rgb(236,174,207) }
  .tijianyanse{ color: rgb(200,243,230) }
  .pzhaoyanse{ color: rgb(172,190,255) }
  .zsryanse{ color: rgb(254,201,201) }
  .ztiyanse{ color: rgb(61,133,254) }
  .xunjianyanse{ color: rgb(71,205,253);font-size: 25px }
  .xunjianqx{ height: 30%; }
  .xunjianxx,.xunjian-wrapper{ height: 100% }
  .xunjian-wrapper{ display: flex;justify-content: space-around; }
  .xunjian-wrapper>li{
    width: 18%;
    display: flex;flex-direction: column;justify-content: space-around;align-items: center;
    background-color :white;border-radius: 10px;box-shadow: 0 5px 5px 0 rgba(0, 0, 0, .25); transition: all .2s ease-in-out
  }

  .biaogexx{ height: 591px;padding-top: 15px;box-sizing: border-box;display: flex;flex-direction: column; }
  .dailissr{ height: 50%; }
  .lisxunjian{ height: 50%; }
  .fy{ margin-top: 5px }


</style>
