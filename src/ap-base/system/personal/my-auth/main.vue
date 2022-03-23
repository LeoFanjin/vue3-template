<!--我的权限-->
<style scoped lang="less" src="./style.less"></style>

<template>
  <div id="personal_myAuth" class="panel">
    <div class="panel-heading">
      <!--<h2 class="panel-title">{{$t('myAuth.label.my_auth')}}</h2>-->
    </div>
    <div
      class="panel-body"
      :style="{
        height:
          this.$store.state.min_height -
          $store.state.base_height_difference +
          'px'
      }"
    >
      <!--<ul class="list">-->
      <!--<li class="list-title">-->
      <!--<div class="row-number">序号</div>-->
      <!--<div>{{$t('myAuth.label.p_name')}}</div>-->
      <!--</li>-->
      <!--<li v-for="(item, index) in authList" class="list-content">-->
      <!--<div class="row-number">{{index + 1}}</div>-->
      <!--<div>{{item.permissionName}}</div>-->
      <!--</li>-->

      <!--</ul>-->
      <div class="organ-title">
        所属机构：&nbsp;&nbsp;<span>{{ this.organName }}</span>
      </div>
      <ul class="list">
        <li class="list-title">
          <div style="width: 45%; text-align: center">许可名称</div>
          <div style="width: 45%; text-align: center">绑定对象</div>
        </li>
        <li v-for="item in authList">
          <div class="auth-name" style="width: 45%; text-align: center">
            {{ item.permissionName }}
          </div>
          <div style="width: 45%; text-align: center">
            <el-tooltip :disabled="item.type !== 'organ'" content="超级管理员">
              <i
                class="icon iconfont icon-ap-organization"
                :class="{ blue: item.type === 'organ' }"
              ></i>
            </el-tooltip>
            <el-tooltip :disabled="item.type !== 'user'" content="超级管理员">
              <i
                class="icon iconfont icon-ap-role2"
                :class="{ green: item.type === 'user' }"
              ></i>
            </el-tooltip>
            <el-tooltip :disabled="item.type !== 'role'" content="超级管理员">
              <i
                class="icon iconfont icon-ap-role1"
                :class="{ black: item.type === 'role' }"
              ></i>
            </el-tooltip>
          </div>
        </li>
        <li v-if="!authList || authList.length === 0" class="list-noContent">
          <div>{{ $t('myAuth.label.p_un_bind') }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      organName: '',
      authList: [
        //          {permissionName:"超级管理员", type:"organ"},
        //          {permissionName:"用户管理员", type:"user"},
        //          {permissionName:"权限管理员", type:"role"},
        //          {permissionName:"超级管理员", type:"user"}
      ],
      authListDelete: [
        //          {permissionName:"超级管理员", type:"organ"},
        //          {permissionName:"用户管理员", type:"user"},
        //          {permissionName:"权限管理员", type:"role"},
        //          {permissionName:"超级管理员", type:"user"}
      ]
    };
  },
  created() {
    if (this.$store.state.loginInfo) {
      this.organName = this.$store.state.loginInfo.organ
        ? this.$store.state.loginInfo.organ.organName
        : '';
    }
    this.init();
  },
  methods: {
    init() {
      var self = this;

      self.$store
        .dispatch('findMyAuth')
        .then(function (data) {
          if (data && _.isArray(data)) {
            self.authList = data;
          }
        })
        .catch(function (message) {
          if (message && typeof message === 'string') {
            self.$notify.error(message);
          }
        });
    }
  }
};
</script>
