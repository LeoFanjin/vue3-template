<!--个人信息-->
<style scoped lang="less" src="./style.less"></style>

<template>
  <div id="personal_userInfo">
    <div class="panel">
      <div class="panel-heading">
        <!--<h2 class="panel-title">{{$t('userInfo.label.user_info')}}</h2>-->
        <div class="panel-opt">
          <ul>
            <li class="btn-ap" @click="save">
              <i class="icon iconfont icon-ap-save1"></i>
            </li>
            <li @click="reset"><i class="icon iconfont icon-ap-empty"></i></li>
          </ul>
        </div>
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
        <el-form
          class="app_form"
          :model="userForm"
          ref="userForm"
          :rules="userRules"
          label-width="90px"
        >
          <el-form-item :label="$t('userInfo.label.name')" prop="userAccount">
            <el-input
              v-model="userForm.userAccount"
              :disabled="true"
              :maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('userInfo.label.phone')"
            prop="userTelnumber"
            require
          >
            <el-input
              v-model="userForm.userTelnumber"
              :placeholder="$t('userInfo.label.need_phone')"
              :maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('common.label.email')"
            prop="userMail"
            require
          >
            <el-input
              v-model="userForm.userMail"
              :placeholder="$t('userInfo.label.need_email')"
              :maxlength="30"
            ></el-input>
          </el-form-item>

          <el-form-item
            :label="$t('common.label.userName')"
            prop="userName"
            require
          >
            <el-input
              v-model="userForm.userName"
              :placeholder="$t('userInfo.label.need_userName')"
              :maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('common.label.userGender')"
            prop="userGender"
            require
          >
            <el-select
              v-model="userForm.userGender"
              :placeholder="$t('userInfo.label.need_userGender')"
            >
              <el-option
                v-for="item in $store.state.gender"
                :label="item.libraryName"
                :value="item.libraryCode"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :label="$t('common.label.userPosition')"
            prop="userPosition"
            require
          >
            <el-select v-model="form.userPosition" :placeholder="请输入职位">
              <el-option
                v-for="item in $store.state.position"
                :label="item.libraryName"
                :value="item.libraryCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('common.label.userNation')"
            prop="userNation"
            require
          >
            <!--<el-input v-model="userForm.userNation" :placeholder="$t('userInfo.label.need_userNation')" :maxlength=30></el-input>-->
            <el-select
              v-model="userForm.userNation"
              :placeholder="$t('userInfo.label.need_userNation')"
            >
              <el-option
                v-for="item in $store.state.nation"
                :label="item.libraryName"
                :value="item.libraryCode"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :label="$t('common.label.userAddress')"
            prop="userMail"
            require
          >
            <el-input
              type="textarea"
              row="2"
              v-model="userForm.userAddress"
              :placeholder="$t('userInfo.label.need_userAddress')"
              :maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('common.label.idCard')"
            prop="idCard"
            require
          >
            <el-input
              v-model="userForm.idCard"
              :placeholder="$t('userInfo.label.need_idCard')"
              :maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('common.label.userDomicile')"
            prop="userDomicile"
            require
          >
            <el-input
              v-model="userForm.userDomicile"
              :placeholder="$t('userInfo.label.need_userDomicile')"
              :maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('common.label.userBirth')"
            prop="userBirth"
            require
          >
            <el-date-picker
              v-model="userForm.userBirth"
              type="date"
              :editable="false"
              placeholder="请选择生日"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Validate } from 'utils';
import Moment from 'moment';

export default {
  data() {
    return {
      dict_code: {
        GENDER: 'gender',
        NATION: 'nation'
      },
      userForm: {
        userAccount: '',
        userTelnumber: '',
        userMail: '',
        useruserNameMail: '',
        userGender: '',
        userPosition: '',
        userNation: '',
        userAddress: '',
        idCard: '',
        userDomicile: '',
        userBirth: ''
      }
      //        userRules: null
    };
  },
  created() {
    this.initRules();
  },
  mounted() {
    this.reset();
  },
  methods: {
    initRules() {
      this.userRules = {
        userTelnumber: [
          //            {required: true, message: this.$t('userInfo.msg.need_phone'), trigger: 'blur'},
          { validator: Validate.phone, trigger: 'blur' },
          { validator: Validate.trim, trigger: 'blur' }
        ],
        userMail: [
          //            {required: true, message: this.$t('userInfo.msg.need_email'), trigger: 'blur'},
          {
            type: 'email',
            message: this.$t('userInfo.msg.email_fail'),
            trigger: 'blur'
          },
          { validator: Validate.trim, trigger: 'blur' }
        ],
        userName: [{ max: 30, message: '长度不能超过 30 个字符' }],
        userPosition: [{ max: 30, message: '长度不能超过 30 个字符' }],
        userAddress: [{ max: 100, message: '长度不能超过 100 个字符' }],
        idCard: [
          { validator: Validate.identity, required: false, trigger: 'blur' }
        ],
        userDomicile: [{ max: 30, message: '长度不能超过 30 个字符' }]
      };
    },
    reset() {
      var self = this;
      self.clear();

      var userInfo = _.clone(this.$store.state.loginInfo);

      self.userForm.userAccount = userInfo.userAccount;
      self.userForm.userTelnumber = userInfo.userTelnumber;
      self.userForm.userMail = userInfo.userMail;
      self.userForm.userName = userInfo.userName;
      self.userForm.userGender = userInfo.userGender;
      self.userForm.userPosition = userInfo.userPosition;
      self.userForm.userNation = userInfo.userNation;
      self.userForm.userAddress = userInfo.userAddress;
      self.userForm.idCard = userInfo.idCard;
      self.userForm.userDomicile = userInfo.userDomicile;
      self.userForm.userBirth = userInfo.userBirth;
    },
    save() {
      var self = this;

      self.$refs.userForm.validate(function (valid) {
        if (valid) {
          self.userForm.userBirth = self.userForm.userBirth
            ? Moment(self.userForm.userBirth).format('YYYY-MM-DD') + ' 00:00:00'
            : '';
          self.$store
            .dispatch('modifyMyInfo', self.userForm)
            .then(function (data) {
              self.$notify.success(self.$t('common.msg.update_success'));
            })
            .catch(function (message) {
              self.$notify.error(
                typeof message === 'string'
                  ? message
                  : self.$t('common.msg.update_fail')
              );
            });
        }
      });
    },
    clear() {
      var self = this;

      self.$refs.userForm.resetFields();
    }
  }
};
</script>
