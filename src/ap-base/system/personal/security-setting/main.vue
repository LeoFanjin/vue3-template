<!--安全设置-->
<style scoped lang="less" src="./style.less"></style>

<template>
  <div id="personal_securitySetting">
    <div class="panel">
      <div class="panel-heading">
        <!--<h2 class="panel-title">{{$t('securitySetting.label.security_Setting')}}</h2>-->
        <div class="panel-opt">
          <ul>
            <li @click="save"><i class="icon iconfont icon-ap-save1"></i></li>
            <li @click="clear"><i class="icon iconfont icon-ap-empty"></i></li>
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
          :model="passwordForm"
          ref="passForm"
          :rules="passRules"
          label-width="90px"
        >
          <el-form-item
            :label="$t('securitySetting.label.old_pass')"
            prop="oldPassword"
            require
          >
            <el-input
              type="password"
              v-model="passwordForm.oldPassword"
              :placeholder="$t('securitySetting.label.enter_old_pass')"
              :maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('securitySetting.label.new_pass')"
            prop="newPassword"
            require
          >
            <el-input
              type="password"
              v-model="passwordForm.newPassword"
              :placeholder="$t('securitySetting.label.enter_new_pass')"
              :maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('securitySetting.label.repeat_pass')"
            prop="newPassword2"
            require
          >
            <el-input
              type="password"
              v-model="passwordForm.newPassword2"
              :placeholder="$t('securitySetting.label.enter_repeat_pass')"
              blur="validationPass2"
              :maxlength="30"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5';
import { Validate } from 'utils';

export default {
  data() {
    return {
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      passRules: null
    };
  },
  created() {
    this.initRules();
  },
  methods: {
    initRules() {
      var self = this;

      this.passRules = {
        oldPassword: [
          {
            required: true,
            message: this.$t('common.msg.enter_old_pass'),
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: this.$t('securitySetting.msg.organ_len_20')
          },
          { validator: Validate.trim, trigger: 'blur' }
        ],
        newPassword: [
          {
            required: true,
            message: this.$t('common.msg.enter_new_pass'),
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: this.$t('securitySetting.msg.organ_len_20')
          },
          { validator: Validate.trim, trigger: 'blur' }
        ],
        newPassword2: [
          {
            required: true,
            message: this.$t('common.msg.enter_repeat_pass'),
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: this.$t('securitySetting.msg.organ_len_20')
          },
          { validator: Validate.trim, trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              if (self.newPassword !== value) {
                callback(new Error('两次密码不一样'));
              } else {
                callback();
              }
            }
          }
        ]
      };
    },
    validationPass2() {
      var flag = true;
      if (this.newPassword !== this.newPassword2) {
        this.initRules();
        this.$refs.passForm.validate(function (valid) {});
        flag = false;
      }
      return flag;
    },
    save() {
      var self = this;

      self.$refs.passForm.validate(function (valid) {
        if (valid) {
          if (self.validationPass2()) {
            return;
          }
          self.$store
            .dispatch('modifyPassword', {
              oldPassword: md5(self.passwordForm.oldPassword),
              newPassword: md5(self.passwordForm.newPassword)
            })
            .then(function () {
              self.$notify.success(self.$t('common.msg.update_success'));
              self.clear();
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
      this.$refs.passForm.resetFields();
    }
  }
};
</script>
