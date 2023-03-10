<template>
  <div class="container">
    <div class="text">
      <div class="left">
        <img class="dashboard-text-img" :src="avatar" alt="">
        <div>
          <p class="name-box">您好，{{ showName }}</p>
          <p class="role-box">角色名称：{{ roleName }}</p>
        </div>
      </div>
      <div class="right">
        <div>
          <p>全部项目</p>
          <p>{{ allNum }}</p>
        </div>
        <div>
          <p>已完成项目</p>
          <p>{{ projectFinishNum }}</p>
        </div>
      </div>
    </div>
    <!-- 整体项目概况 -->
    <div class="center">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h6>整体项目情况</h6>
        </div>
        <div class="content">
          <span>
            <p>全部项目</p>
            <p>{{ allNum }}</p>
          </span>
          <span>
            <p>正在录入</p>
            <p>{{ inputNum }}</p>
          </span>
          <span>
            <p>待审核</p>
            <p>{{ inputFinishNum }}</p>
          </span>
          <span>
            <p>施工中</p>
            <p>{{ inBuildNum }}</p>
          </span>
          <span>
            <p>待验收</p>
            <p>{{ buildFinishNum }}</p>
          </span>
          <span>
            <p>并网录入</p>
            <p>{{ girdConnectionInputNum }}</p>
          </span>
          <span>
            <p>并网审核</p>
            <p>{{ girdConnectionInputFinishNum }}</p>
          </span>
          <span>
            <p>项目完成</p>
            <p>{{ projectFinishNum }}</p>
          </span>
        </div>
      </el-card>
    </div>
    <!-- 项目区域分布情况 -->
    <!-- <div class="footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目区域分布情况</span>
        </div>
        <div class="text item">
          <div id="left" style="width: 600px;height:400px;" />
          <div id="right" style="width: 600px;height:400px;" />
        </div>
      </el-card>
    </div> -->
  </div>
</template>

<script>
// import * as echarts from 'echarts'
import { getProjectStatusNum } from '@/api/listProject/index'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      'allNum': '--', // 全部
      'inputNum': '--', // 正在录入
      'inputFinishNum': '--', // 待审核
      'inBuildNum': '--', // 施工中
      'buildFinishNum': '--', // 待验收
      'girdConnectionInputNum': '--', // 并网录入中
      'girdConnectionInputFinishNum': '--', // 并网待审核
      'projectFinishNum': '--' // 项目完成数量
    }
  },
  computed: {
    ...mapGetters([
      'name', 'avatar', 'userInfo', 'showName'
    ]),
    roleName() {
      if (this.name === 'admin') {
        return '管理员'
      }

      const roleName = this.userInfo?.role?.roleName
      if (typeof roleName !== 'undefined') {
        return roleName
      }

      return '--'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getProjectStatusNum().then(({ data }) => {
        const keys = ['allNum', 'inputNum', 'inputFinishNum', 'inBuildNum', 'buildFinishNum', 'girdConnectionInputNum', 'girdConnectionInputFinishNum', 'projectFinishNum']
        for (const key of keys) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            this.$set(this, key, data[key])
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    font-size: 14px;

    .name-box {
      font-size: 20px;
      color: #383838;
    }

    .role-box {
      color: #999;
    }

    .text {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
      .left {
        display: flex;
        margin: 10px 0 0 10px;
        img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 20px;
        }
      }
      .right {
        display: flex;
        text-align: center;
        margin: 10px;
      }
    }
  }
  .el-card {
    margin: 20px;
  }

  .clearfix {
    & > h6 {
      margin: 0;
    }
  }

  .content {
    display: flex;
    width: 100%;
    text-align: center;
  }

  .content > span, .right > div {
    position: relative;
    flex-grow: 1;

    &:not(:last-child):before {
      content: "";
      position: absolute;
      right: 0;
      top: calc(50% - 16px);
      height: 32px;
      width: 1px;
      background-color: #bbb;
    }

    > p {
      margin: 8px 0;
    }

    > p:first-child {
      color: #888;
    }

    > p:last-child {
      $textColor: lighten(#2B292D, 10%);
      color: $textColor;
      font-size: 26px;
      font-weight: 500;
      text-shadow: $textColor 0 0 1px;
    }
  }

  .right > div {
    padding: 0 20px;

    > p:last-child {
      text-align: right;
    }
  }
</style>
